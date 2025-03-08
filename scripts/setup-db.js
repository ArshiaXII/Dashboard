const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '104.247.182.58',
      user: process.env.DB_USER || 'alanyavilla_user',
      password: process.env.DB_PASSWORD || '5HfwrBAu38uCLus',
      database: process.env.DB_NAME || 'ars_db',
      port: parseInt(process.env.DB_PORT || '3306')
    });

    console.log('Connected to database');

    // Create properties table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS properties (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        location VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        neighborhood VARCHAR(255),
        price INT NOT NULL,
        bedrooms INT NOT NULL,
        bathrooms INT NOT NULL,
        area INT NOT NULL,
        land_area INT,
        year_built INT,
        type VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        images JSON,
        floor_plan VARCHAR(255),
        video VARCHAR(255),
        virtual_tour VARCHAR(255),
        amenities JSON,
        nearby_places JSON,
        contact_info JSON,
        seo JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Properties table created');

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    // Create admin user
    const bcrypt = require('bcryptjs');
    const { v4: uuidv4 } = require('uuid');
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const userId = uuidv4();
    
    try {
      await connection.execute(`
        INSERT INTO users (id, name, email, password, role)
        VALUES (?, ?, ?, ?, ?)
      `, [userId, 'Admin User', 'admin@alanyavilla.ru', hashedPassword, 'admin']);
      console.log('Admin user created');
    } catch (error) {
      console.log('Admin user already exists or could not be created:', error.message);
    }

    await connection.end();
    console.log('Database setup completed');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase(); 