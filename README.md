# AI Knowledge Agent

AI Knowledge Agent 是一个 AI 知识库 SaaS 项目，用于文档管理、AI 辅助问答和带来源追溯的知识检索。

目标是构建一个完整的 Web 应用：用户可以登录、创建知识库、上传文档、发起 AI 问答、查看引用来源，并保留聊天历史。

## 计划技术栈

- Frontend: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: NestJS, Prisma, PostgreSQL
- AI: LLM API, streaming chat, embeddings, RAG
- Infrastructure: Docker, Redis, Nginx

## Milestone 0 文档

- [路线图](docs/ROADMAP.md)
- [PRD](docs/PRD.md)
- [业务模型分析](docs/BUSINESS_MODEL.md)
- [架构设计](docs/ARCHITECTURE.md)
- [数据库设计](docs/DATABASE_DESIGN.md)

## Milestone 1 文档

- [工程模型分析](docs/MILESTONE_1_ENGINEERING_MODEL.md)
- [实施计划](docs/MILESTONE_1_IMPLEMENTATION_PLAN.md)

## MVP 范围

第一版聚焦用户认证、知识库 CRUD、文档管理、AI Chat、流式响应和聊天历史。多租户组织、支付、复杂 RBAC 和 Agent 工作流会在后续阶段再考虑。

## 本地开发

推荐运行时：

- Node.js >= 24.16.0
- pnpm 9.15.3

安装依赖：

```bash
pnpm install
```

创建本地环境变量：

```bash
cp .env.example .env
```

启动 PostgreSQL：

```bash
pnpm db:up
```

启动前端（默认 http://localhost:3000）：

```bash
pnpm dev:web
```

启动后端（默认 http://localhost:3001）：

```bash
pnpm dev:server
```

校验 Prisma 配置：

```bash
pnpm --dir apps/server exec prisma validate
```

当前 Milestone 只包含工程骨架，不包含业务接口和数据库业务表。本地尚无业务模型时，`prisma migrate dev` 会显示 Already in sync，属预期。
