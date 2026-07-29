# Milestone 1 基础工程搭建实施计划

> **For agentic workers:** 执行本计划时，应使用任务驱动方式逐项完成。每个任务完成后运行对应验证命令，再进入下一个任务。

**目标：** 搭建可运行的 Monorepo 工程骨架，包括 Next.js 前端、NestJS 后端、PostgreSQL 本地服务和 Prisma 基础配置。

**架构：** 根目录使用 pnpm workspace 管理 `apps/web` 和 `apps/server`。Milestone 1 只搭工程骨架，不实现用户、知识库、文档、聊天或 RAG 业务。

**技术栈：** Node.js 24.16+、pnpm 9.15.3、pnpm workspace、Next.js、React、TypeScript、Tailwind CSS、shadcn/ui、NestJS、Prisma、PostgreSQL、Docker Compose。

## 全局约束

- 只实现 Milestone 1 范围。
- 不创建业务数据库表。
- 不实现注册、登录、知识库 CRUD、文件上传、AI Chat 或 RAG。
- 不引入 Redis、队列、对象存储、Nginx、Turborepo、多租户或知识库协作功能。
- 暂不创建 `packages/shared` 实际包，只在 workspace 中预留 `packages/*`。
- 每个阶段完成后更新 README 的本地开发说明。

---

## 任务 1：初始化根 workspace

**文件：**

- 创建：`package.json`
- 创建：`pnpm-workspace.yaml`
- 创建：`.gitignore`
- 创建：`.env.example`
- 修改：`README.md`

**步骤：**

- [x] 创建根 `package.json`。

```json
{
  "name": "ai-knowledge-agent",
  "private": true,
  "packageManager": "pnpm@9.15.3",
  "engines": {
    "node": ">=24.16.0"
  },
  "scripts": {
    "dev:web": "pnpm --dir apps/web dev",
    "dev:server": "pnpm --dir apps/server start:dev",
    "build:web": "pnpm --dir apps/web build",
    "build:server": "pnpm --dir apps/server build",
    "lint:web": "pnpm --dir apps/web lint",
    "lint:server": "pnpm --dir apps/server lint",
    "db:up": "docker compose up -d postgres",
    "db:down": "docker compose down"
  }
}
```

- [x] 创建 `pnpm-workspace.yaml`。

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [x] 创建 `.gitignore`。

```gitignore
node_modules
.next
dist
coverage
.env
.env.local
.env.*.local
```

