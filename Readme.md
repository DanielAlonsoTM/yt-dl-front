# YT-DL-FRONT
Description for app.

## Configuration
### Setup `.env` file
1. Create file `.env.local` in the root path project
```bash
touch .env.local
```

2. Set the API Url in `.env.local`
```properties
NEXT_PUBLIC_API_URL=YOUR_API_URL
```

### Installation for local develop
1. Install dependencies
```bash
npm install
```

2. Run app in develop mode
```bash
npm run dev
```
## Build docker image
## Run locally docker
```bash
# Build docker image
docker build -t yt-dl-front .

# Run docker image
docker run -p 3000:3000 yt-dl-front
```

## Publish image
```bash
# Build image in repository
docker build -t <DOCKER_USER>/yt-dl-front .

# Push image in repository
docker push <DOCKER_USER>/yt-dl-front
```
