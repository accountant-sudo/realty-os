import type { ReactNode } from 'react'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'Miami Tango — Realty OS',
  description: 'Intranet Miami Tango Investments',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={cn("h-full", "font-sans", geist.variable)}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
