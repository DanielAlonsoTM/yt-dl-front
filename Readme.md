# YT-DL-FRONT

A frontend application for managing YouTube downloads.

---

## 📋 Configuration

### 1. Setup `.env` file
1. Create a `.env.local` file in the project root:
```bash
touch .env.local
```

### 2. Set the API URL inside .env.local:
NEXT_PUBLIC_API_URL=YOUR_API_URL

---

## 🚀 Running Locally (without Docker)
1. Install dependencies
```bash
npm install
```

2. Run in development mode
``` bash
npm run dev
```

---

## 🐳 Running with Docker
### Build and run the image locally
```bash
# Build the Docker image
docker build -t yt-dl-front .

# Run the container
docker run -p 3000:3000 yt-dl-front
```

---

## 📦 Publishing the Image
### Build and push to your Docker Hub repository
```bash
# Build the image with your Docker Hub username
docker build -t <DOCKER_USER>/yt-dl-front .

# Push the image
docker push <DOCKER_USER>/yt-dl-front
```
