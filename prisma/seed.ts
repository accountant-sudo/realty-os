import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL not set");

const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const USERS = [
  {
    username: "gustavo",
    password: "MT2026gus",
    role: "super_admin",
    name: "Gustavo",
    initials: "GU",
  },
  {
    username: "diego",
    password: "MT2026die",
    role: "admin",
    name: "Diego",
    initials: "DI",
  },
  {
    username: "ximena",
    password: "MT2026xim",
    role: "admin",
    name: "Ximena",
    initials: "XM",
  },
  {
    username: "sabrina",
    password: "MT2026sab",
    role: "admin",
    name: "Sabrina",
    initials: "SA",
  },
  {
    username: "ilay",
    password: "MT2026ila",
    role: "admin",
    name: "Ilay",
    initials: "IL",
  },
  {
    username: "cecilia",
    password: "MT2026cec",
    role: "manager",
    name: "Cecilia",
    initials: "CE",
  },
  {
    username: "gaston",
    password: "MT2026gas",
    role: "agente",
    name: "Gastón",
    initials: "GA",
  },
  {
    username: "adolfo",
    password: "MT2026ado",
    role: "agente",
    name: "Adolfo",
    initials: "AD",
  },
  {
    username: "leo",
    password: "MT2026leo",
    role: "agente",
    name: "Leo",
    initials: "LE",
  },
  {
    username: "carlos",
    password: "MT2026car",
    role: "agente",
    name: "Carlos",
    initials: "CA",
  },
  {
    username: "elizabeth",
    password: "MT2026eli",
    role: "agente",
    name: "Elizabeth",
    initials: "EL",
  },
];

const AGENTS = [
  { id: "diego", name: "Diego", lastName: "Ramírez", active: 2, closed: 30 },
  { id: "gaston", name: "Gastón", lastName: "Pereyra", active: 1, closed: 45 },
  { id: "ilan", name: "Ilan", lastName: "Goldberg", active: 0, closed: 8 },
  { id: "adolfo", name: "Adolfo", lastName: "Méndez", active: 1, closed: 12 },
  { id: "leo", name: "Leo", lastName: "Suárez", active: 0, closed: 5 },
  { id: "sabrina", name: "Sabrina", lastName: "Torres", active: 1, closed: 10 },
  { id: "aldana", name: "Aldana", lastName: "Vidal", active: 0, closed: 2 },
  { id: "ilay", name: "Ilay", lastName: "Cohen", active: 0, closed: 3 },
  { id: "karina", name: "Karina", lastName: "Flores", active: 0, closed: 2 },
  { id: "leonel", name: "Leonel", lastName: "Acosta", active: 0, closed: 0 },
  { id: "tomas", name: "Tomás", lastName: "Herrera", active: 0, closed: 0 },
  {
    id: "gustavo",
    name: "Gustavo",
    lastName: "Villanueva",
    active: 0,
    closed: 6,
  },
];

const REALTORS = [
  { id: "carlos", name: "Carlos" },
  { id: "elisabeth", name: "Elisabeth" },
  { id: "none", name: "Sin realtor" },
];

function chkToString(v: boolean | string): string {
  if (v === true) return "true";
  if (v === false) return "false";
  return String(v);
}

