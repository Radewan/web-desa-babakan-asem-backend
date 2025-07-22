-- CreateTable
CREATE TABLE "residents" (
    "id" TEXT NOT NULL,
    "man" INTEGER NOT NULL,
    "woman" INTEGER NOT NULL,
    "head_of_family" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "residents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idms" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "skor" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "idms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_assistances" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_assistances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sdgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sdgs_pkey" PRIMARY KEY ("id")
);
