import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Database connection configuration
const connection = await mysql.createConnection({
  host: '104.247.182.58',
  user: 'alanyavilla_user', // You may need to create this user in phpMyAdmin
  password: '5HfwrBAu38uCLus',
  database: 'ars_db',
  port: 3306, // Default MySQL port
  ssl: false
});

// Create Drizzle instance
export const db = drizzle(connection, { schema }); 