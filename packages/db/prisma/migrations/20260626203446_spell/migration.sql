/*
  Warnings:

  - You are about to drop the `MerchentBalance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MerchentBalance" DROP CONSTRAINT "MerchentBalance_merchentId_fkey";

-- DropTable
DROP TABLE "MerchentBalance";

-- CreateTable
CREATE TABLE "MerchantBalance" (
    "id" SERIAL NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MerchantBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBalance_merchantId_key" ON "MerchantBalance"("merchantId");

-- AddForeignKey
ALTER TABLE "MerchantBalance" ADD CONSTRAINT "MerchantBalance_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
