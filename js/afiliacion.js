/* ==========================================================================
   Ecosistema ATINC - Módulo de Afiliación (afiliacion.js)
   Genera el documento físico para impresión y radicación legal.
   Todo el procesamiento es local, garantizando la privacidad de los datos.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const formAfiliacion = document.getElementById('form-afiliacion');

    formAfiliacion.addEventListener('submit', (e) => {
        // Evita que la página se recargue al enviar el formulario
        e.preventDefault();

        // 1. Recolección de Datos
        const nombre = document.getElementById('afil-nombre').value.toUpperCase();
        const cedula = document.getElementById('afil-cedula').value;
        const expedicion = document.getElementById('afil-expedicion').value.toUpperCase();
        const correo = document.getElementById('afil-correo').value;
        const celular = document.getElementById('afil-celular').value;
        const cargo = document.getElementById('afil-cargo').value.toUpperCase();
        const fechaIngreso = document.getElementById('afil-fecha-ingreso').value;

        // 2. Construcción de la Vista de Impresión (Plantilla Oculta Temporal)
        // Se crea una ventana de impresión que imita el diseño del PDF original
        const ventanaImpresion = window.open('', '_blank');
        
        ventanaImpresion.document.write(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Formato de Afiliación - ${nombre}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #000; line-height: 1.5; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1A4B73; padding-bottom: 10px; }
                    .header h1 { font-size: 18px; color: #1A4B73; margin: 0; }
                    .header h2 { font-size: 14px; margin: 5px 0 0 0; }
                    .seccion { margin-bottom: 25px; }
                    .titulo-seccion { background-color: #f0f0f0; padding: 5px; font-weight: bold; font-size: 14px; border: 1px solid #ccc; }
                    .fila { display: flex; margin-bottom: 10px; font-size: 12px; }
                    .etiqueta { font-weight: bold; width: 200px; }
                    .valor { border-bottom: 1px solid #000; flex-grow: 1; padding-left: 10px; }
                    .declaracion { font-size: 11px; text-align: justify; margin-top: 20px; }
                    .firmas { display: flex; justify-content: space-between; margin-top: 80px; }
                    .caja-firma { width: 45%; text-align: center; border-top: 1px solid #000; padding-top: 5px; font-size: 12px; }
                    .caja-huella { width: 60px; height: 80px; border: 1px solid #000; margin: -60px auto 0 auto; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 5px; font-size: 10px;}
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>ASOCIACIÓN DE TRABAJADORES DE LA IMPRENTA NACIONAL DE COLOMBIA (ATINC)</h1>
                    <h2>FORMATO DE AFILIACIÓN</h2>
                </div>

                <div class="seccion">
                    <div class="titulo-seccion">Información Personal</div>
                    <div class="fila" style="margin-top: 10px;"><div class="etiqueta">Nombres y Apellidos:</div><div class="valor">${nombre}</div></div>
                    <div class="fila"><div class="etiqueta">Cédula No.:</div><div class="valor">${cedula}</div></div>
                    <div class="fila"><div class="etiqueta">Expedida en:</div><div class="valor">${expedicion}</div></div>
                    <div class="fila"><div class="etiqueta">Correo Electrónico:</div><div class="valor">${correo}</div></div>
                    <div class="fila"><div class="etiqueta">Celular:</div><div class="valor">${celular}</div></div>
                </div>

                <div class="seccion">
                    <div class="titulo-seccion">Información Laboral</div>
                    <div class="fila" style="margin-top: 10px;"><div class="etiqueta">Cargo:</div><div class="valor">${cargo}</div></div>
                    <div class="fila"><div class="etiqueta">Fecha de ingreso a la INC:</div><div class="valor">${fechaIngreso}</div></div>
                </div>

                <div class="declaracion">
                    <p><strong>Declaración de afiliación:</strong> Yo, identificado(a) como aparece arriba, manifiesto de manera libre, voluntaria y espontánea mi deseo de afiliarme a ATINC. Declaro que conozco y acepto los estatutos y me comprometo a cumplirlos.</p>
                    <p><strong>Autorización de descuento:</strong> Autorizo expresa e irrevocablemente a mi empleador para que haga el descuento por nómina de la cuota sindical ordinaria (1%) y/o extraordinaria, conforme a lo establecido por ATINC.</p>
                    <p><strong>Tratamiento de datos personales:</strong> Autorizo a la Asociación para recolectar, almacenar, usar y tratar mis datos personales, conforme a la Ley 1581 de 2012, exclusivamente para fines relacionados con la actividad sindical.</p>
                </div>

                <div class="firmas">
                    <div class="caja-firma">
                        Firma del Afiliado(a)
                    </div>
                    <div>
                        <div class="caja-huella">Huella</div>
                    </div>
                </div>
                
                <div style="margin-top: 40px; font-size: 10px; border-top: 1px dashed #ccc; padding-top: 10px;">
                    USO EXCLUSIVO DE LA ASOCIACIÓN<br>
                    [ ] Aprobado  [ ] Negado | Acta No. _______ Fecha: _______
                </div>
            </body>
            </html>
        `);
        
        // 3. Ejecutar la impresión y cerrar la vista temporal
        ventanaImpresion.document.close();
        ventanaImpresion.focus();
        // Permite que el CSS se cargue antes de lanzar el cuadro de impresión
        setTimeout(() => {
            ventanaImpresion.print();
        }, 500);
    });
});
