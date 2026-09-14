export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  default: "Olá! Sou o assistente virtual do Lucas Costa. Posso te falar mais sobre os projetos dele, stack de tecnologia ou experiência profissional. O que deseja saber?",
  "projetos": "O Lucas tem vários projetos focados em Full-Stack e IA. Dê uma olhada na seção 'Projetos' abaixo para ver o case do Universal Work Search AI, por exemplo!",
  "stack": "Ele trabalha bastante com React, Node.js, Python, além de ferramentas de IA como LangChain e integração com LLMs.",
  "contato": "Você pode falar com ele diretamente pela seção de Contato lá no final, ou através do LinkedIn dele."
};

export class ChatbotService {
  static async sendMessage(message: string): Promise<string> {
    // Simulando delay de rede
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));
    
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('projeto')) {
      return mockResponses['projetos'];
    }
    if (lowerMsg.includes('stack') || lowerMsg.includes('tecnologia')) {
      return mockResponses['stack'];
    }
    if (lowerMsg.includes('contato') || lowerMsg.includes('falar')) {
      return mockResponses['contato'];
    }
    
    return mockResponses['default'];
  }
}
