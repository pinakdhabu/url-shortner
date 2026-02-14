# 🚀 URL Shortener – Cloud DevOps Project

> Containerized URL Shortener Application deployed on AWS EC2 using Docker & MongoDB
> Built & Deployed by **Pinak Dhabu**

LIVE LINK: (URL Shortner)[http://13.233.76.226/]
---

## 📌 Project Overview

This project is a full-stack URL Shortener web application developed using **Node.js, Express.js, and MongoDB**, containerized with **Docker**, and deployed on **AWS EC2 Cloud Infrastructure**.

The application allows users to:

* Shorten long URLs
* Automatically validate URL format
* Prevent duplicate entries
* Track click counts
* Redirect users efficiently
* Run inside Docker containers
* Deploy on cloud infrastructure

This project demonstrates real-world **DevOps practices**, including containerization, cloud deployment, debugging, and remote server management.

---

## 🏗 System Architecture

```
User Browser
      ↓
AWS EC2 (Ubuntu)
      ↓
Docker Container (Node + Express App)
      ↓
MongoDB Container
```

---

## 🛠 Technologies Used

* Node.js
* Express.js
* MongoDB
* Docker
* Docker Compose
* AWS EC2
* Linux (Ubuntu)

---

## 📦 Project Structure

```
url-shortener/
│
├── Dockerfile
├── docker-compose.yml
├── server.js
├── package.json
├── package-lock.json
└── setup.sh (optional deployment script)
```

---

## ⚙️ Features

* ✅ URL shortening
* ✅ Automatic HTTPS prefix handling
* ✅ URL format validation
* ✅ Duplicate URL detection
* ✅ Click tracking
* ✅ Clean responsive UI
* ✅ Dockerized deployment
* ✅ AWS EC2 hosting

---

## 🚀 Deployment (AWS EC2)

### 1️⃣ Launch EC2 Instance

* AMI: Ubuntu
* Instance Type: t3.micro
* Allow inbound ports:

  * 22 (SSH)
  * 80 (HTTP)

---

### 2️⃣ Connect to EC2

```bash
ssh -i yourkey.pem ubuntu@<public-ip>
```

---

### 3️⃣ Install Docker

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
```

---

### 4️⃣ Install Docker Compose

```bash
sudo apt install docker-compose -y
```

---

### 5️⃣ Run the Application

```bash
sudo docker-compose up -d --build
```

---

### 6️⃣ Open in Browser

```
http://<public-ip>
```

---

## 💻 Run Locally (Without Cloud)

Clone the repository:

```bash
git clone https://github.com/pinakdhabu/url-shortner.git
cd url-shortner
```

Install dependencies:

```bash
npm install
```

Start using Docker:

```bash
docker-compose up -d --build
```

Open:

```
http://localhost
```

---

## 🐳 Docker Configuration

### Dockerfile

* Base Image: Node 18
* Installs dependencies
* Exposes port 3000
* Runs `server.js`

### docker-compose.yml

* App container
* MongoDB container
* Persistent volume for database
* Port mapping 80 → 3000

---

## 🔍 Troubleshooting

### Container Restarting?

Check logs:

```bash
docker logs <container-name>
```

### Port Not Accessible?

Ensure Security Group allows:

```
HTTP - Port 80 - 0.0.0.0/0
```

### Mongo Connection Error?

Ensure service name in connection string:

```
mongodb://mongo:27017/urlshortener
```

---

## 📚 Learning Outcomes

* Docker image building
* Container orchestration
* Cloud infrastructure setup
* Debugging runtime errors
* Security group configuration
* SCP file transfer
* Production deployment practices

---

## 🔮 Future Enhancements

* Analytics dashboard
* Custom short URLs
* QR code generator
* CI/CD pipeline
* Nginx reverse proxy
* HTTPS with Let's Encrypt
* Kubernetes deployment

---

## 👨‍💻 Author

**Pinak Dhabu**

Cloud & DevOps Enthusiast

Containerized Application Deployment on AWS
