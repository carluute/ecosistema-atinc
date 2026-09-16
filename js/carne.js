/* ==========================================================================
   Ecosistema ATINC - Generador de Carné (carne.js)
   Dibuja dinámicamente un carné en <canvas> con recorte circular de fotografía
   y protección de datos (todo ocurre en el navegador, nada va a un servidor).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const btnGenerarCarne = document.getElementById('btn-generar-carne');
    const canvasCarne = document.getElementById('canvas-carne');
    const ctxCarne = canvasCarne.getContext('2d');
    const inputFoto = document.getElementById('carne-foto');

    btnGenerarCarne.addEventListener('click', () => {
        // 1. Recolección de datos del formulario
        const nombre = document.getElementById('carne-nombre').value.toUpperCase();
        const cedula = document.getElementById('carne-cedula').value;
        const rh = document.getElementById('carne-rh').value;
        const fecha = document.getElementById('carne-fecha').value;

        if (!nombre || !cedula) {
            alert('Por favor, ingresa al menos tu nombre y cédula.');
            return;
        }

        canvasCarne.style.display = 'block';

        // 2. Dibujar fondo del carné (Diseño institucional)
        // Fondo base blanco
        ctxCarne.fillStyle = '#FFFFFF';
        ctxCarne.fillRect(0, 0, canvasCarne.width, canvasCarne.height);
        
        // Franja superior Azul ATINC
        ctxCarne.fillStyle = '#1A4B73';
        ctxCarne.fillRect(0, 0, canvasCarne.width, 80);
        
        // Franja inferior Amarilla
        ctxCarne.fillStyle = '#FFDD00';
        ctxCarne.fillRect(0, canvasCarne.height - 20, canvasCarne.width, 20);

        // 3. Cargar Logotipo Reducido (Diseñado para tamaños pequeños, min 15mm)
        const imgLogo = new Image();
        // NOTA: Sube el logotipo versión reducida a tu carpeta img
        imgLogo.src = 'assets/img/ATINC-logo-reducido.png';
        imgLogo.onload = () => {
            // Dibuja el logo en la esquina superior izquierda
            ctxCarne.drawImage(imgLogo, 20, 10, 60, 60);

            // Texto de cabecera institucional
            ctxCarne.fillStyle = '#FFFFFF';
            ctxCarne.font = 'bold 22px Archivo, sans-serif';
            ctxCarne.textAlign = 'left';
            ctxCarne.fillText('ASOCIACIÓN DE TRABAJADORES', 100, 35);
            ctxCarne.font = '16px Literata, serif';
            ctxCarne.fillText('IMPRENTA NACIONAL DE COLOMBIA', 100, 60);

            // 4. Escribir Datos Personales
            ctxCarne.fillStyle = '#1A4B73';
            ctxCarne.font = 'bold 24px Archivo, sans-serif';
            ctxCarne.fillText(nombre, 30, 140);
            
            ctxCarne.font = '18px Literata, serif';
            ctxCarne.fillStyle = '#2C3E50';
            ctxCarne.fillText(`CC: ${cedula}`, 30, 180);
            ctxCarne.fillText(`Tipo de Sangre/RH: ${rh}`, 30, 220);
            ctxCarne.fillText(`Afiliación: ${fecha}`, 30, 260);

            // 5. Procesamiento de la Fotografía del Usuario
            if (inputFoto.files && inputFoto.files[0]) {
                const lector = new FileReader();
                lector.onload = (e) => {
                    const imgUsuario = new Image();
                    imgUsuario.src = e.target.result;
                    imgUsuario.onload = () => {
                        // Guardamos el contexto actual antes de recortar
                        ctxCarne.save(); 
                        
                        // Crear un trazado circular (Clip) para la foto
                        const radioFoto = 75;
                        const centroX = 480;
                        const centroY = 200;
                        
                        ctxCarne.beginPath();
                        ctxCarne.arc(centroX, centroY, radioFoto, 0, Math.PI * 2, true);
                        ctxCarne.closePath();
                        ctxCarne.clip(); // Aplicar el recorte
                        
                        // Dibujar la imagen dentro del círculo centrado
                        ctxCarne.drawImage(imgUsuario, centroX - radioFoto, centroY - radioFoto, radioFoto * 2, radioFoto * 2);
                        
                        // Restaurar el contexto para no afectar futuros dibujos
                        ctxCarne.restore();
                        
                        // Borde decorativo para la foto
                        ctxCarne.beginPath();
                        ctxCarne.arc(centroX, centroY, radioFoto, 0, Math.PI * 2, true);
                        ctxCarne.lineWidth = 4;
                        ctxCarne.strokeStyle = '#FFDD00'; // Borde amarillo mariposa
                        ctxCarne.stroke();
                    };
                };
                lector.readAsDataURL(inputFoto.files[0]);
            }
        };
    });
});
