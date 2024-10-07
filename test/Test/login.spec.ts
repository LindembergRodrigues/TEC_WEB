
import request from "supertest";
import {app, server} from '../../src/server'

describe("testa login", ()=>{
        afterAll(async () => {
            const response = await  request(app).delete("/usuario/deletarUsuairo/12345");
            server.close(); // Fecha o servidor após os testes
        });
        beforeAll(async () => {
            const response = await  request(app).post("/usuario/criarUsuario").send({
                matricula:"12345",
                nome:      "Teste2",
                email: "Teste@ccc2",
                senha: "123456",
                tipo:     "PROFESSOR",
            })
        })
        it("testa login", async()=>{
            const response = await  request(app).post("/login/").send({
                matricula:"12345",
                senha:"123456",
            })
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Login efetuado com sucesso");
        })

    }
);