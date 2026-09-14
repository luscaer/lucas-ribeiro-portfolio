import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';

function App() {
  return (
    <div className="min-h-screen text-slate-50 font-sans selection:bg-[var(--color-brand-primary)] selection:text-white relative">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
