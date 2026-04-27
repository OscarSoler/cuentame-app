@AGENTS.md

# Convención de Estructura — NextRails

## Analogía Rails

| Rails | NextRails |
|---|---|
| `controllers/` | `app/(app)/[feature]/page.tsx` |
| `views/[controller]/` | `app/(app)/[feature]/components/` |
| `models/` | `core/[feature]/` |
| `components/` | `components/` (solo globales) |

## Las 6 Reglas

**1. La página es el controlador**
`page.tsx` solo importa + compone. Sin datos mock, sin componentes inline, sin lógica de derivación.

**2. Local vs global**
- `[feature]/components/` → solo se usa en ese feature
- `components/` raíz → se usa en 2+ features o es infraestructura de UI
- Pregunta: _"¿Si borro este feature, el componente desaparece?"_ → sí = local, no = global

**3. Nombres de archivos**
- Siempre kebab-case
- Componente: `[noun]-[descriptor].tsx` → `expense-detail-drawer.tsx`
- Action: `[entity].actions.ts` → `transaction.actions.ts`
- Use case: `[verb]-[entity].ts` → `create-transaction.ts`
- `"use client"` solo cuando usa hooks o event handlers

**4. Flujo de datos — sin saltar capas**
```
page.tsx → Server Action → Use Case → Repository → DB
```
Los componentes React nunca importan desde `infrastructure/` o `application/` directamente.

**5. Drawers/modals son del feature que los dispara**
Viven en `[feature]/components/` junto al trigger. Subcarpeta solo si supera 3 archivos.

**6. Reutiliza componentes y variantes existentes antes de inventar**
Antes de escribir un `<button>`, `<input>`, etc. nativo o estilos custom, revisa `components/ui/` y usa el componente con la variante/`size` apropiados (`Button` tiene `default | outline | secondary | ghost | destructive | link` y `xs | sm | default | lg | icon*`). Solo crea estilos ad-hoc si ninguna variante encaja, y en ese caso considera añadir la variante al componente base en lugar de duplicar clases.

## Estructura de referencia

```
app/
  (app)/
    [feature]/
      page.tsx           ← controlador: importa actions, compone componentes
      components/        ← vistas del feature
  (onboarding)/
    page.tsx
    components/
  api/
    chat/
      route.ts           ← solo handlers HTTP, sin lógica de negocio

core/
  [feature]/             ← Vertical Slicing + Clean Architecture
    domain/
      [entity].entity.ts
      [entity].repository.ts
    infrastructure/
      drizzle-[entity].repository.ts
    application/
      get-[entity].ts
      create-[entity].ts
      update-[entity].ts
      delete-[entity].ts
      index.ts           ← barrel export
    presentation/
      [entity].actions.ts  ← Server Actions ("use server")

components/
  navigation/            ← globales de navegación
  ui/                    ← shadcn base, no tocar

lib/
  ai/                    ← tools y prompts
  db/                    ← schema y conexión
  context/               ← React contexts
```

## Server Actions

Los Server Actions viven en `core/[feature]/presentation/[entity].actions.ts`.

Son el único punto de contacto entre los componentes React y la lógica de negocio. Siguen este patrón:

```typescript
"use server";

import { DrizzleTransactionRepository } from "../infrastructure/drizzle-transaction.repository";
import { CreateTransaction } from "../application/create-transaction";

function repo() {
  return new DrizzleTransactionRepository();
}

export async function createTransactionAction(data: TransactionInput) {
  try {
    const useCase = new CreateTransaction({ repository: repo() });
    const result = await useCase.execute(data);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}
```

**Reglas de los Server Actions:**
- Siempre llevan `"use server"` al inicio del archivo
- Solo instancian el repositorio y el use case — sin lógica de negocio propia
- Siempre retornan `{ success: boolean, data?, error? }` — nunca lanzan excepciones al cliente
- Los componentes los importan directamente: `import { createTransactionAction } from "@/core/transaction/presentation/transaction.actions"`
- Las páginas (`page.tsx`) los pueden llamar directamente al ser Server Components

---

# Arquitectura del Proyecto - NextRails

## Patrón de Arquitectura

Este proyecto usa **Clean Architecture** con **Vertical Slicing** e **Inversión de Dependencias**.

### Principios

1. **Parámetros nombrados**: Todas las clases y funciones usan objetos de configuración
2. **Inversión de dependencias**: Domain no depende de Infrastructure
3. **Use Cases individuales**: Cada operación es una clase independiente, agrupadas cuando tienen responsabilidad relacionada
4. **Type Safety**: TypeScript estricto en todas las capas
5. **Drizzle ORM**: Para interacción con base de datos (PostgreSQL en Supabase)

## Estructura de Features

```
src/features/{feature-name}/
├── domain/
│   ├── {entity}.entity.ts       # Entidades de negocio
│   └── {entity}.repository.ts   # Interface del repository
├── infrastructure/
│   └── drizzle-{entity}.repository.ts  # Implementación con Drizzle
├── application/
│   ├── get-{entity}.ts          # Queries agrupadas
│   ├── create-{entity}.ts       # Command para crear
│   ├── update-{entity}.ts       # Command para actualizar
│   ├── delete-{entity}.ts       # Command para eliminar
│   └── index.ts                 # Barrel export
└── presentation/
    └── {components}.tsx         # Componentes React (opcional)
```

