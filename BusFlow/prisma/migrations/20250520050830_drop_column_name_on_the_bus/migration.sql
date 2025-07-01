/*
  Warnings:

  - You are about to drop the column `name` on the `Bus` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `BusStop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `BusStop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "BusStop" ADD COLUMN     "latitude" INTEGER NOT NULL,
ADD COLUMN     "longitude" INTEGER NOT NULL;
