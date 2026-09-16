/* ==========================================================================
   Ecosistema ATINC - Asesor Legal Virtual (chatbot.js)
   Simulador entrenado EXCLUSIVAMENTE con los Estatutos del 14 de marzo de 2026.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const chatHistorial = document.getElementById('chat-historial');
    const chatInput = document.getElementById('chat-input');
    const btnEnviar = document.getElementById('btn-enviar-chat');

    // 1. Base de Conocimiento (Estatutos ATINC)
    // El bot busca palabras clave en la pregunta del usuario y devuelve la respuesta jurídica.
    const baseConocimiento = [
        {
            palabrasClave: ['deberes', 'obligacion', 'obligaciones', 'deber', 'responsabilidad'],
            respuesta: "Según el <strong>Artículo 9 de nuestros Estatutos</strong>, los deberes de los asociados incluyen: cumplir los estatutos, proteger el patrimonio sindical, rendir informes de actividades o formación, observar buena conducta y pagar puntualmente las cuotas ordinarias (1%) y extraordinarias."
        },
        {
            palabrasClave: ['organos', 'direccion', 'junta', 'directiva', 'asamblea', 'presidente'],
            respuesta: "El <strong>Capítulo V</strong> establece los Órganos de Dirección. La Asamblea General es la máxima autoridad. La Junta Directiva está conformada por diez (10) miembros (5 principales y 5 vocales) elegidos por un periodo de dos (2) años."
        },
        {
            palabrasClave: ['patrimonio', 'cuota', 'cuotas', 'dinero', 'plata', 'fondos', 'aporte'],
            respuesta: "De acuerdo con el <strong>Capítulo VIII</strong>, el patrimonio sindical está constituido por las cuotas ordinarias (equivalentes al 1% de la remuneración fija mensual), cuotas extraordinarias aprobadas por Asamblea, bienes adquiridos, donaciones y rendimientos financieros. Todo recurso se destina exclusivamente a fines estatutarios."
        },
        {
            palabrasClave: ['afiliacion', 'afiliarme', 'ingresar', 'requisito'],
            respuesta: "Según el <strong>Artículo 6</strong>, pueden afiliarse los trabajadores oficiales de la Imprenta Nacional de Colombia. Se debe presentar el formulario de afiliación ante la Junta Directiva junto con la autorización de consulta de antecedentes."
        }
    ];

    // 2. Función para procesar y enviar el mensaje
    function enviarMensaje() {
        const mensajeUsuario = chatInput.value.trim().toLowerCase();
        
        if (mensajeUsuario === '') return; // Evita enviar mensajes vacíos

        // Mostrar mensaje del usuario en la interfaz
        agregarBurbujaChat(chatInput.value, 'usuario');
        chatInput.value = ''; // Limpiar la caja de texto

        // 3. Lógica de búsqueda de respuesta (Simulador IA)
        let respuestaBot = "Lo lamento, mi fuente de verdad son exclusivamente los Estatutos de ATINC y no encontré esa información. Por favor, comunícate con la Junta Directiva o la Comisión de Reclamos (Artículo 37) para que te brinden la orientación precisa.";
        
        // Iteramos sobre la base de conocimiento para buscar coincidencias
        for (let item of baseConocimiento) {
            // Verificamos si alguna palabra clave está en el mensaje del usuario
            const coincidencia = item.palabrasClave.some(keyword => mensajeUsuario.includes(keyword));
            if (coincidencia) {
                respuestaBot = item.respuesta;
                break; // Detenemos la búsqueda al encontrar la primera coincidencia
            }
        }

        // Simular un pequeño tiempo de "escritura" para que se sienta natural (600ms)
        setTimeout(() => {
            agregarBurbujaChat(respuestaBot, 'bot');
        }, 600);
    }

    // 4. Función para dibujar las burbujas de chat en el HTML
    function agregarBurbujaChat(texto, emisor) {
        const divMensaje = document.createElement('div');
        // Asigna la clase 'mensaje usuario' o 'mensaje bot' según corresponda
        divMensaje.className = `mensaje ${emisor}`;
        divMensaje.innerHTML = texto;
        chatHistorial.appendChild(divMensaje);
        
        // Auto-scroll hacia abajo para ver el último mensaje
        chatHistorial.scrollTop = chatHistorial.scrollHeight;
    }

    // 5. Eventos (Click en el botón y presionar la tecla "Enter")
    btnEnviar.addEventListener('click', enviarMensaje);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enviarMensaje();
        }
    });
});
