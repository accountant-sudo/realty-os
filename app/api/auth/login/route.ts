import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { NAV_ACCESS } from "@/lib/users";
import type { Role } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "mt_session";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Faltan credenciales" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { username: username.trim().toLowerCase(), deletedAt: null },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos" },
      { status: 401 },
    );
  }

  // Embed allowed views from role_permissions (dynamic) or fallback to NAV_ACCESS
  let allowedViews: string[]
  let canEdit = false

  if (user.role === "super_admin") {
    allowedViews = NAV_ACCESS.super_admin
    canEdit = true
  } else {
    const perms = await prisma.rolePermission.findUnique({ where: { role: user.role } })
    allowedViews = perms?.allowedViews ?? (NAV_ACCESS[user.role as Role] ?? [])
    canEdit = perms?.canEdit ?? (user.role === "admin" || user.role === "manager")
  }

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    initials: user.initials,
    allowedViews,
    canEdit,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

  const res = NextResponse.json({ user: payload });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
