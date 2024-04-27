-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pogs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ticker_symbol" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Pogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pogs_name_key" ON "Pogs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pogs_ticker_symbol_key" ON "Pogs"("ticker_symbol");
