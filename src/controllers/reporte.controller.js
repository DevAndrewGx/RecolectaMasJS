const excel = require("excel4node");
const pool = require("../db/conexion"); // importa la conexión

const getReportes = async (req, res) => {
  try {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Recolecciones");

    // Estilos
    const style = workbook.createStyle({
      font: { color: "#000000", size: 12 },
      alignment: { horizontal: "center" }
    });

    // Encabezados
    worksheet.cell(1, 1).string("idSolicitud").style(style);
    worksheet.cell(1, 2).string("Solicitante").style(style);
    worksheet.cell(1, 3).string("Tipo Residuo").style(style);
    worksheet.cell(1, 4).string("Cantidad KG").style(style);
    worksheet.cell(1, 5).string("Estado").style(style);
    worksheet.cell(1, 6).string("Direccion").style(style);
    worksheet.cell(1, 7).string("Recolector").style(style);
    worksheet.cell(1, 8).string("Observacion").style(style);
    worksheet.cell(1, 9).string("Fecha Solicitud").style(style);
    worksheet.cell(1, 10).string("Fecha Recolección").style(style);

    // Consulta real
    const [rows] = await pool.query(`
        SELECT 
            s.idSolicitud AS id,
            s.Estado,
            u.nombre AS solicitante,
            s.direccion,
            e.nombre AS empresaRecolectora,
            r.nombre AS recolector,
            s.tipoResiduo,
            s.kg,
            s.fechaSolicitud,
            s.fechaRecoleccion,
            s.fechaAprobacion,
            s.observacion
        FROM solicitudrecoleccion s
        LEFT JOIN usuarios u ON s.solicitante = u.idUsuario
        LEFT JOIN usuarios e ON s.empresaRecolectora = e.idUsuario
        LEFT JOIN usuarios r ON s.recolector = r.idUsuario
        ORDER BY s.fechaSolicitud DESC;
    `);

    // Llenar datos
    let rowIndex = 2;
    rows.forEach((item) => {
      worksheet.cell(rowIndex, 1).number(item.id).style(style);
      worksheet.cell(rowIndex, 2).string(item.solicitante.toString()).style(style);
      worksheet.cell(rowIndex, 3).string(item.tipoResiduo || "").style(style);
      worksheet.cell(rowIndex, 4).number(item.kg || 0).style(style);
      worksheet.cell(rowIndex, 5).string(item.Estado || "").style(style);
      worksheet.cell(rowIndex, 6).string(item.direccion || "").style(style);
      worksheet.cell(rowIndex, 7).string(item.recolector ? item.recolector.toString() : "Ninguno").style(style);
      worksheet.cell(rowIndex, 8).string(item.observacion || "").style(style);

      // Fechas con validación
      const fechaSolicitud = item.fechaSolicitud instanceof Date ? item.fechaSolicitud.toISOString().split("T")[0] : "Sin fecha";
      const fechaAprobacion = item.fechaAprobacion instanceof Date ? item.fechaAprobacion.toISOString().split("T")[0] : "Sin fecha";
      const fechaRecoleccion = item.fechaRecoleccion instanceof Date ? item.fechaRecoleccion.toISOString().split("T")[0] : "Sin fecha";

      worksheet.cell(rowIndex, 9).string(fechaSolicitud).style(style);
      worksheet.cell(rowIndex, 10).string(fechaAprobacion).style(style);
      worksheet.cell(rowIndex, 11).string(fechaRecoleccion).style(style);

      rowIndex++;
    });


    // Descargar archivo
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=reporte.xlsx");

    workbook.write("reporte.xlsx", res);
  } catch (err) {
    console.error("Error generando reporte:", err);
    res.status(500).send("Error generando reporte");
  }
};

const renderReportes = (req, res) => {
  res.render("reportes", { titulo: "Reportes de Usuario" });
};

module.exports = {
  getReportes,
  renderReportes
};