- [x] 创建 `.env.example`。

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_knowledge_agent?schema=public"
JWT_SECRET="change-me"
AI_PROVIDER_API_KEY=""
```

- [x] 验证根 workspace 文件存在。

```bash
test -f package.json
test -f pnpm-workspace.yaml
test -f .env.example
```

## 任务 2：创建 Next.js 前端工程

**文件：**

- 创建：`apps/web`
- 修改：`README.md`

**步骤：**

- [x] 使用 Next.js 初始化前端。

```bash
pnpm create next-app@latest apps/web --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
```

- [x] 确认前端目录存在。

```bash
test -f apps/web/package.json
test -d apps/web/src/app
```

- [x] 创建 Milestone 1 初始页面占位。

推荐先建立路由入口：

```text
apps/web/src/app/login/page.tsx
apps/web/src/app/register/page.tsx
apps/web/src/app/dashboard/page.tsx
apps/web/src/app/knowledge-bases/[id]/page.tsx
```

这些页面只需要渲染页面标题，不接入真实接口。

- [x] 启动前端验证。

```bash
pnpm dev:web
```

预期：Next.js dev server 可以启动。

## 任务 3：初始化 shadcn/ui

**文件：**

- 修改：`apps/web`

**步骤：**

- [x] 在前端工程中初始化 shadcn/ui。

```bash
pnpm --dir apps/web dlx shadcn@latest init
```

建议选择：

```text
style: default
base color: neutral
css variables: yes
```

- [x] 安装基础组件。

```bash
pnpm --dir apps/web dlx shadcn@latest add button input card
```

`form` 组件等到用户系统阶段根据真实表单需求引入，避免在工程骨架阶段提前安装表单状态和校验依赖。

- [x] 验证前端 lint。

```bash
pnpm lint:web
```

## 任务 4：创建 NestJS 后端工程

**文件：**

- 创建：`apps/server`
- 修改：`README.md`

**步骤：**

- [x] 使用 Nest CLI 初始化后端。

```bash
pnpm dlx @nestjs/cli new apps/server --package-manager pnpm --skip-git
```

- [x] 确认后端目录存在。

```bash
test -f apps/server/package.json
test -d apps/server/src
```

- [x] 创建后端模块目录。

```text
apps/server/src/auth
apps/server/src/users
apps/server/src/knowledge-bases
apps/server/src/documents
apps/server/src/chat
apps/server/src/ai
apps/server/src/prisma
apps/server/src/common
```

这些目录只作为模块边界，不实现业务逻辑。

- [x] 启动后端验证。

```bash
pnpm dev:server
```

预期：NestJS dev server 可以启动。

## 任务 5：配置 PostgreSQL 本地服务

**文件：**

- 创建：`docker-compose.yml`
- 修改：`.env.example`
- 修改：`README.md`

**步骤：**

- [x] 创建 `docker-compose.yml`。

```yaml
services:
  postgres:
    image: postgres:16
    container_name: ai_knowledge_agent_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ai_knowledge_agent
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

- [x] 启动 PostgreSQL。

```bash
pnpm db:up
```

- [x] 验证容器状态。

```bash
docker compose ps
```

预期：`postgres` 服务为 running。

## 任务 6：初始化 Prisma

**文件：**

- 创建：`apps/server/prisma/schema.prisma`
- 修改：`apps/server/package.json`
- 修改：`README.md`

**步骤：**

- [x] 安装 Prisma 依赖。

```bash
pnpm --dir apps/server add @prisma/client
pnpm --dir apps/server add -D prisma
```

- [x] 初始化 Prisma。

```bash
pnpm --dir apps/server prisma init
```

- [x] 确认 `schema.prisma` 只包含 datasource 和 generator，不创建业务模型。

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- [x] 验证 Prisma schema。

```bash
pnpm --dir apps/server prisma validate
```

预期：Prisma schema 校验通过。

## 任务 7：补充本地开发说明

**文件：**

- 修改：`README.md`

**步骤：**

- [x] 在 README 中补充本地开发章节。

需要包含：

- 安装依赖。
- 启动数据库。
- 启动前端。
- 启动后端。
- Prisma 校验。

- [x] 验证 README 链接仍然有效。

```bash
test -f docs/ROADMAP.md
test -f docs/MILESTONE_1_ENGINEERING_MODEL.md
test -f docs/MILESTONE_1_IMPLEMENTATION_PLAN.md
```

## 任务 8：最终验证

**文件：**

- 检查所有 Milestone 1 新增和修改文件。

**步骤：**

- [x] 安装依赖。

```bash
pnpm install
```

- [x] 验证前端。

```bash
pnpm lint:web
pnpm build:web
```

- [x] 验证后端。

```bash
pnpm lint:server
pnpm build:server
```

- [x] 验证数据库服务。

```bash
docker compose ps
```

- [x] 验证 Prisma。

```bash
pnpm --dir apps/server prisma validate
```

- [x] 查看工作区状态。

```bash
git status --short
```

## 完成标准

Milestone 1 完成后应满足：

- 根 workspace 存在并可安装依赖。
- `apps/web` 可以启动、lint、build。
- `apps/server` 可以启动、lint、build。
- PostgreSQL 可以通过 Docker Compose 启动。
- Prisma schema 可以校验。
- README 包含本地开发说明。
- 没有实现任何 Milestone 2 及之后的业务功能。
