# API Patterns — Axios + Zustand

Full implementation patterns for the data layer. Use these as the exact source of truth for `src/api/client.ts` and all store files.

---

## 1. Axios Client (`src/api/client.ts`)

```typescript
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export const client = axios.create({
  // Replace with the baseURL from openapi.json servers[0].url
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

/* ─── Request interceptor: inject JWT token ─── */
client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ─── Response interceptor: unwrap data, handle errors ─── */
client.interceptors.response.use(
  (response) => {
    const data = response.data as { code: number; message: string; data: unknown };

    // Business-level error: server returned code !== 0
    if (typeof data?.code === 'number' && data.code !== 0) {
      const message = data.message ?? '请求失败';
      toast.error(message);
      return Promise.reject(new Error(message));
    }

    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        // Token expired or invalid — clear auth and redirect to login
        useAuthStore.getState().clearAuth();
        // Use window.location to avoid importing router here
        window.location.replace('/login');
        return Promise.reject(new Error('登录已过期，请重新登录'));
      }

      if (status === 403) {
        toast.error('权限不足');
        return Promise.reject(new Error('权限不足'));
      }

      if (status === 404) {
        toast.error('资源不存在');
        return Promise.reject(new Error('资源不存在'));
      }

      if (status != null && status >= 500) {
        toast.error('服务器错误，请稍后重试');
        return Promise.reject(new Error('服务器错误'));
      }

      const message = error.message ?? '网络错误';
      toast.error(message);
      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  }
);
```

**Notes:**
- `VITE_API_BASE_URL` should be set in `.env` and `.env.production`.
- `useAuthStore.getState()` reads Zustand state outside of React — this is the correct pattern for interceptors.
- Business errors (`code !== 0`) are rejected as `Error` so `catch` blocks in stores receive them uniformly.

---

## 2. Auth API (`src/api/auth.ts`)

Generated from the login endpoint identified in Step 1 of OpenAPI analysis.

```typescript
import { client } from './client';
import type { ApiResponse } from '@/types/common';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResult {
  token: string;
  user: {
    id: number;
    name: string;
    role: string;
  };
}

export const authApi = {
  login: (data: LoginPayload) =>
    client.post<ApiResponse<LoginResult>>('/auth/login', data),

  logout: () =>
    client.post<ApiResponse<void>>('/auth/logout'),

  // Optional: refresh token endpoint if present in OpenAPI
  refresh: (refreshToken: string) =>
    client.post<ApiResponse<{ token: string }>>('/auth/refresh', { refreshToken }),
};
```

**Adapt:** Replace `/auth/login` with the actual login path from OpenAPI. Adjust `LoginPayload` and `LoginResult` fields to match the OpenAPI request/response schemas.

---

## 3. Per-Resource Service Pattern (`src/api/<resource>.ts`)

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

**Special actions** — add methods for non-CRUD endpoints:

```typescript
// POST /users/{id}/enable
enable: (id: number) =>
  client.post<ApiResponse<void>>(`${BASE}/${id}/enable`),

// POST /users/{id}/disable  
disable: (id: number) =>
  client.post<ApiResponse<void>>(`${BASE}/${id}/disable`),

// PATCH /users/{id}/status
updateStatus: (id: number, status: 0 | 1) =>
  client.patch<ApiResponse<void>>(`${BASE}/${id}/status`, { status }),

// POST /users/{id}/reset-password
resetPassword: (id: number, password: string) =>
  client.post<ApiResponse<void>>(`${BASE}/${id}/reset-password`, { password }),
```

**File upload** — when OpenAPI uses `multipart/form-data`:

```typescript
upload: (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return client.post<ApiResponse<{ url: string }>>(`${BASE}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
},
```

---

## 4. Common Types (`src/types/common.ts`)

Always generate this file first. All services and stores depend on it.

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
  [key: string]: unknown; // Allow resource-specific filter params
}
```

**Pagination variants** — adjust field names to match the actual OpenAPI response:

| OpenAPI field | Map to `PageResult` field |
|---|---|
| `list`, `items`, `records`, `rows`, `data` (array) | `list` |
| `total`, `count`, `totalCount`, `totalItems` | `total` |
| `page`, `pageNo`, `pageNum`, `current` | `page` |
| `pageSize`, `size`, `limit`, `perPage` | `pageSize` |

---

## 5. Auth Store (`src/stores/authStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  id: number;
  name: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  setAuth: (token: string, user: UserInfo) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<UserInfo>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
      updateUser: (partial) => {
        const current = get().user;
        if (current) set({ user: { ...current, ...partial } });
      },
    }),
    {
      name: 'admin-auth',
      // Only persist token and user — omit transient state
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
```

---

## 6. Per-Resource Store (`src/stores/<resource>Store.ts`)

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
  // Actions
  setParams: (params: Partial<PaginationParams>) => void;
  fetchList: () => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  // Optional: updateStatus if the resource has a status toggle
  updateStatus?: (id: number, status: 0 | 1) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  list: [],
  total: 0,
  loading: false,
  params: { page: 1, pageSize: 20 },

  setParams: (params) =>
    set((s) => ({ params: { ...s.params, ...params } })),

  fetchList: async () => {
    set({ loading: true });
    try {
      const res = await userApi.list(get().params);
      const { list, total } = res.data.data;
      set({ list, total });
    } catch {
      // toast already shown by axios interceptor; nothing extra needed here
    } finally {
      set({ loading: false });
    }
  },

  deleteItem: async (id) => {
    try {
      await userApi.delete(id);
      toast.success('删除成功');
      // Refresh list after deletion
      await get().fetchList();
    } catch {
      // error toast already shown by interceptor
    }
  },
}));
```

**When to add per-resource store vs inline state:**

| Scenario | Pattern |
|---|---|
| List page with pagination + search | Always use resource store (shared state benefits nav) |
| Simple detail page | Use local `useState` in the component (not worth a store) |
| Create/Edit modal form state | Use local `useState` — forms are ephemeral |
| Cross-page shared filter state | Add to resource store |

---

## 7. Environment Variables (`.env`)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

```env
# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com/v1
```

The base URL is derived from `servers[0].url` in the OpenAPI document. If the OpenAPI servers field is empty or points to a relative path, use `/api` as the default and document it for the user to override.

---

## 8. Package Dependencies

Generate this section in `package.json` (use latest versions at time of generation):

```json
{
  "dependencies": {
    "axios": "^1.7.0",
    "zustand": "^5.0.0",
    "react-router-dom": "^6.26.0",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "@tanstack/react-table": "^8.20.0",
    "sonner": "^1.5.0",
    "lucide-react": "^0.456.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0",
    "class-variance-authority": "^0.7.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.6.0",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

After generating all files, remind the user to run:
```bash
npm install
# or
pnpm install

# Initialize shadcn/ui if not already done:
npx shadcn@latest init
# Then add required components:
npx shadcn@latest add button input form select switch dialog alert-dialog badge skeleton table dropdown-menu avatar card
```
