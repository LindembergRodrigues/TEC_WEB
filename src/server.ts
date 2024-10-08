import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/usuario.routes';
import turmaRoutes from './routes/turma.routes';
import horarioRouter from './routes/horario.routes';
import historicoRouter from './routes/historico.routes';
import disciplinaRouter from './routes/disciplina.routes';
import loginRouter from './routes/login.routes';

export const app = express();
const prisma = new PrismaClient();

app.use(express.json());
const PORT = process.env.PORT || 3000;

export const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const cors = require('cors');
app.use(cors());

app.use('/usuario', userRouter);
app.use('/disciplina',disciplinaRouter);
app.use('/historico',historicoRouter);
app.use('/horario',horarioRouter);
app.use('/turma',turmaRoutes);
app.use('/login',loginRouter);


