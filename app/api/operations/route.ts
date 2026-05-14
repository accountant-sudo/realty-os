import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-server";

export async function GET() {
  const ops = await prisma.operation.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(ops);
}

export async function POST(req: Request) {
  const user = await requireAuth(req);
  if (!user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  if (user.role === "agente")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const op = await prisma.operation.create({ data: body });
  return NextResponse.json(op, { status: 201 });
}
