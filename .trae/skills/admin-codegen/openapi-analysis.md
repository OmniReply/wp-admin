# OpenAPI JSON Analysis Guide

This file details how to parse an OpenAPI 3.x (or Swagger 2.x) document and extract the information needed for code generation.

---

## 1. Read the Document

The user will provide a file path, URL, or paste the content. Accept:
- `.json` — parse as-is
- `.yaml` / `.yml` — treat as YAML (key: value structure is readable without a parser)
- Swagger 2.x (`swagger: "2.0"`) — same analysis applies, minor field name differences noted below

---

## 2. Extract Global Metadata

```json
{
  "info": { "title": "My Admin API", "version": "1.0.0" },
  "servers": [{ "url": "https://api.example.com/v1" }],
  "securitySchemes": {
    "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" }
  }
}
```

- **Base URL**: use `servers[0].url` as the Axios `baseURL`
- **Auth scheme**: look for `type: http, scheme: bearer` → confirms JWT auth
- **Login endpoint**: search paths for `POST /auth/login`, `POST /login`, `POST /token`, or any path tagged `auth` with a POST + no security requirement

---

## 3. Build the Resource Map

### 3a. Group paths by tag

Each path operation (`get`, `post`, `put`, `patch`, `delete`) has a `tags` array. Use the **first tag** as the resource grouper.

```json
"/users": {
  "get":  { "tags": ["Users"], "operationId": "listUsers" },
  "post": { "tags": ["Users"], "operationId": "createUser" }
},
"/users/{id}": {
  "get":    { "tags": ["Users"], "operationId": "getUserById" },
  "put":    { "tags": ["Users"], "operationId": "updateUser" },
  "delete": { "tags": ["Users"], "operationId": "deleteUser" }
}
```

Result: tag `Users` → resource name `user` (lowercase singular).

**Tag → resource name conversion:**
- Strip trailing `s` if plural: `Users` → `user`, `Orders` → `order`
- CamelCase tag: `UserRoles` → `userRole`
- If tag has spaces: `User Management` → `userManagement`

### 3b. Classify each operation

| HTTP method | Path pattern | Operation type |
|---|---|---|
| GET | `/{resource}` | `list` |
| GET | `/{resource}/{id}` | `detail` |
| POST | `/{resource}` | `create` |
| PUT or PATCH | `/{resource}/{id}` | `update` |
| DELETE | `/{resource}/{id}` | `delete` |

Edge cases:
- `PATCH /{resource}/{id}/status` → treat as a special `updateStatus` action; generate a separate `updateStatus(id, data)` method on the service object
- `POST /{resource}/{id}/enable` or `/disable` → toggle action; generate `enable(id)` / `disable(id)` methods
- Nested resources (`/users/{userId}/orders`) → treat as a sub-resource; generate a separate `userOrderApi` service

### 3c. Detect pagination

A list endpoint supports pagination if **any** of these are true:
- Query parameters include `page`, `pageNo`, `pageNum`, `offset`, or `limit`
- Response schema has fields named `list`, `items`, `records`, `data` (array) + `total`, `count`
- Response schema `$ref` matches a wrapper like `PageResult`, `Pagination`, `ListResponse`

If pagination is detected → use `PageResult<T>` wrapper type. If not → use `T[]` directly.

---

## 4. Resolve `$ref`

All `$ref` values point to `#/components/schemas/<SchemaName>`. Before using any schema, resolve all `$ref` chains.

**Algorithm:**
1. Encounter `"$ref": "#/components/schemas/UserItem"`
2. Look up `spec.components.schemas.UserItem`
3. If that schema also contains `$ref` fields inside its properties, resolve those too (one level is usually sufficient)
4. If a `$ref` points to an `allOf`, `anyOf`, or `oneOf`:
   - `allOf: [A, B]` → merge all properties from A and B into one flat interface
   - `anyOf` / `oneOf` → generate a union type: `type Xxx = A | B`

**Swagger 2.x difference:** `$ref` points to `#/definitions/<SchemaName>` instead of `#/components/schemas/<SchemaName>`.

---

## 5. Extract Schema Properties

For each primary entity schema, extract:

```json
"UserItem": {
  "type": "object",
  "properties": {
    "id":        { "type": "integer", "format": "int64" },
    "name":      { "type": "string" },
    "email":     { "type": "string", "format": "email" },
    "role":      { "type": "string", "enum": ["admin", "editor", "viewer"] },
    "status":    { "type": "integer", "enum": [0, 1], "description": "0=disabled, 1=active" },
    "createdAt": { "type": "string", "format": "date-time" },
    "avatar":    { "type": "string", "format": "uri" }
  },
  "required": ["id", "name", "email", "role"]
}
```

