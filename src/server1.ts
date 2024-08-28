import express, { Request, Response } from 'express';
import { execPath } from 'process';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

let aluno = [{nome: 'lindemberg', matricula:'119210808'},
             {nome: 'Rodrigues', matricula:'119210801'},
             {nome: 'Bezerra', matricula:'119210802'},
             {nome: 'Barbosa', matricula:'119210803'}];

let disciplinas = [{codigo:'1411311' ,descricao:'FUND DE MATEMÁTICA P/ C.DA COMPUTAÇÃO I', periodo:1,credito:4, professor:'', horario:0},
                   {codigo:'1411174' ,descricao:'INTRODUÇÃO À COMPUTAÇÃO', periodo:1,credito:4, professor:'', horario:0},
                   {codigo:'1411180' ,descricao:'LABORATÓRIO DE PROGRAMAÇÃO I', periodo:1,credito:4, professor:'', horario:0},
                   {codigo:'1411167' ,descricao:'PROGRAMAÇÃO I', periodo:1,credito:4, professor:'', horario:0},
                   {codigo:'1109126' ,descricao:'CÁLCULO DIFERENCIAL E INTEGRAL I', periodo:2,credito:4, professor:'', horario:0},
                   {codigo:'1411312' ,descricao:'FUND DE MATEMÁTICA P/ C.DA COMPUTAÇÃO II', periodo:2,credito:4, professor:'', horario:0},
                   {codigo:'1411181' ,descricao:'LABORATÓRIO DE PROGRAMAÇÃO II', periodo:2,credito:4, professor:'', horario:0},
                   {codigo:'1411168' ,descricao:'PROGRAMAÇÃO II', periodo:2,credito:4, professor:'', horario:0},
                   {codigo:'1109049' ,descricao:'ÁLGEBRA LINEAR I', periodo:3,credito:4, professor:'', horario:0},
                   {codigo:'1411305' ,descricao:'ESTRUTURA DE DADOS', periodo:3,credito:4, professor:'', horario:0},
                   {codigo:'1411306' ,descricao:'LABORATORIO DE ESTRUTURA DE DADOS', periodo:3,credito:4, professor:'', horario:0},
                   {codigo:'1411307' ,descricao:'LÓGICA PARA COMPUTAÇÃO', periodo:3,credito:4, professor:'', horario:0},
                   {codigo:'1411304' ,descricao:'TEORIA DOS GRAFOS', periodo:3,credito:4, professor:'', horario:0},
                   {codigo:'1109131' ,descricao:'CÁLCULO DIFERENCIAL E INTEGRAL II	', periodo:3,credito:4, professor:'', horario:0}
];

let horario = [{id:0, horario:'08:00 / 10:00'},
               {id:1, horario:'10:00 / 12:00'},
               {id:2, horario:'14:00 / 16:00'},
               {id:3, horario:'16:00 / 18:00'}];

let historico = [{matricula:'119210808', codigoDisciplina:'1411311'}, 
                 {matricula:'119210808', codigoDisciplina:'1411174'},
                 {matricula:'119210808', codigoDisciplina:'1411180'},
                 {matricula:'119210808', codigoDisciplina:'1411167'}];


app.get('/ca/disciplinas', (req:Request, res:Response) =>{
  res.json(disciplinas);
});
app.get('/ca/horarios', (req:Request, res:Response) =>{
  res.json(horario);
});


app.get('/ca/disciplinasaprovadas/:matricula', (req:Request, res:Response) =>{
  let mat = req.params.matricula;
  let hist = historico.filter(f => f.matricula === mat );
  res.json(hist);
});

app.post('/ca/disciplinCursada', (req:Request, res:Response) =>{
  const item = req.body;
  if (!item){
    throw new Error('Dados invalidos');
  }
  historico.push(item);
  res.status(201).json(item);
});

app.delete('/ca/removeHorario/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const itemIndex = horario.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'horário não encontrado!' });
  }

  horario.splice(itemIndex,1)
  
  res.status(204).send();
});

//"ts-node src/server.ts"