function App() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] text-slate-50 font-sans selection:bg-[var(--color-brand-primary)] selection:text-white">
      <main>
        <section className="min-h-screen flex flex-col items-center justify-center border-b border-white/10">
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-center">
            Lucas Ribeiro <span className="text-[var(--color-brand-primary)]">.</span>
          </h1>
          <p className="mt-4 text-slate-400 font-mono text-sm md:text-base animate-pulse">
            [ Em breve ]
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
