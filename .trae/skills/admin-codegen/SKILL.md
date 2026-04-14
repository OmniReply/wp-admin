---
name: admin-codegen
description: Reads an openapi.json file and generates a complete enterprise-grade admin management system frontend (Vite + React + Tailwind + shadcn/UI + Zustand + Axios). Covers TypeScript types, API services, Zustand stores, CRUD pages (list/create/edit/detail), React Router v6 with JWT AuthGuard, and a full AppLayout (sidebar + header + breadcrumb). Use when the user provides an OpenAPI JSON file and asks to build an admin panel, backoffice, management system, or dashboard, or asks to generate all pages and wire up all API endpoints.
---

# Admin Codegen Skill

## Prerequisites

Before starting, confirm:
1. The user has provided an `openapi.json` (or equivalent YAML) file path.
2. The target project uses **Vite + React + TypeScript**.
3. shadcn/UI is initialized (`components/ui/` exists or will be created).
4. Required packages will be installed: `axios`, `zustand`, `react-router-dom`, `react-hook-form`, `zod`, `@hookform/resolvers`, `@tanstack/react-table`, `sonner`.

If the project is not yet scaffolded, generate `package.json`, `vite.config.ts`, `tailwind.config.ts`, and `index.html` first, then proceed.

---

## Workflow Overview

Execute these 7 steps **in order**. Complete each step fully before moving to the next.

```
Step 1 → Analyze OpenAPI JSON
Step 2 → Generate TypeScript Types (src/types/)
Step 3 → Generate API Services (src/api/)
Step 4 → Generate Zustand Stores (src/stores/)
Step 5 → Generate CRUD Pages (src/pages/<resource>/)
Step 6 → Generate React Router (src/router/)
Step 7 → Generate Layout Framework (src/components/layout/)
```

See [openapi-analysis.md](openapi-analysis.md) for Step 1 deep-dive.
See [api-patterns.md](api-patterns.md) for Steps 3–4 patterns.
See [page-templates.md](page-templates.md) for Step 5 templates.

---

## Fixed Directory Structure

Generate **exactly** this layout. Do not deviate.

```
src/
├── api/
│   ├── client.ts          # Axios instance + JWT interceptor + 401 handler
│   └── <resource>.ts      # Per-resource service (one file per tag)
├── types/
│   ├── common.ts          # Shared: ApiResponse<T>, PageResult<T>, PaginationParams
│   └── <resource>.ts      # Per-resource interfaces (Item, CreateDto, UpdateDto)
├── stores/
│   ├── authStore.ts       # JWT token, user info, login/logout actions
│   └── <resource>Store.ts # Per-resource list + loading + pagination state
├── pages/
│   ├── login/
│   │   └── LoginPage.tsx
│   └── <resource>/
│       ├── List.tsx       # DataTable + search bar + pagination
│       ├── CreateModal.tsx
│       ├── EditModal.tsx
│       └── Detail.tsx     # Only if OpenAPI has a GET /{id} endpoint
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx  # Root layout with sidebar + main area
│   │   ├── Sidebar.tsx    # Nav links auto-generated from resource list
│   │   ├── Header.tsx     # Breadcrumb + user dropdown
│   │   └── AuthGuard.tsx  # Redirects to /login if no token
│   └── ui/               # shadcn/UI components (Button, Input, Dialog, etc.)
├── hooks/
│   ├── useTable.ts        # Generic DataTable state (pagination, sorting, filters)
│   └── useResourceForm.ts # Generic form open/close + submit handler
├── router/
│   └── index.tsx          # All routes with lazy loading + AuthGuard wrapping
├── App.tsx
└── main.tsx
```

---

## Step 1 — Analyze OpenAPI JSON

Read the OpenAPI file and build a **Resource Map** before writing any code.

