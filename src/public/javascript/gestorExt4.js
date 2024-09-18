//Importando librerias de Node js
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';   //Para Archivos PDF

//Importando clases desde la carpeta plantillas
import { fsExt4 } from './Plantillas/fsExt4.js';


const sistema = new fsExt4();

//Crear Archivo
export function crearArchivo(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo) {
    if ((pesoArchivo <= sistema.almDisp) && (sistema.nInodos > 0)) {
        sistema.crearInodo(pesoArchivo, tipoArchivo);
        sistema.crearArchivo(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo);
        
        // Mostrar información del archivo
        console.log(sistema.mostrarArchivos());

        try {
            if (tipoArchivo === 'txt') {
                const filePath = path.join(rutaArchivo, `${nombreArchivo}.txt`);
                fs.writeFileSync(filePath, 'Contenido del archivo');
                console.log('Archivo .txt creado exitosamente en la ruta:', filePath);
            } else if (tipoArchivo === 'docx') {
                const filePath = path.join(rutaArchivo, `${nombreArchivo}.docx`);
                fs.writeFileSync(filePath, 'Contenido del documento');
                console.log('Archivo .docx creado exitosamente en la ruta:', filePath);
            } else if (tipoArchivo === 'pdf') {
                const filePath = path.join(rutaArchivo, `${nombreArchivo}.pdf`);
                const doc = new PDFDocument();
                doc.pipe(fs.createWriteStream(filePath));
                doc.text('Contenido del archivo PDF');
                doc.end();
                console.log('Archivo .pdf creado exitosamente en la ruta:', filePath);
            } else if (tipoArchivo === 'Carpeta') {
                const dirPath = path.join(rutaArchivo, nombreArchivo);
                fs.mkdirSync(dirPath);
                console.log('Carpeta creada exitosamente en la ruta:', dirPath);
            }
        } catch (err) {
            console.error('Error al crear el archivo o carpeta:', err);
        }

        sistema.nInodos = sistema.nInodos - 1;
        console.log("Cant. Inodos: " + sistema.nInodos);
        return 'Archivo guardado exitosamente';
    } else if (pesoArchivo > sistema.almDisp) {
        return 'No hay espacio disponible para un nuevo archivo';
    } else if (sistema.nInodos === 0) {
        return 'No hay inodos disponibles para crear más archivos';
    }
}

// Eliminar Archivo
export function eliminarArchivo(nombreArchivo, tipoArchivo, rutaArchivo) {
    // Construir la ruta completa del archivo o carpeta
    const filePath = path.join(rutaArchivo, nombreArchivo);

    try {
        // Construir la ruta completa del archivo o carpeta
        const filePath = path.join(rutaArchivo, `${nombreArchivo}${tipoArchivo === 'Carpeta' ? '' : `.${tipoArchivo}`}`);
        
        // Verificar si el archivo o carpeta existe
        if (fs.existsSync(filePath)) {
            if (tipoArchivo === 'Carpeta') {
                // Eliminar la carpeta
                fs.rmSync(filePath, { recursive: true, force: true });
                console.log('Carpeta eliminada exitosamente:', filePath);
                return 'Carpeta eliminada exitosamente';
            } else if (['txt', 'docx', 'pdf'].includes(tipoArchivo)) {
                // Eliminar el archivo con la extensión correspondiente
                fs.unlinkSync(filePath);
                console.log(`Archivo .${tipoArchivo} eliminado exitosamente:`, filePath);
                return `Archivo .${tipoArchivo} eliminado exitosamente`;
            } else {
                return 'Tipo de archivo no soportado';
            }
        } else {
            return 'El archivo o carpeta no existe';
        }
    } catch (err) {
        console.error('Error al eliminar el archivo o carpeta:', err.message);
        return 'Error al eliminar el archivo o carpeta';
    }
}




/**
 * Configuraciones del OS y del sistema de archivos seleccionado
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 */

//Guardar configuración del OS
export function actualizarConfiguracionOS(almacenamientoTotal, almacenamientoDisponible) {
    sistema.definirEspacio(almacenamientoTotal, almacenamientoDisponible);
    console.log("Espacio Total (GB):     " + sistema.almTotal);
    console.log("Espacio Disponible(GB): " + sistema.almDisp);
}

//Guardar configuración del FileSystem EXT4
export function guardarConfigExt4(bloque, nInodos, extents) {
    sistema.configurarFileSystemExt4(bloque, nInodos, extents);
    //Desarrollar el atributo extents "Ver clase fsExt4"
}

