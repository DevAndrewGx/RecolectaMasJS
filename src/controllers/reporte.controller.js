// importamos el modulo para los reportes con el usuariomodel para traer la data
import ExcelJS from "exceljs";
import { UsuarioModel } from "../models/usuario.model.js";

export const ReporteController = {
    async usuariosExcel(req, res) {
        try {
            // 1. Obtener datos de la BD, como va tomar tiempo usamos la funcion asincronica
            const usuarios = await UsuarioModel.getAll();

            // 2. Crear un nuevo workbook
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet("Usuarios");

            // 3. Encabezados
            sheet.addRow(["ID", "Nombre", "Email"]);

            // 4. Llenar con datos
            usuarios.forEach(u => {
                sheet.addRow([u.id, u.nombre, u.email]);
            });

            // 5. Configurar respuesta para descarga
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=reporte_usuarios.xlsx"
            );

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.status(500).json({ error: "Error generando el reporte" });
        }
    }
};
// 