For each `tag` found in the spec:
- Determine the resource name (e.g., tag `Users` → resource `user`)
- Collect all paths that carry that tag
- Classify each operation: `list | create | update | delete | detail`
- Identify the primary entity schema name from response `$ref`
- Note required fields (for zod schema generation)
- Check `securitySchemes` for JWT/Bearer definition

Output a mental summary:
```
Resource: user
  - list:   GET  /users          → UserItem[]
  - detail: GET  /users/{id}     → UserItem
  - create: POST /users          → body: CreateUserDto
  - update: PUT  /users/{id}     → body: UpdateUserDto
  - delete: DELETE /users/{id}
  Schema: UserItem { id, name, email, role, createdAt }
  CreateDto required: [name, email, role]
```

See [openapi-analysis.md](openapi-analysis.md) for `$ref` resolution, pagination detection, and enum handling.

---

## Step 2 — Generate TypeScript Types

**`src/types/common.ts`** — always generate this first:

```typescript
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  keyword?: string;
}
```

**`src/types/<resource>.ts`** — one file per resource:

```typescript
// Generate XxxItem from the primary response schema
export interface UserItem {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer'; // use enum values from OpenAPI
  createdAt: string;
  updatedAt: string;
}

// Generate CreateXxxDto from POST request body schema (required fields only)
export interface CreateUserDto {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  password: string;
}

// Generate UpdateXxxDto — same fields but all optional (PATCH) or same as Create (PUT)
export type UpdateUserDto = Partial<CreateUserDto>;
```

**Naming rules:**
- Schema name `User` → `UserItem`, `CreateUserDto`, `UpdateUserDto`
- Enum: inline as union type if ≤8 values; extract to `export type XxxEnum = ...` if reused
- `$ref` → resolve to the referenced interface name

---

## Step 3 — Generate API Services

See [api-patterns.md](api-patterns.md) for the full Axios client setup.

**`src/api/<resource>.ts`** structure:

```typescript
import { client } from './client';
import type { ApiResponse, PageResult, PaginationParams } from '@/types/common';
import type { UserItem, CreateUserDto, UpdateUserDto } from '@/types/user';

const BASE = '/users';

export const userApi = {
  list: (params: PaginationParams) =>
    client.get<ApiResponse<PageResult<UserItem>>>(BASE, { params }),

  detail: (id: number) =>
    client.get<ApiResponse<UserItem>>(`${BASE}/${id}`),

  create: (data: CreateUserDto) =>
    client.post<ApiResponse<UserItem>>(BASE, data),

  update: (id: number, data: UpdateUserDto) =>
    client.put<ApiResponse<UserItem>>(`${BASE}/${id}`, data),

  delete: (id: number) =>
    client.delete<ApiResponse<void>>(`${BASE}/${id}`),
};
```

---

## Step 4 — Generate Zustand Stores

**`src/stores/authStore.ts`** — always generate:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: { id: number; name: string; role: string } | null;
  setAuth: (token: string, user: AuthState['user']) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    { name: 'admin-auth' }
  )
);
```

**`src/stores/<resource>Store.ts`** — one per resource with list state:

```typescript
import { create } from 'zustand';
import type { UserItem } from '@/types/user';
import type { PaginationParams } from '@/types/common';
import { userApi } from '@/api/user';
import { toast } from 'sonner';

