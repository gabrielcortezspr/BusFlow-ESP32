-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "line" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "license" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusStop" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusStopBus" (
    "id" SERIAL NOT NULL,
    "busId" INTEGER NOT NULL,
    "busStopId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusStopBus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusOccurrence" (
    "id" SERIAL NOT NULL,
    "busId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "text" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusOccurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusStopOccurrence" (
    "id" SERIAL NOT NULL,
    "busStopId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "text" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusStopOccurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusStopHistory" (
    "id" SERIAL NOT NULL,
    "busStopId" INTEGER NOT NULL,
    "peopleCount" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusStopHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LightingHistory" (
    "id" SERIAL NOT NULL,
    "busStopId" INTEGER NOT NULL,
    "light" BOOLEAN NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LightingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeopleHistory" (
    "id" SERIAL NOT NULL,
    "busId" INTEGER NOT NULL,
    "peopleCount" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeopleHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusStopBus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BusStopBus_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BusStopBus_B_index" ON "_BusStopBus"("B");

-- AddForeignKey
ALTER TABLE "BusOccurrence" ADD CONSTRAINT "BusOccurrence_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusStopOccurrence" ADD CONSTRAINT "BusStopOccurrence_busStopId_fkey" FOREIGN KEY ("busStopId") REFERENCES "BusStop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusStopHistory" ADD CONSTRAINT "BusStopHistory_busStopId_fkey" FOREIGN KEY ("busStopId") REFERENCES "BusStop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LightingHistory" ADD CONSTRAINT "LightingHistory_busStopId_fkey" FOREIGN KEY ("busStopId") REFERENCES "BusStop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeopleHistory" ADD CONSTRAINT "PeopleHistory_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusStopBus" ADD CONSTRAINT "_BusStopBus_A_fkey" FOREIGN KEY ("A") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusStopBus" ADD CONSTRAINT "_BusStopBus_B_fkey" FOREIGN KEY ("B") REFERENCES "BusStop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
