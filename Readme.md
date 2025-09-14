# YT-DL-FRONT
Description for app.

## Configuration
### Installation for local develop
1. Install dependencies
```bash
npm install
```

2. Run app in develop mode
```bash
npm run dev
```

### Build docker image
1. Build image
```bash
docker build -t yt-dl-front .
```

2. Run image
```bash
docker run -p 3000:3000 yt-dl-front
```
