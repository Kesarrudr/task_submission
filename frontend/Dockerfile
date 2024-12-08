# Use a lightweight Node.js image
FROM node:21

# Set the working directory
WORKDIR /app

# Copy the package.json and lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the application code
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Start the Vite development server
CMD ["pnpm", "run", "dev"]

