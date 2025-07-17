import { useEffect } from 'react';

const ChatWidgetLoader = () => {
  useEffect(() => {
    // Configuración del widget
    window.ChatWidgetConfig = {
      webhook: {
        url: 'https://n8n-n8n.jqy3lz.easypanel.host/webhook/aff220c2-94f7-48a5-9318-a9b2506877f1/chat',
        route: 'general'
      },
      branding: {
        logo: '/images/uthopon.png',
        name: 'Uthopiq',
        welcomeText: 'Hola 👋, ¿en qué podemos ayudarte?',
        responseTimeText: 'Respondemos rápido 🚀'
      },
      style: {
        primaryColor: '#FF4B4B',
        secondaryColor: '#FF4B4B',
        position: 'right',
        backgroundColor: '#282423',
        fontColor: '#fff'
      }
    };

    // Cargar script externo
    const script = document.createElement('script');
    script.src = '/chatbot/script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No renderiza nada en la interfaz
};

export default ChatWidgetLoader;