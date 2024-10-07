import request from "supertest";
import {app, server} from '../../src/server'

describe("testa usuário", ()=>{
        afterAll(() => {
            server.close(); // Fecha o servidor após os testes
        });
        it("testa get não encontrado", async()=>{
            const response = await  request(app).get("/usuario/capturarUsuario/2020001");
            expect(response.body).toBe("Usuário não encontrado!")
        })

        it("testa create", async()=>{
            const response = await  request(app).post("/usuario/criarUsuario").send({
                matricula:"12345",
                nome:      "Teste2",
                email: "Teste@ccc2",
                senha: "123456",
                tipo:     "PROFESSOR",
            })
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("newUser.nome", "Teste2");
            expect(response.body).toHaveProperty("newUser.email", "Teste@ccc2");
            expect(response.body).toHaveProperty("newUser.tipo", "PROFESSOR");

        })
        it("testa update", async()=>{
            const response = await  request(app).put("/usuario/atulizarUsuario/12345").send({
                matricula:"12345",
                nome:      "Teste tese",
                email: "Teste@ccc2",
                senha: "123456",
                tipo:     "ALUNO",
            })
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("updatedUser.nome", "Teste tese");
            expect(response.body).toHaveProperty("updatedUser.tipo", "ALUNO");
        })

        it("testa get", async()=>{
            const response = await  request(app).get("/usuario/capturarUsuario/12345");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("nome", "Teste tese");
            expect(response.body).toHaveProperty("tipo", "ALUNO");
        })

        it("testa delete", async()=>{
            const response = await  request(app).delete("/usuario/deletarUsuairo/12345");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "User deleted successfully");

        })

    }
);