**Type mapping — OpenAPI → TypeScript:**

| OpenAPI type + format | TypeScript type | Form component |
|---|---|---|
| `string` (no format) | `string` | `Input` |
| `string` + `email` | `string` | `Input type="email"` |
| `string` + `uri` | `string` | `Input` (show preview if image) |
| `string` + `date` | `string` | `DatePicker` |
| `string` + `date-time` | `string` | `DatePicker` (with time) |
| `string` + `enum` | `'val1' \| 'val2'` | `Select` |
| `integer` / `number` | `number` | `Input type="number"` |
| `integer` + `enum` (0/1) | `0 \| 1` or `boolean` | `Switch` (if 0=off, 1=on) |
| `boolean` | `boolean` | `Switch` |
| `array` of `string` | `string[]` | Multi-select or checkbox group |
| `array` of `object` | `XxxItem[]` | Sub-table or not shown in form |
| `object` (nested) | Separate `interface` | Nested form section |

**Required vs optional:**
- Property in `required[]` array → required in `CreateDto`, required in zod schema (no `.optional()`)
- Property **not** in `required[]` → optional in `CreateDto` (`?:`), `.optional()` or `.nullable()` in zod
- `id`, `createdAt`, `updatedAt` → **exclude from CreateDto and UpdateDto** (server-managed)

---

## 6. Identify Request Body Schemas

For `POST` and `PUT`/`PATCH` operations:

```json
"requestBody": {
  "required": true,
  "content": {
    "application/json": {
      "schema": { "$ref": "#/components/schemas/CreateUserDto" }
    }
  }
}
```

- If `requestBody.content['application/json'].schema.$ref` exists → use that schema as the DTO
- If `requestBody.content['application/json'].schema` is inline → treat it as an anonymous DTO and name it `Create<ResourceName>Dto`
- If `requestBody.content['multipart/form-data']` → file upload; generate `FormData` payload and use `Input type="file"` in the form

---

## 7. Identify Response Schemas

For list responses, find the array item type:

```json
"responses": {
  "200": {
    "content": {
      "application/json": {
        "schema": { "$ref": "#/components/schemas/UserListResponse" }
      }
    }
  }
}
```

Then look up `UserListResponse`:
```json
{
  "type": "object",
  "properties": {
    "code": { "type": "integer" },
    "data": {
      "type": "object",
      "properties": {
        "list":  { "type": "array", "items": { "$ref": "#/components/schemas/UserItem" } },
        "total": { "type": "integer" }
      }
    }
  }
}
```

Extract the item type: `UserItem`.
Confirm pagination fields: `list` (array) + `total` → use `PageResult<UserItem>`.

---

## 8. Handle Authentication Endpoints

Find the login endpoint by scanning for paths that:
- Have `POST` method
- Have **no** `security` requirement (or are explicitly excluded)
- Path contains `login`, `token`, `signin`, `auth`

Extract the request body fields (usually `username`/`email` + `password`).
Extract the response token field (usually `token`, `accessToken`, `access_token`).
Extract the user info fields from the response.

This drives `LoginPage.tsx` generation.

---

## 9. Final Resource Map Output

After analysis, produce a structured summary. Example:

```
=== Resource Map ===

AUTH
  Login:  POST /auth/login  → body: { username, password } → { token, user }

RESOURCE: user  (tag: Users)
  list:   GET    /users          → PageResult<UserItem>  ✓ pagination
  detail: GET    /users/{id}     → UserItem
  create: POST   /users          → CreateUserDto
  update: PUT    /users/{id}     → UpdateUserDto
  delete: DELETE /users/{id}
  Schema fields:
    id (number, readonly), name (string, required), email (string, required),
    role (enum: admin|editor|viewer, required), status (0|1, Switch),
    createdAt (datetime, readonly), avatar (string/uri)
  Form fields (create/edit): name, email, role, status, avatar

RESOURCE: order  (tag: Orders)
  list:   GET    /orders         → PageResult<OrderItem>  ✓ pagination
  detail: GET    /orders/{id}    → OrderItem
  create: POST   /orders         → CreateOrderDto
  update: PATCH  /orders/{id}    → UpdateOrderDto
  delete: DELETE /orders/{id}
  Special: POST /orders/{id}/cancel → cancelOrder(id)
  ...
```

Use this map as the single source of truth for all subsequent code generation steps.
