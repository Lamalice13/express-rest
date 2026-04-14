/*
  Warnings:

  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "text" VARCHAR(200) NOT NULL,
ALTER COLUMN "timestamp" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "timestamp" SET DEFAULT NOW();
