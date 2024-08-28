import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/user.routes';
import turmaRoutes from './routes/turma.routes';
import horarioRouter from './routes/horario.routes'
import historicoRouter from './routes/historico.routes';
import disciplinaRouter from './routes/disciplina.routes';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Swagger setup
const swaggerDocument = require('../swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/users', userRouter);
app.use('/disciplina',disciplinaRouter);
app.use('/disciplina',historicoRouter);
app.use('/disciplina',horarioRouter);
app.use('/disciplina',turmaRoutes);

// app.use('/', (req, res) => {
//   res.redirect('/api-docs');
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
