/* ==========================================================================
   Ecosistema ATINC - Script Principal (main.js)
   Controla la UI general y la accesibilidad (WCAG) de los elementos modulares.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Referencias a los elementos del DOM (Document Object Model)
    const btnAbrirChat = document.getElementById('btn-abrir-chat');
    const btnCerrarChat = document.getElementById('btn-cerrar-chat');
    const chatContainer = document.getElementById('chatbot-container');
    const inputChat = document.getElementById('chat-input');

    // 2. Función para abrir el Asesor Legal Virtual
    btnAbrirChat.addEventListener('click', () => {
        // Removemos la clase que oculta el contenedor
        chatContainer.classList.remove('chatbot-oculto');
        // Ocultamos el botón flotante
        btnAbrirChat.style.display = 'none';
        // Foco de accesibilidad: dirige el teclado inmediatamente al cuadro de texto
        inputChat.focus(); 
    });

    // 3. Función para cerrar el Asesor Legal Virtual
    btnCerrarChat.addEventListener('click', () => {
        // Añadimos la clase para ocultar
        chatContainer.classList.add('chatbot-oculto');
        // Restauramos el botón flotante
        btnAbrirChat.style.display = 'block';
        // Foco de accesibilidad: devuelve el control al botón flotante
        btnAbrirChat.focus();
    });

    // Nota para futuras integraciones: Aquí se añadirá la lógica para cargar 
    // el feed de redes sociales (X y Facebook) de manera asíncrona.
});
