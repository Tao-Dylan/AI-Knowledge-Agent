# Milestone 1 工程模型分析

## 1. 文档目标

Milestone 1 的目标是搭建可运行的基础工程骨架，而不是实现业务功能。

本阶段需要先回答：

- 工程为什么采用 Monorepo？
- 前端和后端为什么拆成两个 app？
- 根目录需要哪些工程配置？
- 哪些目录现在创建，哪些先不创建？
- 为什么使用 pnpm workspace，而不是一开始引入更复杂的 monorepo 工具？
- PostgreSQL 和 Prisma 在本阶段承担什么职责？

## 2. Milestone 1 范围

本阶段需要完成：

- 根 workspace 初始化。
- 前端 `apps/web` 初始化。
- 后端 `apps/server` 初始化。
- 基础 TypeScript / Lint / Format 能力。
- Tailwind CSS 和 shadcn/ui 初始配置。
- PostgreSQL 本地开发环境。
- Prisma 基础连接配置。
- 根 README 的本地启动说明。

本阶段不做：

- 用户注册登录。
- 业务数据库表建模。
- 知识库 CRUD。
- 文件上传。
- AI Chat。
- RAG。
- Redis、队列、对象存储、Nginx。
- 多租户、协作权限、支付、复杂 RBAC。

## 3. 为什么使用 Monorepo

这个项目天然包含前端、后端、数据库 schema、共享类型和文档。Monorepo 可以让这些内容在一个仓库中同步演进。

Monorepo 的价值：

- 前后端接口变化可以在同一个提交中完成。
- README、Roadmap、架构和代码保持在同一版本历史中。
- 后续可以把 API 类型、枚举和通用工具抽到共享包。
- 本地开发脚本可以在根目录统一管理。

不使用多个独立仓库，是因为当前项目还处于 MVP 阶段。拆成多个仓库会增加依赖发布、版本同步和本地启动成本。

## 4. 为什么拆成 `apps/web` 和 `apps/server`

前端和后端虽然在同一个仓库中，但职责完全不同。

`apps/web` 负责：

- 页面路由。
- 表单和交互。
- 登录态展示。
- 调用后端 API。
- 渲染流式 AI 回答。
- 使用 Tailwind CSS 和 shadcn/ui 构建 UI。

`apps/server` 负责：

- API 路由。
- 用户认证。
- 业务规则。
- 权限校验。
- Prisma 数据访问。
- AI Provider 调用。
- SSE 流式响应。

这样拆分可以避免前端直接接触数据库和 AI Provider Key，也让后端成为统一的业务边界。

## 5. 为什么先使用 pnpm workspace

Milestone 1 推荐使用 pnpm workspace。

原因：

- 配置简单。
- 对 Monorepo 支持足够。
- 依赖安装速度快。
- 可以从根目录管理多个 app。
- 后续如果需要 Turborepo，迁移成本低。

暂不引入 Turborepo 的原因：

- 当前只有两个 app，构建缓存和任务编排收益有限。
- 过早引入会增加配置理解成本。
- MVP 阶段更需要清晰的工程边界，而不是复杂工具链。

本项目当前固定运行时：

```text
Node.js >= 24.16.0
pnpm 9.15.3
```

## 6. `packages/shared` 是否现在创建

暂不创建 `packages/shared`。

原因：

- 当前还没有真实共享类型。
- 过早创建 shared 包容易变成杂物包。
- 业务接口、DTO 和枚举还没有稳定。

后续出现以下情况时再创建：

- 前端和后端需要共享 API 类型。
- 多个 app 需要共享枚举。
- 多个模块需要共享通用校验或工具。

因此，Milestone 1 只在 `pnpm-workspace.yaml` 中预留 `packages/*`，不创建实际 shared package。

## 7. 根目录职责

根目录负责项目级配置和统一入口。

建议包含：

```text
package.json
pnpm-workspace.yaml
docker-compose.yml
.env.example
README.md
docs/
apps/
```

根 `package.json` 负责：

- 声明 workspace。
- 提供统一开发脚本。
- 管理项目级开发工具。

根目录不放业务代码。

## 8. 前端工程模型

前端使用 Next.js，原因是它适合构建现代 Web 应用，并且可以很好地承载登录页、控制台、知识库详情页和聊天页。

Milestone 1 只创建页面骨架，不实现真实业务。

建议初始页面：

```text
/login
/register
/dashboard
/knowledge-bases/[id]
```

这些页面先作为路由和布局入口，后续 Milestone 再接入真实接口。

## 9. 后端工程模型

后端使用 NestJS，原因是它适合模块化组织业务逻辑。

Milestone 1 推荐先建立基础模块结构，但不实现业务逻辑：

```text
src
├── auth
├── users
├── knowledge-bases
├── documents
├── chat
├── ai
├── prisma
└── common
```

这些模块对应后续 Milestone 的业务能力。Milestone 1 只确保工程能启动，模块边界存在即可。

## 10. PostgreSQL 与 Prisma 边界

Milestone 1 需要让 PostgreSQL 能在本地启动，并让 NestJS 具备连接数据库的基础配置。

本阶段建议做到：

- `docker-compose.yml` 提供 PostgreSQL 服务。
- `.env.example` 提供数据库连接变量示例。
- `apps/server` 初始化 Prisma。
- Prisma schema 先配置 datasource 和 generator。
- 不创建业务表。

业务表从 Milestone 2 开始按用户系统逐步落地。这样可以避免在工程骨架阶段提前实现业务。

## 11. 本阶段完成标准

Milestone 1 完成后应满足：

- 根 workspace 可以安装依赖。
- 前端可以启动。
- 后端可以启动。
- PostgreSQL 可以通过 Docker 启动。
- Prisma 配置可以校验。
- README 有本地开发启动说明。
- 没有引入超出 Milestone 1 的业务功能。

## 12. 后续进入实现前的检查

进入工程搭建前，需要确认：

- 是否使用 pnpm workspace。
- 是否暂不引入 Turborepo。
- 是否暂不创建 `packages/shared`。
- 是否只配置 PostgreSQL，不引入 Redis。
- 是否只初始化 Prisma，不创建业务表。
- 是否同意先创建页面和模块骨架，不接入真实业务。
