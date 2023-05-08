# Use a Node.js base image
FROM node:18.16.0-alpine3.17

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (takes advantage of docker caching for dependencies)
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the React app
RUN yarn build

# Expose the port for the combined React app and WebSocket server
EXPOSE 8080

# Start the combined React app and WebSocket server
CMD ["node", "server.js"]