import express from 'express';
    import sqlite3 from 'sqlite3';
    import cors from 'cors';
    import path from 'path';
    import { fileURLToPath } from 'url';
    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcryptjs';

    // Initialize Express app
    const app = express();

    // Get directory name
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Initialize database
    const db = new sqlite3.Database(':memory:');
    const JWT_SECRET = 'your-secret-key-here';

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Serve static files from public directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Initialize database tables
    db.serialize(() => {
      db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          email TEXT UNIQUE,
          password TEXT
        )
      `);

      db.run(`
        CREATE TABLE properties (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          location TEXT,
          price TEXT,
          bedrooms INTEGER,
          bathrooms INTEGER,
          image TEXT,
          user_id INTEGER,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )
      `);
    });

    // API Routes
    app.post('/api/register', async (req, res) => {
      // ... (registration code remains the same)
    });

    app.post('/api/login', async (req, res) => {
      // ... (login code remains the same)
    });

    app.post('/api/properties', (req, res) => {
      // ... (property creation code remains the same)
    });

    app.get('/api/properties', (req, res) => {
      // ... (property listing code remains the same)
    });

    // Handle all other routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // Start server
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
