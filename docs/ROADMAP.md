# AI 知识库助手 Milestone Roadmap

## Roadmap 目标

这份路线图用于把项目从空仓库推进到一个可演示、可部署、可持续演进的 AI 全栈应用。

路线不是按技术模块堆叠排列，而是按项目交付顺序推进：先完成产品和系统设计，再搭工程骨架，然后逐步加入用户系统、知识库、AI Chat、文件上传、RAG 和工程化能力。

## Milestone 0: 产品与系统设计

目标：先不写业务代码，把项目边界想清楚。

产出：

- PRD：明确产品背景、目标用户、使用场景、MVP 范围和非目标。
- 业务模型分析：从 PRD 场景推导业务对象、对象关系和资源边界。
- 架构设计：明确前端、后端、数据库、AI 服务、文件处理和部署边界。
- 数据库设计：明确 MVP 表结构、关系、索引、权限查询模式和 RAG 预留表。
- README：提供项目入口和文档导航。

完成标准：

- 能清楚解释这个项目为什么做。
- 能清楚说明第一版做什么、不做什么。
- 能从 PRD 推导出核心业务对象和对象关系。
- 能画出系统主链路。
- 能解释核心数据表关系。

推荐推导顺序：

```text
PRD
-> 业务模型分析
-> 数据库设计
-> 架构设计
-> Roadmap
```

## Milestone 1: 基础工程搭建

目标：搭建可运行的 Monorepo 工程骨架。

范围：

- 创建 `apps/web` Next.js 前端项目。
- 创建 `apps/server` NestJS 后端项目。
- 配置 TypeScript、Lint、Format。
- 接入 Tailwind CSS 和 shadcn/ui。
- 启动 PostgreSQL。
- 配置 Prisma。
- 建立基础环境变量规范。

推荐页面：

- `/login`
- `/register`
- `/dashboard`
- `/knowledge-bases/[id]`

推荐后端模块：

- `auth`
- `users`
- `knowledge-bases`
- `documents`
- `chat`
- `ai`
- `prisma`
- `common`

完成标准：

- 前端可以启动。
- 后端可以启动。
- 后端可以连接数据库。
- Prisma migration 可以运行。
- README 能说明本地启动方式。

## Milestone 2: 用户系统

目标：真正跑通登录注册和后端认证链路。

范围：

- 注册接口：`POST /auth/register`
- 登录接口：`POST /auth/login`
- JWT 签发。
- JWT Guard。
- 当前用户获取。
- 前端登录、注册页面。
- 登录后进入 dashboard。

核心数据表：

- `users`

实现重点：

- Controller、Service、DTO 的职责分工。
- Validation Pipe。
- 密码 Hash。
- JWT 认证。
- 前后端登录态管理。

完成标准：

- 用户可以注册。
- 用户可以登录。
- 登录后可以访问受保护接口。
- 未登录访问受保护接口会被拒绝。

## Milestone 3: 知识库 CRUD

目标：完成知识库核心 CRUD、数据库关系和资源归属校验。

范围：

- 创建知识库：`POST /knowledge-bases`
- 查询知识库列表：`GET /knowledge-bases`
- 查询知识库详情：`GET /knowledge-bases/:id`
- 删除知识库：`DELETE /knowledge-bases/:id`
- 前端 dashboard 展示知识库列表。
- 前端支持创建和删除知识库。

核心数据表：

- `knowledge_bases`

实现重点：

- 一对多关系：`User -> KnowledgeBase`
- owner 权限校验。
- Service 层封装业务规则。
- 前端表单和列表状态管理。

完成标准：

- 用户只能看到自己的知识库。
- 用户不能访问或删除别人的知识库。
- dashboard 可以完成知识库基础管理。

## Milestone 4: 普通 AI Chat

目标：先不做 RAG，跑通 AI 应用最核心的聊天链路。

范围：

- 创建会话。
- 发送用户消息。
- 后端调用 AI Provider。
- SSE 流式返回 AI 回答。
- 保存用户消息和 AI 消息。
- 前端实时渲染流式回答。
- 前端展示聊天历史。

核心数据表：

- `conversations`
- `messages`

实现重点：

- SSE。
- LLM API 调用。
- 流式响应转发。
- 消息持久化。
- 普通 Chat 与 RAG Chat 的边界。

完成标准：

- 用户可以发起一次普通 AI 对话。
- 前端可以实时显示回答内容。
- 刷新页面后仍能看到历史消息。

## Milestone 5: 文件上传

目标：让知识库开始具备文档管理能力。

范围：

- 上传 PDF 或 TXT。
- 保存文件。
- 保存文档元数据。
- 展示知识库下的文档列表。
- 删除文档。
- 记录文档处理状态。

核心数据表：

- `documents`

实现重点：

- Multipart 上传。
- 文件大小和类型限制。
- 本地存储与对象存储的差异。
- 文档状态流转。
- 通过知识库关系校验文档权限。

完成标准：

- 用户可以在自己的知识库中上传文档。
- 用户可以查看文档列表。
- 用户可以删除自己的文档。
- 用户不能操作别人知识库下的文档。

## Milestone 6: RAG 知识库问答

目标：进入项目的 AI 核心能力，让回答基于上传文档。

范围：

- 解析文档文本。
- 将文本切成 chunks。
- 生成 Embedding。
- 保存向量数据。
- 用户提问时检索相关 chunks。
- 将检索结果注入 Prompt。
- AI 生成带引用来源的回答。

核心数据表：

- `document_chunks`

实现重点：

- 文档解析。
- Chunk 策略。
- Embedding。
- Vector Search。
- Prompt 构建。
- 引用来源设计。

完成标准：

- 用户可以基于某个知识库提问。
- 系统能检索相关文档片段。
- AI 回答能引用来源。
- 普通 Chat 和 RAG Chat 能在产品上区分清楚。

## Milestone 7: 工程化提升

目标：让项目从“功能可用”提升到“工程可信”。

范围：

- Docker Compose 启动前端、后端、数据库和 Redis。
- Redis 限流。
- 文档解析队列。
- Worker 处理大文件解析和 Embedding。
- 对象存储替换本地文件。
- 基础日志。
- 部署说明。

实现重点：

- Docker。
- Redis。
- Queue。
- Worker。
- 环境变量管理。
- 生产部署边界。

完成标准：

- 可以用一条命令启动完整本地环境。
- 大文件上传不会阻塞主请求。
- API 有基本限流保护。
- 项目可以部署到服务器或云平台。

## 后续产品演进

这些能力不进入 MVP，但可以在核心 AI 知识库闭环稳定后继续扩展：

- 知识库协作：通过 `knowledge_base_members` 支持邀请成员、编辑权限和只读权限。
- 企业组织：在知识库协作稳定后，再引入组织空间和组织成员。
- 权限增强：从简单成员角色演进到更细粒度的资源权限。
- 审计日志：记录成员、文档、知识库和 AI 问答的关键操作。

## 推荐节奏

建议每个 Milestone 都以以下方式收尾：

1. 更新 README 或对应文档。
2. 补充关键截图或接口说明。
3. 提交一个清晰的 Git commit。
4. 记录本阶段的关键工程决策、接口变化和数据模型变化。

这样项目最终不仅能运行，也能清楚呈现从 MVP 到 RAG 再到工程化部署的演进过程。
