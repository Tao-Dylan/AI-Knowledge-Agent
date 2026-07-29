import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-zinc-950">
      <section className="w-full max-w-3xl rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <p className="mb-4 text-sm font-medium text-zinc-500">
          Milestone 1 工程骨架
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          AI Knowledge Agent
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">
          AI 知识库助手，用于文档管理、AI 问答和带来源追溯的知识检索。
        </p>
        <div className="mt-8 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
          <Link className="rounded-xl border border-zinc-200 p-4" href="/login">
            登录页面
          </Link>
          <Link
            className="rounded-xl border border-zinc-200 p-4"
            href="/register"
          >
            注册页面
          </Link>
          <Link
            className="rounded-xl border border-zinc-200 p-4"
            href="/dashboard"
          >
            控制台
          </Link>
          <Link
            className="rounded-xl border border-zinc-200 p-4"
            href="/knowledge-bases/demo"
          >
            知识库详情
          </Link>
        </div>
      </section>
    </main>
  );
}
