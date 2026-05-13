import type { Role, NavView, User } from './types'

export const USERS: Record<string, User> = {
  gustavo:   { pass: 'MT2026gus', role: 'admin',   name: 'Gustavo',   initials: 'GU' },
  diego:     { pass: 'MT2026die', role: 'admin',   name: 'Diego',     initials: 'DI' },
  ximena:    { pass: 'MT2026xim', role: 'admin',   name: 'Ximena',    initials: 'XM' },
  sabrina:   { pass: 'MT2026sab', role: 'admin',   name: 'Sabrina',   initials: 'SA' },
  ilay:      { pass: 'MT2026ila', role: 'admin',   name: 'Ilay',      initials: 'IL' },
  cecilia:   { pass: 'MT2026cec', role: 'manager', name: 'Cecilia',   initials: 'CE' },
  gaston:    { pass: 'MT2026gas', role: 'agente',  name: 'Gastón',    initials: 'GA' },
  adolfo:    { pass: 'MT2026ado', role: 'agente',  name: 'Adolfo',    initials: 'AD' },
  leo:       { pass: 'MT2026leo', role: 'agente',  name: 'Leo',       initials: 'LE' },
  carlos:    { pass: 'MT2026car', role: 'agente',  name: 'Carlos',    initials: 'CA' },
  elizabeth: { pass: 'MT2026eli', role: 'agente',  name: 'Elizabeth', initials: 'EL' },
}

export const NAV_ACCESS: Record<Role, NavView[]> = {
  admin:   ['dashboard', 'mls', 'operaciones', 'documentos', 'zillow', 'zonaprop', 'comisiones', 'usuarios'],
  manager: ['dashboard', 'mls', 'operaciones', 'documentos', 'zillow', 'zonaprop', 'usuarios'],
  agente:  ['mls', 'operaciones', 'documentos', 'zillow', 'zonaprop'],
}
