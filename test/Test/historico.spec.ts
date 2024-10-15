import request from "supertest";
import {app, server} from '../../src/server'

describe("testa historico", ()=>{
    beforeEach(async ()=>{
        const alunoAux = await  request(app).post("/usuario/criarUsuario").send({
            matricula:"151416",
            nome:      "Teste21",
            email: "Teste@151416",
            senha: "123456",
            tipo:     "ALUNO",
        })
        aluno = alunoAux.body.newUser.matricula

        const disciplinaAux = await  request(app).post("/disciplina/criarDisciplina").send({
            codigo: "151416151416",
            descricao: "Programação Web",
            creditos: 4,
            periodo: 9,
            createdAt: new Date(),
        })

        disciplina = disciplinaAux.body.codigo
    })
        afterAll(async () => {
            await  request(app).delete("/deletarHistorico/"+aluno+"/"+disciplina);
            await  request(app).delete("/usuario/deletarUsuairo/151416");
            await  request(app).delete("/disciplina/deletarDisciplina/151416");
            server.close(); // Fecha o servidor após os testes
        });
        it("testa get não encontrado", async()=>{
            const response = await  request(app).get("/historico/sugerirDisciplina/123456/1213");
            expect(response.body).toBe("Aluno não cadastrado!")
        })
        let id = 0
        let aluno = 0
        let disciplina = 0
        it("testa create", async()=>{

            const response = await  request(app).post("/historico/criarHistorico").send({
                matriculaUsuario:aluno,
                codigoDisciplina: disciplina,
                situacao :"APR"
            })
            id = response.body.id
            expect(response.status).toBe(201);
        })
        it("testa update", async()=>{
            const response = await  request(app).put("/historico/atualizaHistorico/"+aluno+"/"+disciplina).send({
                situacao :"REP"
            })
            expect(response.status).toBe(200);
            expect(response.body).toBe("Atualizado!")
        })


        it("testa delete", async()=>{
            const response = await  request(app).delete("/deletarHistorico/"+aluno+"/"+disciplina);
            expect(response.status).toBe(200);
            expect(response.body).toBe("Removido!")
        })

    }
);