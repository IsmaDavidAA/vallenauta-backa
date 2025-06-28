// src/routes/users.ts
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

export default router;
