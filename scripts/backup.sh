#!/bin/bash

# Set variables
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y-%m-%d)
PROJECT_DIR="/path/to/your/project"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup the SQLite database
cp $PROJECT_DIR/data/turqa.db $BACKUP_DIR/turqa-$DATE.db

# Backup uploaded images
tar -czf $BACKUP_DIR/uploads-$DATE.tar.gz -C $PROJECT_DIR/public uploads

# Remove backups older than 30 days
find $BACKUP_DIR -name "turqa-*.db" -mtime +30 -delete
find $BACKUP_DIR -name "uploads-*.tar.gz" -mtime +30 -delete

echo "Backup completed: $(date)" 