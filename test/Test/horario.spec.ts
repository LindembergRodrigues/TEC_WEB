import request from "supertest";
import {app, server} from '../../src/server'

describe("testa horario", ()=>{
        afterAll(() => {
            server.close(); // Fecha o servidor após os testes
        });

        let id = 0
        it("testa create", async()=>{
            const response = await  request(app).post("/horario/criarHorario/").send({
                descricao: "18:00 às 20:00"
            })
            id = response.body.id
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("descricao","18:00 às 20:00")
        })
        it("testa update", async()=>{
            const response = await  request(app).put("/horario/atulizaHorario/"+id).send({
                descricao: "18:00 às 22:00"
            })
            expect(response.status).toBe(200);
            expect(response.body).toBe("Atualizado!")
        })

        it("testa get", async()=>{
            const response = await  request(app).get("/horario/capturarHorario/"+id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("descricao","18:00 às 22:00")
        })

        it("testa delete", async()=>{
            const response = await  request(app).delete("/disciplina/deletarDisciplina/"+id);
            expect(response.status).toBe(200);
            expect(response.body).toBe("Removido!")
        })

    }
);