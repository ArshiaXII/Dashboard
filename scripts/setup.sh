#!/bin/bash

# Create necessary directories
mkdir -p data
mkdir -p public/uploads/properties
mkdir -p public/uploads/blogs

# Set permissions
chmod -R 755 public/uploads

# Install dependencies
npm install

# Run database migrations
npm run migrate

# Create an admin user
node scripts/create-admin.js

echo "Server setup completed!" 