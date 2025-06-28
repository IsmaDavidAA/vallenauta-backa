import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/ollama', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'El prompt es requerido.' });
  }

  try {
    const ollamaRes = await axios.post('http://localhost:11434/api/generate', {
      model: 'gemma2:2b', // Cambia por el modelo que tengas disponible
      prompt: `quiero que se haga bajo el contexto educativo dirigido a infantes, ${prompt}`,
      stream: false,
    });

    const responseText = ollamaRes.data.response;
    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Error al conectarse a Ollama:', error);
    res.status(500).json({ message: 'Error al conectarse con Ollama' });
  }
});


export default router;