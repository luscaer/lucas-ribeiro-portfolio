import React from 'react';
import { AnimatedName } from './AnimatedName';
import { ChatbotWidget } from './ChatbotWidget';
import { CircuitBackground } from './CircuitBackground';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden px-6 md:px-12 lg:px-24">
      <CircuitBackground />
      
      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Lado Esquerdo: Apresentação e Nome */}
        <div className="flex-1 w-full max-w-2xl 2xl:max-w-4xl pt-10 lg:pt-0">
          <p className="font-mono text-brand-accent text-sm md:text-base 2xl:text-lg mb-4 tracking-wider">
            Olá, eu sou
          </p>
          
          <div className="mb-6 2xl:mb-10">
            <AnimatedName />
          </div>
          
          <p className="text-gray-400 text-lg md:text-xl 2xl:text-2xl font-light leading-relaxed max-w-xl 2xl:max-w-3xl">
            Desenvolvedor Full-Stack e Engenheiro de IA focado em construir sistemas de produção, de plataformas de agentes de IA à infraestrutura escalável que as sustenta. Tenho experiência criando soluções para as áreas de <strong className="text-white font-medium">Saúde</strong>, <strong className="text-white font-medium">Contabilidade Pública</strong> e <strong className="text-white font-medium">Automação de Processos</strong>.
          </p>
        </div>

        {/* Lado Direito: Chatbot (que desce no mobile) */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end pb-10 lg:pb-0">
          <ChatbotWidget />
        </div>
      </div>
    </section>
  );
};
