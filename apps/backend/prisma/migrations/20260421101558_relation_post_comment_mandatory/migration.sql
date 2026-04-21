-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "timestamp" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "timestamp" SET DEFAULT NOW();
