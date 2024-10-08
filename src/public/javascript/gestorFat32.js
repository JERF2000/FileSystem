//Importando librerias de Node js
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';            //Para Archivos .xlsx
import PptxGenJS from 'pptxgenjs';  //Para Archivos .pptx
import PDFDocument from 'pdfkit';   //Para Archivos .pdf

//Importando clases desde la carpeta plantillas
import { fsFat32 } from './Plantillas/fsFat32.js';

const sistema = new fsFat32();

//Crear Archivo
export function crearArchivoFat32(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo) {
    if (pesoArchivo <= sistema.almDisp) {
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
            } else if (tipoArchivo === 'xlsx') {
                const filePath = path.join(rutaArchivo, `${nombreArchivo}.xlsx`);
                // Crear una nueva hoja de cálculo
                const wb = XLSX.utils.book_new();
                // Crear una hoja de datos
                const ws = XLSX.utils.aoa_to_sheet([
                    ['Nombre', '#Cuenta', 'Seccion'],
                    ['Daniel Edgardo Morales Lopez', '#00000000', 'Sistemas Operativos Sec. 75'],
                    ['Hilda Ester Melendez Henriquez', '#11111111', 'Sistemas Operativos Sec. 75'],
                    ['Jasir Esaud Reyes Figueroa', '#22222222', 'Sistemas Operativos Sec. 75'],
                    ['Yeferson Alejandro Bonilla Castillo', '#33333333', 'Sistemas Operativos Sec. 75']
                ]);
                // Agregar la hoja al libro
                XLSX.utils.book_append_sheet(wb, ws, 'Datos');
                // Escribir el archivo en el sistema de archivos
                XLSX.writeFile(wb, filePath);
                console.log('Archivo .xlsx creado exitosamente en la ruta:', filePath);
            } else if (tipoArchivo === 'pptx') {
                const filePath = path.join(rutaArchivo, `${nombreArchivo}.pptx`);
                const pptx = new PptxGenJS();
                const slide = pptx.addSlide();
                slide.addText('Contenido de la presentación PPTX', { x: 1, y: 1, fontSize: 18 });
                pptx.writeFile(filePath).then(() => {
                    console.log('Archivo .pptx creado exitosamente en la ruta:', filePath);
                }).catch(err => {
                    console.error('Error al crear el archivo .pptx:', err);
                });
            } else if (tipoArchivo === 'Carpeta') {
                const dirPath = path.join(rutaArchivo, nombreArchivo);
                fs.mkdirSync(dirPath);
                console.log('Carpeta creada exitosamente en la ruta:', dirPath);
            }
        } catch (err) {
            console.error('Error al crear el archivo o carpeta:', err);
        }
        
        return 'Archivo guardado exitosamente';
    } else if (pesoArchivo > sistema.almDisp) {
        return 'No hay espacio disponible para un nuevo archivo';
    }
}

// Guardar Archivo
export function guardarArchivoFat32(nombreArchivoExistente, nombreArchivoNuevo, tipoArchivo, rutaArchivoExistente) {
    // Construir las rutas completas con la extensión del archivo si es un archivo, o sin extensión si es una carpeta
    const rutaCompletaExistente = tipoArchivo === 'Carpeta'
        ? path.join(rutaArchivoExistente, nombreArchivoExistente)
        : path.join(rutaArchivoExistente, `${nombreArchivoExistente}.${tipoArchivo}`);
    const rutaCompletaNueva = tipoArchivo === 'Carpeta'
        ? path.join(rutaArchivoExistente, nombreArchivoNuevo)
        : path.join(rutaArchivoExistente, `${nombreArchivoNuevo}.${tipoArchivo}`);
    console.log('Ruta Completa Existente:', rutaCompletaExistente);
    console.log('Ruta Completa Nueva:', rutaCompletaNueva);
    try {
        if (fs.existsSync(rutaCompletaExistente)) {
            if (tipoArchivo === 'Carpeta') {
                // Manejo para carpetas
                fs.renameSync(rutaCompletaExistente, rutaCompletaNueva);
                console.log(`Carpeta renombrada exitosamente de ${nombreArchivoExistente} a ${nombreArchivoNuevo}`);
                return `Carpeta renombrada exitosamente a ${nombreArchivoNuevo}`;
            } else {
                // Manejo para archivos
                fs.renameSync(rutaCompletaExistente, rutaCompletaNueva);
                console.log(`Archivo renombrado exitosamente de ${nombreArchivoExistente}.${tipoArchivo} a ${nombreArchivoNuevo}.${tipoArchivo}`);
                return `Archivo renombrado exitosamente a ${nombreArchivoNuevo}.${tipoArchivo}`;
            }
        } else {
            return 'El archivo o carpeta no existe';
        }
    } catch (err) {
        console.error('Error al renombrar el archivo o carpeta:', err);
        return `Error al renombrar el archivo o carpeta: ${err.message}`;
    }
}

