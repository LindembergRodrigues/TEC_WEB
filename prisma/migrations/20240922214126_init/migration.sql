-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ALUNO', 'PROFESSOR', 'COORDENADOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "horarioId" INTEGER NOT NULL,
    "professor" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "historico" (
    "matriculaUsuario" TEXT NOT NULL,
    "codigoDisciplina" TEXT NOT NULL,
    "situacao" TEXT,

    CONSTRAINT "historico_pkey" PRIMARY KEY ("matriculaUsuario","codigoDisciplina")
);

-- CreateTable
CREATE TABLE "turmas" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "horarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_professor_fkey" FOREIGN KEY ("professor") REFERENCES "usuarios"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico" ADD CONSTRAINT "historico_matriculaUsuario_fkey" FOREIGN KEY ("matriculaUsuario") REFERENCES "usuarios"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico" ADD CONSTRAINT "historico_codigoDisciplina_fkey" FOREIGN KEY ("codigoDisciplina") REFERENCES "disciplinas"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
