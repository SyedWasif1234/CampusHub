/*
  Warnings:

  - You are about to drop the column `courseId` on the `Announcements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Announcements" DROP CONSTRAINT "Announcements_courseId_fkey";

-- AlterTable
ALTER TABLE "Announcements" DROP COLUMN "courseId";
