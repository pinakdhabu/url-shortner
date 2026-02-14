const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(express.json());

// ---------------- DATABASE ----------------
mongoose.connect("mongodb://mongo:27017/urlshortener")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// ---------------- SCHEMA ----------------
const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true },
    clicks: { type: Number, default: 0 }
});

const Url = mongoose.model("Url", urlSchema);

// ---------------- UI ----------------
app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Cloud URL Shortener</title>
<style>
body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.card {
    background: white;
    padding: 35px;
    border-radius: 14px;
    width: 420px;
    text-align: center;
    box-shadow: 0 12px 30px rgba(0,0,0,0.25);
}
h1 {
    margin-bottom: 5px;
}
.subtitle {
    font-size: 14px;
    color: gray;
    margin-bottom: 20px;
}
input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #ccc;
}
button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #667eea;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
}
button:hover {
    background: #5643cc;
}
.result {
    margin-top: 15px;
    word-wrap: break-word;
}
.footer {
    margin-top: 25px;
    font-size: 13px;
    color: #777;
}
.credit {
    font-weight: bold;
    color: #667eea;
}
</style>
</head>
<body>

<div class="card">
<h1>🚀 URL Shortener</h1>
<div class="subtitle">Cloud DevOps Internship Project</div>

<input type="text" id="urlInput" placeholder="Enter your URL">
<button onclick="shortenUrl()">Shorten URL</button>

<div class="result" id="result"></div>

<div class="footer">
Built & Deployed by <span class="credit">Pinak Dhabu</span><br>
Containerized with Docker • Hosted on AWS
</div>
</div>

<script>
async function shortenUrl() {
    const url = document.getElementById("urlInput").value;

    const response = await fetch('/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url })
    });

    const data = await response.json();

    if (data.shortUrl) {
        document.getElementById("result").innerHTML =
            '<p><strong>Short URL:</strong><br>' +
            '<a href="' + data.shortUrl + '" target="_blank">' +
            data.shortUrl +
            '</a></p>';
    } else {
        document.getElementById("result").innerHTML =
            '<p style="color:red;">' + data.error + '</p>';
    }
}
</script>

</body>
</html>
`);
});

// ---------------- SHORTEN ROUTE ----------------
app.post("/shorten", async (req, res) => {
    try {
        let originalUrl = req.body.originalUrl;

        if (!originalUrl) {
            return res.status(400).json({ error: "URL is required" });
        }

        if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
            originalUrl = "https://" + originalUrl;
        }

        try {
            new URL(originalUrl);
        } catch {
            return res.status(400).json({ error: "Invalid URL format" });
        }

        const existing = await Url.findOne({ originalUrl });

        if (existing) {
            return res.json({
                shortUrl: req.protocol + "://" + req.get("host") + "/" + existing.shortCode
            });
        }

        const shortCode = shortid.generate();

        const newUrl = new Url({
            originalUrl: originalUrl,
            shortCode: shortCode
        });

        await newUrl.save();

        res.json({
            shortUrl: req.protocol + "://" + req.get("host") + "/" + shortCode
        });

    } catch (err) {
        console.log("Server Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ---------------- REDIRECT ----------------
app.get("/:code", async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.code });

        if (!url) {
            return res.status(404).send("URL not found");
        }

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);

    } catch (err) {
        res.status(500).send("Server error");
    }
});

// ---------------- START SERVER ----------------
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
