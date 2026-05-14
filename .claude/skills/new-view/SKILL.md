---
name: new-view
description: Scaffold a new intranet view page following the project's architecture pattern. Use when adding a new section to the intranet (e.g. reportes, calendar, contactos).
argument-hint: "<view-name>"
allowed-tools: Bash, Read, Write, Edit
---

Scaffold a new intranet view for this Realty OS project.

## Pattern to follow

Every intranet view consists of:
1. **App route**: `app/intranet/<view-name>/page.tsx` — thin page that imports the view component
2. **Component dir**: `components/intranet/views/<view-name>/index.tsx` — main component with `'use client'`
3. **NavView type**: add `'<view-name>'` to the `NavView` union in `lib/types.ts`
4. **NAV_ITEMS**: add entry to `NAV_ITEMS` array in `lib/constants.ts`
5. **VIEW_TITLES**: add entry to `VIEW_TITLES` in `lib/constants.ts`
6. **Proxy access**: add view to appropriate roles in `ROLE_VIEWS` in `proxy.ts`
7. **NAV_ACCESS**: add view to appropriate roles in `NAV_ACCESS` in `lib/users.ts`

## Data access

- Use `useData()` from `@/context/DataContext` for operations/mls/agents
- Use `useAuth()` from `@/context/AuthContext` for current user / canEdit()
- Use `useRouter()` from `next/navigation` for navigation

## UI conventions

- Wrap content in cards: `<div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">`
- Section headers: `<div className="px-[18px] py-3.5 border-b border-border">` with `text-[13px] font-semibold text-text-primary`
- Tables: use `<table>` with `<thead>/<tbody>/<tr>/<th>/<td>` — global styles in `app/globals.css` handle spacing
- Color tokens: `text-gold-dark`, `text-text-2`, `text-text-3`, `bg-surface`, `bg-bg`, `border-border`

## Steps

1. Read `lib/types.ts`, `lib/constants.ts`, `proxy.ts`, `lib/users.ts` to understand current state.
2. Create the 2 new files (page + component).
3. Edit the 5 existing files to register the view.
4. Run `npx tsc --noEmit` and fix any errors.

The view name to scaffold: **$ARGUMENTS**

If $ARGUMENTS is empty, ask what the view should be called and what it should display.