## Capas

### 1. Domain Layer

**Propósito**: Lógica de negocio pura, sin dependencias externas

```typescript
// {entity}.entity.ts
export interface UserConfig {
  id: string;
  name: string;
  email: string;
  age?: number;
}

export class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly age: number;

  constructor(config: UserConfig) {
    this.id = config.id;
    this.name = config.name;
    this.email = config.email;
    this.age = config.age ?? 18;
  }

  // Métodos de negocio
  isAdult(): boolean {
    return this.age >= 18;
  }
}
```

```typescript
// {entity}.repository.ts - Interface (NO implementación)
import { User, UserConfig } from "./user.entity";

export interface UserRepository {
  getById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(user: Omit<UserConfig, "id">): Promise<User>;
  update(id: string, data: Partial<UserConfig>): Promise<User>;
  delete(id: string): Promise<void>;
}
```

### 2. Infrastructure Layer

**Propósito**: Implementación concreta con Drizzle ORM

```typescript
// drizzle-{entity}.repository.ts
import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { User, UserConfig } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";

export class DrizzleUserRepository implements UserRepository {
  async getById(id: string): Promise<User | null> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    if (!row) return null;

    return new User({
      id: row.id,
      name: row.name,
      email: row.email,
      age: row.age ?? undefined,
    });
  }

  async getAll(): Promise<User[]> {
    const rows = await db.select().from(usersTable);
    return rows.map((row) => new User({ ...row }));
  }

  async create(userData: Omit<UserConfig, "id">): Promise<User> {
    const [row] = await db.insert(usersTable).values(userData).returning();

    return new User(row);
  }

  async update(id: string, userData: Partial<UserConfig>): Promise<User> {
    const [row] = await db
      .update(usersTable)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(usersTable.id, id))
      .returning();

    return new User(row);
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersTable).where(eq(usersTable.id, id));
  }
}
```

### 3. Application Layer

**Propósito**: Casos de uso y lógica de aplicación

#### Patrón: Agrupar operaciones relacionadas

```typescript
// get-{entity}.ts - Queries agrupadas
import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";

interface GetUserConfig {
  repository: UserRepository;
}

export class GetUser {
  constructor(private config: GetUserConfig) {}

  async byId(userId: string): Promise<User | null> {
    if (!userId?.trim()) {
      throw new Error("El ID es requerido");
    }
    return await this.config.repository.getById(userId);
  }

  async byEmail(email: string): Promise<User | null> {
    if (!email?.trim()) {
      throw new Error("El email es requerido");
    }
    // Implementación...
  }

  async all(): Promise<User[]> {
    return await this.config.repository.getAll();
  }
}
```

```typescript
// create-{entity}.ts - Command individual
import { User, UserConfig } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";

interface CreateUserConfig {
  repository: UserRepository;
}

export class CreateUser {
  constructor(private config: CreateUserConfig) {}

  async execute(userData: Omit<UserConfig, "id">): Promise<User> {
    // Validaciones de negocio
    this.validate(userData);

    // Verificar duplicados
    const exists = await this.config.repository.exists(userData.email);
    if (exists) {
      throw new Error("El email ya existe");
    }

    return await this.config.repository.create(userData);
  }

  private validate(data: Omit<UserConfig, "id">): void {
    if (!data.name?.trim()) {
      throw new Error("El nombre es requerido");
    }
    // Más validaciones...
  }
}
```

```typescript
// update-{entity}.ts
import { User, UserConfig } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";

interface UpdateUserConfig {
  repository: UserRepository;
}

export class UpdateUser {
  constructor(private config: UpdateUserConfig) {}

  async execute(userId: string, updates: Partial<UserConfig>): Promise<User> {
    // Validaciones
    const existing = await this.config.repository.getById(userId);
    if (!existing) {
      throw new Error("Usuario no encontrado");
    }

    return await this.config.repository.update(userId, updates);
  }
}
```

```typescript
// delete-{entity}.ts
import { UserRepository } from "../domain/user.repository";

interface DeleteUserConfig {
  repository: UserRepository;
}

export class DeleteUser {
  constructor(private config: DeleteUserConfig) {}

  async execute(userId: string): Promise<void> {
    const existing = await this.config.repository.getById(userId);
    if (!existing) {
      throw new Error("Usuario no encontrado");
    }

    await this.config.repository.delete(userId);
  }
}
```

```typescript
// index.ts - Barrel export
export { GetUser } from "./get-user";
export { CreateUser } from "./create-user";
export { UpdateUser } from "./update-user";
export { DeleteUser } from "./delete-user";
```

### 4. Presentation Layer (Server Actions)

**Propósito**: Integración con Next.js

