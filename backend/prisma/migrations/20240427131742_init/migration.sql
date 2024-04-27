/*
  Warnings:

  - You are about to drop the `Pogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserPogs" DROP CONSTRAINT "_UserPogs_A_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Pogs";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "pogId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ticker_symbol" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Pog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pog_name_key" ON "Pog"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pog_ticker_symbol_key" ON "Pog"("ticker_symbol");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_pogId_fkey" FOREIGN KEY ("pogId") REFERENCES "Pog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPogs" ADD CONSTRAINT "_UserPogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Pog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
