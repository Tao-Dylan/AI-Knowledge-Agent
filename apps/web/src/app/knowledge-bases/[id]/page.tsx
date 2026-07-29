type KnowledgeBasePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function KnowledgeBasePage({
  params,
}: KnowledgeBasePageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950">
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">知识库详情</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          知识库 {id}
        </h1>
        <p className="mt-4 text-zinc-600">
          这里将展示文档列表和聊天入口。Milestone 1 只提供动态路由骨架。
        </p>
      </section>
    </main>
  );
}
