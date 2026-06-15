/*
  Warnings:

  - The values [Failure] on the enum `OnRampStatusType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnRampStatusType_new" AS ENUM ('Success', 'Failed', 'Processing');
ALTER TABLE "OnRampTransaction" ALTER COLUMN "status" TYPE "OnRampStatusType_new" USING ("status"::text::"OnRampStatusType_new");
ALTER TYPE "OnRampStatusType" RENAME TO "OnRampStatusType_old";
ALTER TYPE "OnRampStatusType_new" RENAME TO "OnRampStatusType";
DROP TYPE "public"."OnRampStatusType_old";
COMMIT;
