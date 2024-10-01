
import request from "supertest";
import {app, server} from '../../src/server'

describe("testa horario", ()=>{
        afterAll(() => {
            server.close(); // Fecha o servidor após os testes
        });
        it("testa get não encontrado", async()=>{
            const response = await  request(app).get("/horario/capturarHorario/6");
            expect(response.body).toBe("Aluno não cadastrado!")
        })

        it("testa create", async()=>{
            const response = await  request(app).post("/disciplina/criarDisciplina").send({
                codigo: "124589",
                descricao: "Programação Web",
                creditos: 4,
                periodo: 9,
                createdAt: new Date(),
            })
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("codigo","124589")
        })
        it("testa update", async()=>{
            const response = await  request(app).put("/disciplina/atulizarDisciplina/124589").send({
                codigo: "124589",
                descricao: "Programação Web - Optativa",
                creditos: 4,
                periodo: 9,
                createdAt: new Date(),
            })
            expect(response.status).toBe(200);
            expect(response.body).toBe("Atualizado!")
        })

        it("testa update", async()=>{
            const response = await  request(app).put("/disciplina/atulizarDisciplina/124589").send({
                codigo: "124589",
                descricao: "Programação Web - Optativa",
                creditos: 4,
                periodo: 9,
                createdAt: new Date(),
            })
            expect(response.status).toBe(200);
            expect(response.body).toBe("Atualizado!")
        })

        it("testa get", async()=>{
            const response = await  request(app).get("/disciplina/capturarDisciplina/124589");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("codigo","124589")
        })

        it("testa delete", async()=>{
            const response = await  request(app).delete("/disciplina/deletarDisciplina/124589");
            expect(response.status).toBe(200);
            expect(response.body).toBe("Removido!")
        })

    }
);