```typescript
// src/app/actions/{entity}.actions.ts
"use server";

import { DrizzleUserRepository } from "@/features/user/infrastructure/drizzle-user.repository";
import {
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "@/features/user/application";
import { revalidatePath } from "next/cache";

// Factory para DI
function createRepository() {
  return new DrizzleUserRepository();
}

export async function getUserByIdAction(userId: string) {
  try {
    const repository = createRepository();
    const getUser = new GetUser({ repository });
    const user = await getUser.byId(userId);

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function getAllUsersAction() {
  try {
    const repository = createRepository();
    const getUser = new GetUser({ repository });
    const users = await getUser.all();

    return { success: true, users };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function createUserAction(userData: any) {
  try {
    const repository = createRepository();
    const createUser = new CreateUser({ repository });
    const user = await createUser.execute(userData);

    revalidatePath("/users");
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function updateUserAction(userId: string, updates: any) {
  try {
    const repository = createRepository();
    const updateUser = new UpdateUser({ repository });
    const user = await updateUser.execute(userId, updates);

    revalidatePath("/users");
    revalidatePath(`/users/${userId}`);

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function deleteUserAction(userId: string) {
  try {
    const repository = createRepository();
    const deleteUser = new DeleteUser({ repository });
    await deleteUser.execute(userId);

    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
```

## Database (Drizzle)

### Configuración

```typescript
// src/lib/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);

export const db = drizzle(client);
```

```typescript
// src/lib/db/schema.ts
import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  age: integer("age"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type inference
export type UserRow = typeof usersTable.$inferSelect;
export type UserInsert = typeof usersTable.$inferInsert;
```

```typescript
// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

### Comandos

```bash
# Generar migraciones
npm run db:generate

# Aplicar migraciones
npm run db:push

# Abrir Drizzle Studio
npm run db:studio
```

## Reglas de Nomenclatura

### Archivos

- **Entities**: `{entity}.entity.ts` (singular, kebab-case)
- **Repositories**: `{entity}.repository.ts` (interface), `drizzle-{entity}.repository.ts` (implementación)
- **Use Cases**: `{action}-{entity}.ts` (ej: `create-user.ts`, `get-user.ts`)
- **Actions**: `{entity}.actions.ts` (plural)

### Clases

- **Entities**: `PascalCase` (ej: `User`, `Payment`)
- **Use Cases**: `PascalCase` verbo + sustantivo (ej: `CreateUser`, `GetUser`)
- **Repositories**: `PascalCase` + Repository (ej: `DrizzleUserRepository`)

### Métodos

- **Use Cases agrupados**: `camelCase` descriptivo (ej: `byId()`, `byEmail()`, `all()`)
- **Use Cases individuales**: `execute()`

## Cuándo Agrupar vs Separar

### ✅ Agrupar en una clase (como GetUser)

- Múltiples queries relacionadas (`byId`, `byEmail`, `all`)
- Operaciones de solo lectura similares
- Validaciones compartidas simples

### ✅ Separar en archivos individuales

- Commands con lógica compleja (`CreateUser`, `UpdateUser`)
- Operaciones que modifican estado
- Casos de uso con validaciones diferentes

## Ejemplo Completo: Feature Payment

```
src/features/payment/
├── domain/
│   ├── payment.entity.ts
│   └── payment.repository.ts
├── infrastructure/
│   └── drizzle-payment.repository.ts
├── application/
│   ├── get-payment.ts       # byId, byInvoiceId, byUserId
│   ├── create-payment.ts
│   ├── update-payment.ts
│   ├── cancel-payment.ts
│   └── index.ts
```

## Testing (Opcional)

```typescript
// __tests__/features/user/application/create-user.test.ts
import { CreateUser } from "@/features/user/application/create-user";
import { MockUserRepository } from "@/features/user/infrastructure/mock-user.repository";

describe("CreateUser", () => {
  it("should create a user successfully", async () => {
    const repository = new MockUserRepository();
    const createUser = new CreateUser({ repository });

    const user = await createUser.execute({
      name: "John Doe",
      email: "john@example.com",
      age: 25,
    });

    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
  });

  it("should throw error if email already exists", async () => {
    const repository = new MockUserRepository();
    const createUser = new CreateUser({ repository });

    await createUser.execute({
      name: "John Doe",
      email: "john@example.com",
    });

    await expect(
      createUser.execute({
        name: "Jane Doe",
        email: "john@example.com",
      }),
    ).rejects.toThrow("El email ya existe");
  });
});
```

## Ventajas de esta Arquitectura

✅ **Testeable**: Cada capa se puede testear independientemente  
✅ **Mantenible**: Cambios aislados por feature y capa  
✅ **Escalable**: Agregar features sin afectar existentes  
✅ **Type-safe**: TypeScript en todo el flujo  
✅ **Flexible**: Cambiar ORM sin tocar domain/application  
✅ **Legible**: Estructura autodocumentada

## Referencias

- Clean Architecture: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- Vertical Slice Architecture: https://www.jimmybogard.com/vertical-slice-architecture/
- Drizzle ORM: https://orm.drizzle.team/
