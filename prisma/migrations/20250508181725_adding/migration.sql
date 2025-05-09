/*
  Warnings:

  - You are about to drop the column `status` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNOLOGY', 'BUSINESS', 'POLITICAL');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "status",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'TECHNOLOGY',
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 80;

-- DropEnum
DROP TYPE "Status";
