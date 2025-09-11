import { useEffect } from 'react';

const ChatWidgetLoader = () => {
  useEffect(() => {
    // Configuración del widget
    window.ChatWidgetConfig = {
      webhook: {
        url: 'https://n8n-n8n.jqy3lz.easypanel.host/webhook/ab242e0f-d0b5-4562-b3cb-e806e7b28024',
        route: 'general'
      },
      branding: {
        logo: '/images/uthopon.png',
        name: 'Uthopiq',
        welcomeText: 'Hola 👋, ¿en qué podemos ayudarte?',
        responseTimeText: ''
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
    script.src = `/chatbot/script.js?v=${Date.now()}`; 
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
};

export default ChatWidgetLoader;