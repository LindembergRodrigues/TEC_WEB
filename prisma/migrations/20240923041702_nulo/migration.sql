-- DropForeignKey
ALTER TABLE "disciplinas" DROP CONSTRAINT "disciplinas_horarioId_fkey";

-- DropForeignKey
ALTER TABLE "disciplinas" DROP CONSTRAINT "disciplinas_professor_fkey";

-- DropForeignKey
ALTER TABLE "disciplinas" DROP CONSTRAINT "disciplinas_turmaId_fkey";

-- AlterTable
ALTER TABLE "disciplinas" ALTER COLUMN "turmaId" DROP NOT NULL,
ALTER COLUMN "horarioId" DROP NOT NULL,
ALTER COLUMN "professor" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "horarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_professor_fkey" FOREIGN KEY ("professor") REFERENCES "usuarios"("matricula") ON DELETE SET NULL ON UPDATE CASCADE;
