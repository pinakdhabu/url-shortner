#!/bin/bash

echo "🚀 Starting DevOps Auto Setup..."

# Update system
echo "📦 Updating system..."
sudo apt update -y

# Install Docker
echo "🐳 Installing Docker..."
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker

# Install Docker Compose (legacy)
echo "🔧 Installing Docker Compose..."
sudo apt install docker-compose -y

# Add current user to docker group
echo "👤 Fixing Docker permissions..."
sudo usermod -aG docker $USER

# Clean old containers if any
echo "🧹 Cleaning old containers..."
sudo docker-compose down 2>/dev/null
sudo docker rm -f $(sudo docker ps -aq) 2>/dev/null
sudo docker volume prune -f
sudo docker system prune -f

# Build and start project
echo "🏗 Building and starting containers..."
sudo docker-compose up -d --build

echo "✅ Deployment Complete!"
echo "🌍 Open in browser: http://$(curl -s ifconfig.me)"
