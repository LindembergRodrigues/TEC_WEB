import request from "supertest";
import {app, server} from '../../src/server'

describe("testa turma", ()=>{
        afterAll(() => {
            server.close(); // Fecha o servidor após os testes
        });
        let id = 0
        it("testa get não encontrado", async()=>{
            const response = await  request(app).get("/turma/capturarTurma/4");
            expect(response.body).toBe("Turma não Cadastrada!")
        })

        it("testa create", async()=>{
            const response = await  request(app).post("/turma/criarTurma").send({
                descricao: "500",
            })
            id = response.body.id
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("descricao","500")
        })
        it("testa update", async()=>{
            const response = await  request(app).put("/turma/atulizaTurma/"+id).send({
                descricao: "LCC 3",
            })
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("descricao","LCC 3")
        })

        it("testa get", async()=>{
            const response = await  request(app).get("/turma/capturarTurma/"+id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("descricao","LCC 3")
        })

        it("testa delete", async()=>{
            const response = await  request(app).delete("/turma/deletarTurma/"+id);
            expect(response.status).toBe(201);
            expect(response.body).toBe("Removido!")
        })

    }
);