// Eliminar Archivo
export function eliminarArchivoFat32(nombreEliminar, tipoEliminar, rutaEliminar) {
    const filePath = tipoEliminar === 'Carpeta'
        ? path.join(rutaEliminar, nombreEliminar)
        : path.join(rutaEliminar, `${nombreEliminar}.${tipoEliminar}`);

    try {
        if (fs.existsSync(filePath)) {
            if (tipoEliminar === 'Carpeta') {
                fs.rmSync(filePath, { recursive: true, force: true });
                console.log('Carpeta eliminada exitosamente:', filePath);
                return 'Carpeta eliminada exitosamente';
            } else if (['txt', 'docx', 'pdf', 'xlsx', 'pptx'].includes(tipoEliminar)) {
                fs.unlinkSync(filePath);
                console.log(`Archivo .${tipoEliminar} eliminado exitosamente:`, filePath);
                return `Archivo .${tipoEliminar} eliminado exitosamente`;
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


// Mover Archivo
export function moverArchivoFat32(nombreArchivo, tipoArchivo, rutaActual, nuevaRuta) {
    // Construir la ruta completa del archivo actual y de la nueva ruta
    const rutaArchivoActual = path.join(rutaActual, `${nombreArchivo}.${tipoArchivo}`);
    const nuevaRutaArchivo = path.join(nuevaRuta, `${nombreArchivo}.${tipoArchivo}`);

    try {
        // Verificar si el archivo existe en la ruta actual
        if (fs.existsSync(rutaArchivoActual)) {
            // Mover el archivo a la nueva ruta
            fs.renameSync(rutaArchivoActual, nuevaRutaArchivo);
            console.log(`Archivo ${nombreArchivo}.${tipoArchivo} movido a ${nuevaRutaArchivo}`);
            return `Archivo ${nombreArchivo}.${tipoArchivo} movido exitosamente a la nueva ruta`;
        } else {
            return `El archivo ${nombreArchivo}.${tipoArchivo} no existe en la ruta actual`;
        }
    } catch (err) {
        console.error('Error al mover el archivo:', err.message);
        return `Error al mover el archivo: ${err.message}`;
    }
}

/**
 * Configuraciones del OS y del sistema de archivos seleccionado
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 */

//Guardar configuración del OS
export function actualizarConfiguracionOSFat32(almacenamientoTotal, almacenamientoDisponible) {
    sistema.definirEspacio(almacenamientoTotal, almacenamientoDisponible);
    console.log("Espacio Total (GB):     " + sistema.almTotal);
    console.log("Espacio Disponible(GB): " + sistema.almDisp);
}

//Guardar configuración del FileSystem EXT4
export function guardarConfigFat32(cluster, numFat, nEntradasD, soporteLFN) {
    sistema.configurarFileSystemFat32(cluster, numFat, nEntradasD, soporteLFN);
    //Desarrollar el atributo extents "Ver clase fsExt4"
}