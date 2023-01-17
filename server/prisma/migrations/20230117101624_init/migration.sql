-- CreateTable
CREATE TABLE "Journey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departure" INTEGER NOT NULL,
    "return" INTEGER NOT NULL,
    "dsid" INTEGER NOT NULL,
    "dsname" TEXT NOT NULL,
    "rsid" INTEGER NOT NULL,
    "rsname" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL
);
