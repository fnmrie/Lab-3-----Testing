-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserPogs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPogs_AB_unique" ON "_UserPogs"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPogs_B_index" ON "_UserPogs"("B");

-- AddForeignKey
ALTER TABLE "_UserPogs" ADD CONSTRAINT "_UserPogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Pogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPogs" ADD CONSTRAINT "_UserPogs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
