// src/index.ts
import express from 'express';
import cors from 'cors';
import usersRouter from './routes/cuentos.js';
import router  from './routes/ia.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/', usersRouter);
app.use('/ia/', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
