import express from 'express';
    import sqlite3 from 'sqlite3';
    import cors from 'cors';

    const db = new sqlite3.Database(':memory:');
    const app = express();
    app.use(express.json());
    app.use(cors());

    db.serialize(() => {
      db.run(`
        CREATE TABLE properties (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          location TEXT,
          price TEXT,
          bedrooms INTEGER,
          bathrooms INTEGER,
          image TEXT
        )
      `);
    });

    app.post('/api/properties', (req, res) => {
      const { title, location, price, bedrooms, bathrooms, image } = req.body;
      db.run(
        `INSERT INTO properties (title, location, price, bedrooms, bathrooms, image)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [title, location, price, bedrooms, bathrooms, image],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ id: this.lastID });
        }
      );
    });

    app.get('/api/properties', (req, res) => {
      db.all('SELECT * FROM properties', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });

    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