interface UserStore {
  list: UserItem[];
  total: number;
  loading: boolean;
  params: PaginationParams;
  setParams: (params: Partial<PaginationParams>) => void;
  fetchList: () => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  list: [],
  total: 0,
  loading: false,
  params: { page: 1, pageSize: 20 },
  setParams: (params) => set((s) => ({ params: { ...s.params, ...params } })),
  fetchList: async () => {
    set({ loading: true });
    try {
      const res = await userApi.list(get().params);
      set({ list: res.data.data.list, total: res.data.data.total });
    } catch {
      toast.error('加载失败');
    } finally {
      set({ loading: false });
    }
  },
  deleteItem: async (id) => {
    await userApi.delete(id);
    toast.success('删除成功');
    get().fetchList();
  },
}));
```

---

## Step 5 — Generate CRUD Pages

See [page-templates.md](page-templates.md) for complete code templates.

**Generation rules per page:**

| Page | When to generate | shadcn components |
|---|---|---|
| `List.tsx` | Always (any resource with list endpoint) | DataTable, Input, Button, Pagination, Badge, DropdownMenu |
| `CreateModal.tsx` | Resource has POST endpoint | Dialog, Form, Input/Select/Switch |
| `EditModal.tsx` | Resource has PUT/PATCH endpoint | Same as Create, pre-fills with current row data |
| `Detail.tsx` | Resource has GET `/{id}` endpoint (non-list) | Card, Descriptions-style layout |

**Field → UI component mapping:**

| OpenAPI field type/format | shadcn/UI component |
|---|---|
| `string` (short, no enum) | `Input` |
| `string` (long, `textarea` format) | `Textarea` |
| `string` (enum values) | `Select` |
| `boolean` | `Switch` |
| `integer` / `number` | `Input type="number"` |
| `string` (date/date-time format) | `DatePicker` (shadcn calendar) |
| `array` of enum | `multi-select` or `Checkbox` group |

**Zod schema** — derive from `CreateXxxDto` interface, marking required fields:

```typescript
const formSchema = z.object({
  name: z.string().min(1, '请输入名称'),
  email: z.string().email('邮箱格式不正确'),
  role: z.enum(['admin', 'editor', 'viewer']),
  // optional fields use .optional() or .nullable()
});
```

---

## Step 6 — Generate React Router

**`src/router/index.tsx`:**

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AuthGuard from '@/components/layout/AuthGuard';
import LoginPage from '@/pages/login/LoginPage';

// Lazy-load all resource pages
const UserList = lazy(() => import('@/pages/user/List'));
const UserDetail = lazy(() => import('@/pages/user/Detail'));
// ... repeat for each resource

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <AuthGuard><AppLayout /></AuthGuard>,
    children: [
      { index: true, element: <Navigate to="/users" replace /> },
      {
        path: 'users',
        children: [
          { index: true, element: <Suspense fallback={null}><UserList /></Suspense> },
          { path: ':id', element: <Suspense fallback={null}><UserDetail /></Suspense> },
        ],
      },
      // ... repeat for each resource
    ],
  },
]);
```

**`src/components/layout/AuthGuard.tsx`:**

```typescript
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import type { ReactNode } from 'react';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

---

## Step 7 — Generate Layout Framework

**`src/components/layout/AppLayout.tsx`:**

```typescript
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

**`src/components/layout/Sidebar.tsx`** — nav items auto-generated from resource list:

```typescript
// NAV_ITEMS is generated from the resource list discovered in Step 1
const NAV_ITEMS = [
  { label: '用户管理', path: '/users', icon: Users },
  { label: '订单管理', path: '/orders', icon: ShoppingCart },
  // ... one entry per resource tag
];
```

**`src/pages/login/LoginPage.tsx`** — calls the login endpoint identified from `securitySchemes`:

```typescript
// Form: username + password → POST /auth/login (or equivalent from OpenAPI)
// On success: authStore.setAuth(token, user) → navigate('/')
// On error: toast.error(message)
```

---

## Completion Checklist

After all files are generated, verify:

- [ ] Every resource tag from OpenAPI has a corresponding `types/`, `api/`, `stores/`, `pages/` set
- [ ] `router/index.tsx` includes all resource routes
- [ ] `Sidebar.tsx` lists all resources in `NAV_ITEMS`
- [ ] Auth flow: login → store token → AuthGuard → protected pages
- [ ] `client.ts` injects `Authorization: Bearer <token>` on every request
- [ ] 401 response clears authStore and redirects to `/login`
- [ ] All forms have zod validation
- [ ] All list pages have loading skeleton and empty state
- [ ] `sonner` Toaster is mounted in `App.tsx`
