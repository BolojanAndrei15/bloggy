/*
  Warnings:

  - The `image` column on the `BlogPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "image",
ADD COLUMN     "image" JSONB;
