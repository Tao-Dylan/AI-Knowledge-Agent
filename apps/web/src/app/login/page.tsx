export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 text-zinc-950">
      <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">认证模块</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">登录</h1>
        <p className="mt-4 text-zinc-600">
          Milestone 1 只提供页面入口，真实登录逻辑将在用户系统阶段实现。
        </p>
      </section>
    </main>
  );
}
