* para executar o sistema chamamos o npm install para installar as dependências, caso seja a primeira execução,

## Passos para iniciar o banco de dados

1. Criar/baixar a imagem Docker do Postgres:  
   `docker pull postgres`
2. Persistir os dados  
   `docker volume create pgdata`
3. Criar base de dados  
    `docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=root -v pgdata:/var/lib/postgresql/data postgres`

4. Criar as tabelas via migration  
   `npx prisma migrate dev`


### ` Rode seu projeto local, utilize: npm run dev`
