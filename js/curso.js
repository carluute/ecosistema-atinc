/* ==========================================================================
   Ecosistema ATINC - Motor de Curso y Certificación (curso.js)
   Maneja el cuestionario interactivo y renderiza el certificado usando <canvas>.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. BASE DE DATOS DEL CUESTIONARIO
    // Preguntas estructuradas con base en los Estatutos. Ninguna altera la literalidad legal.
    const preguntas = [
        {
            pregunta: "¿Cuál es el órgano de máxima autoridad de ATINC según el Capítulo V?",
            opciones: ["La Junta Directiva", "La Comisión de Reclamos", "La Asamblea General"],
            respuestaCorrecta: 2,
            explicacion: "Correcto. El Artículo 10 establece que la Asamblea General es la máxima autoridad."
        },
        {
            pregunta: "¿A cuánto equivale la cuota ordinaria sindical mensual descontada por nómina?",
            opciones: ["1% de la remuneración fija", "2% de la remuneración fija", "0.5% de la remuneración fija"],
            respuestaCorrecta: 0,
            explicacion: "Exacto. El Artículo 39 del Capítulo VIII define que la cuota es equivalente al 1% de la remuneración fija mensual."
        }
    ];

    let preguntaActual = 0;

    // 2. REFERENCIAS DEL DOM
    const contenedorPregunta = document.getElementById('pregunta-texto');
    const contenedorOpciones = document.getElementById('opciones-container');
    const retroalimentacion = document.getElementById('retroalimentacion');
    const contenedorQuiz = document.getElementById('quiz-container');
    const contenedorCertificado = document.getElementById('certificado-container');

    // 3. RENDERIZADO DEL CUESTIONARIO
    function cargarPregunta() {
        const datosPregunta = preguntas[preguntaActual];
        contenedorPregunta.textContent = datosPregunta.pregunta;
        contenedorOpciones.innerHTML = ''; // Limpiamos opciones anteriores
        retroalimentacion.textContent = ''; // Limpiamos retroalimentación

        // Iteramos para crear los botones de respuesta
        datosPregunta.opciones.forEach((opcion, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-secundario';
            btn.style.margin = '5px';
            btn.textContent = opcion;
            btn.onclick = () => evaluarRespuesta(index);
            contenedorOpciones.appendChild(btn);
        });
    }

    // 4. EVALUACIÓN Y RETROALIMENTACIÓN
    function evaluarRespuesta(seleccion) {
        const datosPregunta = preguntas[preguntaActual];
        if (seleccion === datosPregunta.respuestaCorrecta) {
            retroalimentacion.style.color = '#1A4B73'; // Azul ATINC
            retroalimentacion.innerHTML = `<strong>¡Correcto!</strong> ${datosPregunta.explicacion}`;
            
            // Pasamos a la siguiente pregunta después de 2.5 segundos
            setTimeout(() => {
                preguntaActual++;
                if (preguntaActual < preguntas.length) {
                    cargarPregunta();
                } else {
                    mostrarPantallaCertificado();
                }
            }, 2500);
        } else {
            retroalimentacion.style.color = '#E30713'; // Rojo tricolor
            retroalimentacion.textContent = "Respuesta incorrecta. Inténtalo de nuevo.";
        }
    }

    // 5. PANTALLA DE CERTIFICACIÓN
    function mostrarPantallaCertificado() {
        contenedorQuiz.style.display = 'none';
        contenedorCertificado.style.display = 'block';
    }

    // 6. DIBUJO DEL CERTIFICADO EN EL CANVAS
    const btnGenerarCert = document.getElementById('btn-generar-certificado');
    const canvasCert = document.getElementById('canvas-certificado');
    const ctxCert = canvasCert.getContext('2d');

    btnGenerarCert.addEventListener('click', () => {
        const nombre = document.getElementById('nombre-certificado').value.toUpperCase();
        const pronombre = document.getElementById('pronombre-certificado').value.toLowerCase();
        
        if (!nombre || !pronombre) {
            alert('Por favor, completa tu nombre y pronombre.');
            return;
        }

        // a) Fondo crema (papel ahuesado del Manual)
        ctxCert.fillStyle = '#F1E6D0';
        ctxCert.fillRect(0, 0, canvasCert.width, canvasCert.height);

        // b) Cargar e incrustar la imagen del Guilloche vectorial exportada desde Canva
        const imgGuilloche = new Image();
        // NOTA: Asegúrate de guardar el guilloche como PNG transparente en la carpeta img
        imgGuilloche.src = 'assets/img/guilloche-fondo.png'; 
        
        imgGuilloche.onload = () => {
            // Dibujamos el guilloche como fondo decorativo con opacidad
            ctxCert.globalAlpha = 0.15;
            ctxCert.drawImage(imgGuilloche, 0, 0, canvasCert.width, canvasCert.height);
            ctxCert.globalAlpha = 1.0; // Restauramos opacidad para el texto

            // c) Dibujar textos del certificado
            ctxCert.fillStyle = '#1A4B73'; // Azul ATINC
            ctxCert.textAlign = 'center';
            
            ctxCert.font = 'bold 30px Archivo, sans-serif';
            ctxCert.fillText('ASOCIACIÓN DE TRABAJADORES DE LA IMPRENTA NACIONAL', 400, 100);
            
            ctxCert.font = 'italic 20px Literata, serif';
            ctxCert.fillText('Certifica que la/el', 400, 200);
            
            // Respeto al lenguaje inclusivo según el pronombre elegido
            ctxCert.font = 'bold 35px Archivo, sans-serif';
            ctxCert.fillText(`${pronombre} ${nombre}`, 400, 260);
            
            ctxCert.font = '20px Literata, serif';
            ctxCert.fillText('ha aprobado satisfactoriamente el curso interactivo sobre los', 400, 320);
            ctxCert.fillText('Estatutos Oficiales de ATINC.', 400, 360);

            // Mostrar el botón de descarga
            const btnDescarga = document.getElementById('btn-descargar-certificado');
            btnDescarga.style.display = 'inline-block';
            btnDescarga.href = canvasCert.toDataURL('image/png');
            btnDescarga.download = `Certificado_ATINC_${nombre}.png`;
        };
    });

    // Iniciar la primera pregunta al cargar la página
    cargarPregunta();
});
