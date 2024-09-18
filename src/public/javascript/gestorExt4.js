//Importando librerias de Node js
import fs from 'fs';
import path from 'path';

//Importando clases desde la carpeta plantillas
import { fsExt4 } from './Plantillas/fsExt4.js';


const sistema = new fsExt4();

//Crear Archivo
export function crearArchivo(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo) {
    if((pesoArchivo <= sistema.almDisp) && (sistema.nInodos > 0) ){
        sistema.crearInodo(pesoArchivo, tipoArchivo);
        sistema.crearArchivo(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo);
        
        // Mostrar información del archivo
        console.log(sistema.mostrarArchivos());

        // Crear un archivo validando la extensión
        if (tipoArchivo === 'txt') {
            const filePath = path.join(rutaArchivo, `${nombreArchivo}.txt`);
            try {
                fs.writeFileSync(filePath, 'Contenido del archivo');
                console.log('Archivo creado exitosamente en la ruta:', filePath);
            } catch (err) {
                console.error('Error al crear el archivo:', err);
            }
        }
        sistema.nInodos = sistema.nInodos - 1;
        console.log("Cant. Inodos: " + sistema.nInodos);
        // Retornar un mensaje de éxito
        return 'Archivo guardado exitosamente';
    }else if(pesoArchivo > sistema.almDisp){
        return 'No hay espacio disponible para un nuevo archivo';
    }else if(sistema.nInodos == 0){
        return 'No hay inodos disponibles para crear mas archivos';
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