async function main() {
  console.log("Seeding...");

  // Users con contraseñas hasheadas
  for (const u of USERS) {
    const hashed = await bcrypt.hash(u.password, 12);
    await prisma.user.upsert({
      where: { username: u.username },
      update: {
        password: hashed,
        role: u.role,
        name: u.name,
        initials: u.initials,
      },
      create: {
        username: u.username,
        password: hashed,
        role: u.role,
        name: u.name,
        initials: u.initials,
      },
    });
  }
  console.log("✓ Users");

  // Role permissions (default per-role)
  const ROLE_PERMS = [
    {
      role: "admin",
      allowedViews: [
        "dashboard",
        "mls",
        "operations",
        "documents",
        "zillow",
        "zonaprop",
        "commissions",
        "users",
      ],
      canEdit: true,
    },
    {
      role: "manager",
      allowedViews: [
        "dashboard",
        "mls",
        "operations",
        "documents",
        "zillow",
        "zonaprop",
        "users",
      ],
      canEdit: true,
    },
    {
      role: "agente",
      allowedViews: ["mls", "operations", "documents", "zillow", "zonaprop"],
      canEdit: false,
    },
  ];
  for (const p of ROLE_PERMS) {
    await prisma.rolePermission.upsert({
      where: { role: p.role },
      create: p,
      update: {},
    });
  }
  console.log("✓ Role permissions");

  // Agents
  for (const a of AGENTS) {
    await prisma.agent.upsert({ where: { id: a.id }, update: a, create: a });
  }
  console.log("✓ Agents");

  // Realtors
  for (const r of REALTORS) {
    await prisma.realtor.upsert({ where: { id: r.id }, update: r, create: r });
  }
  console.log("✓ Realtors");

  // MLS Properties — importar desde data.ts
  const { DATA } = await import("../lib/data");
  for (const p of DATA.mlsProperties) {
    await prisma.mlsProperty.upsert({
      where: { id: p.id },
      update: {
        address: p.address,
        type: p.type,
        listPrice: p.listPrice,
        agent: p.agent,
        agentRaw: p.agentRaw,
        admin: p.admin,
        listingExp: p.listingExp,
        showingInst: p.showingInst,
        mlsStatus: p.mlsStatus,
        mlsNum: p.mlsNum,
        zillow: p.zillow,
        notes: p.notes,
        country: p.country,
        usState: p.usState,
        city: p.city,
        daysListed: p.daysListed,
        zillowViews: p.zillowViews,
      },
      create: {
        id: p.id,
        address: p.address,
        type: p.type,
        listPrice: p.listPrice,
        agent: p.agent,
        agentRaw: p.agentRaw,
        admin: p.admin,
        listingExp: p.listingExp,
        showingInst: p.showingInst,
        mlsStatus: p.mlsStatus,
        mlsNum: p.mlsNum,
        zillow: p.zillow,
        notes: p.notes,
        country: p.country,
        usState: p.usState,
        city: p.city,
        daysListed: p.daysListed,
        zillowViews: p.zillowViews,
      },
    });
  }
  console.log(`✓ MLS Properties (${DATA.mlsProperties.length})`);

  // Operations
  for (const o of DATA.operations) {
    await prisma.operation.upsert({
      where: { id: o.id },
      update: {
        address: o.address,
        type: o.type,
        price: o.price,
        financing: o.financing,
        agent: o.agent,
        realtor: o.realtor,
        titleCompany: o.titleCompany,
        clientId: o.clientId,
        buyerName: o.buyerName,
        execDate: o.execDate,
        closingDate: o.closingDate,
        closingDateISO: o.closingDateISO,
        status: o.status,
        commissionPaid: o.commissionPaid,
        compSigned: chkToString(o.compSigned),
        compPct: o.compPct,
        compFixed: o.compFixed ?? 0,
        escrow: chkToString(o.escrow),
        lbp: chkToString(o.lbp),
        sd: chkToString(o.sd),
        flood: chkToString(o.flood),
        condoDocs: chkToString(o.condoDocs),
        condoRider: chkToString(o.condoRider),
        inspDone: chkToString(o.inspDone),
        inspStatus: o.inspStatus,
        inspEstimatedDate: o.inspEstimatedDate,
        inspNotes: o.inspNotes,
        appraisal: o.appraisal,
        reinspection: chkToString(o.reinspection),
        agentSplitPct: o.agentSplitPct,
        realtorSplitPct: o.realtorSplitPct,
        brokerSplitPct: o.brokerSplitPct,
        pending: o.pending,
        closingNear: o.closingNear,
        isRented: o.isRented,
        leaseAgreementSent: o.leaseAgreementSent,
        estoppelSent: o.estoppelSent,
      },
      create: {
        id: o.id,
        address: o.address,
        type: o.type,
        price: o.price,
        financing: o.financing,
        agent: o.agent,
        realtor: o.realtor,
        titleCompany: o.titleCompany,
        clientId: o.clientId,
        buyerName: o.buyerName,
        execDate: o.execDate,
        closingDate: o.closingDate,
        closingDateISO: o.closingDateISO,
        status: o.status,
        commissionPaid: o.commissionPaid,
        compSigned: chkToString(o.compSigned),
        compPct: o.compPct,
        compFixed: o.compFixed ?? 0,
        escrow: chkToString(o.escrow),
        lbp: chkToString(o.lbp),
        sd: chkToString(o.sd),
        flood: chkToString(o.flood),
        condoDocs: chkToString(o.condoDocs),
        condoRider: chkToString(o.condoRider),
        inspDone: chkToString(o.inspDone),
        inspStatus: o.inspStatus,
        inspEstimatedDate: o.inspEstimatedDate,
        inspNotes: o.inspNotes,
        appraisal: o.appraisal,
        reinspection: chkToString(o.reinspection),
        agentSplitPct: o.agentSplitPct,
        realtorSplitPct: o.realtorSplitPct,
        brokerSplitPct: o.brokerSplitPct,
        pending: o.pending,
        closingNear: o.closingNear,
        isRented: o.isRented,
        leaseAgreementSent: o.leaseAgreementSent,
        estoppelSent: o.estoppelSent,
      },
    });
  }
  console.log(`✓ Operations (${DATA.operations.length})`);

  console.log("Seed completo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
