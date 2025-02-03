// Función para mostrar los resultados de consulta API 
async function consultarArticulos() {
    const URLc = 'https://unefa6tosistemas2025api.onrender.com/api/articulos';
    const categoria = document.getElementById('categoriaSelect').value;
    const resultadosDiv = document.getElementById('resultados');

    try {
        const respuesta = await fetch(URLc, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ALUMNO": "28001871",
                "ARTCATEGO": categoria
            })
        });

        const resultado = await respuesta.json();

        resultadosDiv.innerHTML = '';

        if (resultado.Resul) {
            if (resultado.data.length === 0) {
                resultadosDiv.innerHTML = '<div class="error">No se encontraron artículos</div>';
                return;
            }

            const tabla = document.createElement('table');
            tabla.innerHTML = `
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th>Número</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Fecha Creación</th>
                    </tr>
                </thead>
                <tbody>
                    ${resultado.data.map(producto => `
                        <tr>
                            <td>${producto.ARTCATEGO}</td>
                            <td>${producto.ARTNUMERO}</td>
                            <td>${producto.ARTDESCRI}</td>
                            <td>$${parseFloat(producto.ARTPRECIO).toFixed(2)}</td>
                            <td>${new Date(producto.createdAt).toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            
            resultadosDiv.appendChild(tabla);
        } else {
            resultadosDiv.innerHTML = `<div class="error">${resultado.error}</div>`;
        }
        
    } catch (error) {
        resultadosDiv.innerHTML = `<div class="error">Error en la consulta: ${error.message}</div>`;
    }
}