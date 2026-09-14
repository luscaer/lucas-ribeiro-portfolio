import React, { useState } from 'react';
import logo from '../assets/logo-branca.svg';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:py-6 md:px-16 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto cursor-pointer">
          <img src={logo} alt="Lucas Costa Logo" className="h-10 md:h-14 w-auto" />
        </div>
        
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          <a href="#about" className="text-sm font-mono text-slate-300 hover:text-brand-accent transition-colors">01. Sobre</a>
          <a href="#skills" className="text-sm font-mono text-slate-300 hover:text-brand-accent transition-colors">02. Skills</a>
          <a href="#projects" className="text-sm font-mono text-slate-300 hover:text-brand-accent transition-colors">03. Projetos</a>
          <a href="#contact" className="text-sm font-mono text-slate-300 hover:text-brand-accent transition-colors">04. Contato</a>
          
          <a 
            href="#contact" 
            className="ml-4 px-5 py-2.5 rounded-md border border-brand-primary text-brand-primary font-mono text-sm hover:bg-brand-primary/10 transition-colors"
          >
            Resumo / CV
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden pointer-events-auto text-white p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col pointer-events-auto"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-300 hover:text-brand-accent">01. Sobre</a>
              <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-300 hover:text-brand-accent">02. Skills</a>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-300 hover:text-brand-accent">03. Projetos</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-300 hover:text-brand-accent">04. Contato</a>
              
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 rounded-md border border-brand-primary text-brand-primary font-mono text-lg hover:bg-brand-primary/10 transition-colors"
              >
                Resumo / CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
