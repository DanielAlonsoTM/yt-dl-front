# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port (Next.js default is 3000)
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev"]
