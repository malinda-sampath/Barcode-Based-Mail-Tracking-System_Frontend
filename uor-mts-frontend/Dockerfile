# Step 1: Build the React App
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project and build the app
COPY . .
RUN npm run build

# Step 2: Serve the app with `serve`
FROM node:18-alpine

WORKDIR /app

# Install `serve` to serve the static build files
RUN npm install -g serve

# Copy the built app from the previous stage
COPY --from=build /app/build /app/build

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
