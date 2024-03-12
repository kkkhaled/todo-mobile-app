/*
  Warnings:

  - Made the column `endedAt` on table `Todo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startedAt` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "endedAt" SET NOT NULL,
ALTER COLUMN "startedAt" SET NOT NULL;
