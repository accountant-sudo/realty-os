-- AlterTable
ALTER TABLE "MlsProperty" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Operation" ADD COLUMN     "deletedAt" TIMESTAMP(3);
