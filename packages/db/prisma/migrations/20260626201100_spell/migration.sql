/*
  Warnings:

  - You are about to drop the `Merchent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MerchentBalance" DROP CONSTRAINT "MerchentBalance_merchentId_fkey";

-- AlterTable
ALTER TABLE "MerchentBalance" ALTER COLUMN "amount" SET DEFAULT 0;

-- DropTable
DROP TABLE "Merchent";

-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "auth_type" "AuthType" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");

-- AddForeignKey
ALTER TABLE "MerchentBalance" ADD CONSTRAINT "MerchentBalance_merchentId_fkey" FOREIGN KEY ("merchentId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
