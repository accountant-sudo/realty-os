-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" INTEGER NOT NULL DEFAULT 0,
    "closed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Realtor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Realtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MlsProperty" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'SF',
    "listPrice" DOUBLE PRECISION NOT NULL,
    "agent" TEXT NOT NULL,
    "agentRaw" TEXT NOT NULL DEFAULT '',
    "admin" TEXT NOT NULL DEFAULT '',
    "listingExp" TEXT NOT NULL DEFAULT '',
    "showingInst" TEXT NOT NULL DEFAULT '',
    "mlsStatus" TEXT NOT NULL DEFAULT 'published',
    "mlsNum" TEXT NOT NULL DEFAULT '',
    "zillow" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL DEFAULT 'US',
    "usState" TEXT NOT NULL DEFAULT 'Florida',
    "city" TEXT NOT NULL DEFAULT 'Jacksonville',
    "daysListed" INTEGER NOT NULL DEFAULT 0,
    "zillowViews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MlsProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "financing" TEXT NOT NULL DEFAULT '',
    "agent" TEXT NOT NULL DEFAULT '',
    "realtor" TEXT NOT NULL DEFAULT '',
    "titleCo" TEXT NOT NULL DEFAULT '',
    "clientId" INTEGER NOT NULL DEFAULT 0,
    "buyerName" TEXT NOT NULL DEFAULT '',
    "execDate" TEXT NOT NULL DEFAULT '',
    "closingDate" TEXT NOT NULL DEFAULT '',
    "closingDateISO" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'ACTIVA',
    "commissionPaid" BOOLEAN NOT NULL DEFAULT false,
    "compSigned" TEXT NOT NULL DEFAULT 'false',
    "compPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "compFixed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "escrow" TEXT NOT NULL DEFAULT 'false',
    "lbp" TEXT NOT NULL DEFAULT 'false',
    "sd" TEXT NOT NULL DEFAULT 'false',
    "flood" TEXT NOT NULL DEFAULT 'false',
    "condoDocs" TEXT NOT NULL DEFAULT 'false',
    "condoRider" TEXT NOT NULL DEFAULT 'false',
    "inspDone" TEXT NOT NULL DEFAULT 'false',
    "inspStatus" TEXT NOT NULL DEFAULT '',
    "inspNotes" TEXT NOT NULL DEFAULT '',
    "appraisal" TEXT NOT NULL DEFAULT '',
    "reinsp" TEXT NOT NULL DEFAULT 'false',
    "pending" TEXT NOT NULL DEFAULT '',
    "closingNear" BOOLEAN NOT NULL DEFAULT false,
    "isRented" BOOLEAN NOT NULL DEFAULT false,
    "leaseAgreementSent" BOOLEAN NOT NULL DEFAULT false,
    "estoppelSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
