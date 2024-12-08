# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and lock file
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the application code
COPY . .

# Expose the dev server port
EXPOSE 3000

# Run database migrations and start the server
CMD ["sh", "-c", "pnpm prisma migrate dev --name init &&  npx prisma generate && pnpm run dev"]

