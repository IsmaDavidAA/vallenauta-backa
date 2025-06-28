
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/cuentos', async (_req, res) => {
  const result = await pool.query('SELECT * FROM books');
  res.json(result.rows);
});
router.get('/book/:id', async (req, res) => {
  console.log('Ruta /cuento/:id alcanzada');
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en la base de datos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

router.post('/book', async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Faltan campos requeridos: title, content o author.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO books (title, content, author) VALUES ($1, $2, $3) RETURNING *',
      [title, content, author]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar libro:', error);
    res.status(500).json({ message: 'Error en el servidor al insertar el libro.' });
  }
});


export default router;
