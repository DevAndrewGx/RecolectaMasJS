const respuesta = document.getElementById("respuesta"); 
const btnListar = document.getElementById("btnListar");
const btnSolicitar = document.getElementById("miFormulario");


// Escuchar el evento de envío
btnSolicitar.addEventListener("submit", function(e) {
  e.preventDefault(); // Evita recarga

  // Capturar valores del formulario
  const direccion = document.getElementById("direccion").value;
  const cantidad = parseFloat(document.getElementById("cantidad").value);
  const fechaSolicitud = document.getElementById("fechaSolicitud").value;
  const tipoResiduo = document.getElementById("tipoResiduo").value; // si tienes select/input
  const solicitante = parseInt(document.getElementById("solicitante").value); // id usuario 

  // Objeto con el formato que tu API espera
  const datos = {
    Estado: "Pendiente",
    solicitante: solicitante,
    direccion: direccion,
    empresaRecolectora: 1,
    recolector: 1,
    recoleccion: 0,
    tipoResiduo: tipoResiduo,
    kg: cantidad,
    fechaSolicitud: fechaSolicitud,
    fechaRecoleccion: null,
    fechaAprobacion: null,
    Notificacion: 0,
    observacion: "Solicitud creada desde formulario"
  };

  // Enviar a tu API
  fetch("http://localhost:8282/api/recolecciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    return res.json();
  })
  .then(data => {
    respuesta.innerHTML = `<p style="color:green;">✅ Solicitud Programada</p>`;
    console.log("Respuesta del servidor:", data);
    location.reload();
   })
  .catch(error => {
    respuesta.innerHTML = `<p style="color:red;">❌ Error al enviar los datos</p>`;
    console.error("Error:", error);
  });
});

