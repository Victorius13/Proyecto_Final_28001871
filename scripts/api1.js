// Función para mostrar los resultados de consulta API 1
function mostrarResultado(mensaje, esError = false) {
    const contenedor = document.getElementById('contenedor');
    contenedor.className = `resultado ${esError ? 'error' : 'exito'}`;
    contenedor.innerHTML = mensaje;
}

// Función principal async para realizar la consulta
async function consultarAlumno(cedula) {
    try {
        const respuesta = await fetch(`https://unefa6tosistemas2025api.onrender.com/api/articulos/${cedula}`);
        const datos = await respuesta.json();

        if (datos.Resul) {
            const alumno = datos.data[0];
            mostrarResultado(`
                <p><strong>Desarrollado Por:</strong> ${alumno.ALUNOMBRE}, ${alumno.ALUNAPELL}</p>
            `);
        } else {
            mostrarResultado(`Error: ${datos.error}`, true);
        }
    } catch (error) {
        mostrarResultado(`Error de conexión: ${error.message}`, true);
    }
}

// Llama a la función automáticamente al cargar la página con mi cedula
window.onload = () => {
    consultarAlumno(28001871);
};