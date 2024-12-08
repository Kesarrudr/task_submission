#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
until pg_isready -h postgres -U postgres; do
  sleep 2
done

# Run database migrations
echo "Running Prisma migrations..."
pnpm prisma migrate dev

# Start the development server
echo "Starting the dev server..."
pnpm dev
