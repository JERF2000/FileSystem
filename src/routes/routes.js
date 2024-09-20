import { Router } from "express";

//Archivo gestorFat32
import { 
    crearArchivoFat32,
    guardarArchivoFat32,
    eliminarArchivoFat32,
    moverArchivoFat32,
    actualizarConfiguracionOSFat32, 
    guardarConfigFat32 
} from "../public/javascript/gestorFat32.js";

//Archivo gestorNtfs.js
import { 
    crearArchivoNtfs,
    guardarArchivoNtfs,
    eliminarArchivoNtfs,
    moverArchivoNtfs,
    actualizarConfiguracionOSNtfs,
    guardarConfigNtfs
} from "../public/javascript/gestorNtfs.js";

//Archivo gestorExt4.js
import { 
    crearArchivoExt4,
    guardarArchivoExt4, 
    eliminarArchivoExt4,
    moverArchivoExt4,
    actualizarConfiguracionOSExt4, 
    guardarConfigExt4
} from '../public/javascript/gestorExt4.js';

const router = Router();

router.get('/', (req, res) => res.render('views/home', { title: 'File System' }));
router.get('/configOS', (req, res) => res.render('views/configOS'));
router.get('/configExt4', (req, res) => res.render('views/configExt4'));
router.get('/configFat32', (req, res) => res.render('views/configFat32'));
router.get('/configNtfs', (req, res) => res.render('views/configNtfs'));
router.get('/opArchivos', (req, res) => res.render('views/opArchivos'));

/**
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 *                   Configuración del OS
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 */

// Ruta para guardar la configuración de Almacenamiento (OS)
router.post('/guardarConfiguracion', (req, res) => {
    console.log(req.body);
    const { almacenamientoTotal, almacenamientoDisponible , seleccion} = req.body;

    // Llamar a la función para actualizar la configuración
    if(seleccion == 'Fat32'){
        console.log("Se escogio el FileSystem FAT32");
        actualizarConfiguracionOSFat32(Number(almacenamientoTotal), Number(almacenamientoDisponible));
    }else if(seleccion == 'NTFS'){
        actualizarConfiguracionOSNtfs(Number(almacenamientoTotal), Number(almacenamientoDisponible));
    }else if(seleccion == 'EXT4'){
        console.log("Se escogio el FileSystem EXT4");
        actualizarConfiguracionOSExt4(Number(almacenamientoTotal), Number(almacenamientoDisponible));
    }

    res.json({ message: 'Configuración guardada exitosamente' });
});

/**
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 *              Configuración del FileSystem FAT32
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 */

// Guardar configuracion del OS FAT32
router.post('/guardarDatosFat32', (req, res) => {
    console.log(req.body);
    const { cluster, numFat, nEntradasD, soporteLFN } = req.body;

    guardarConfigFat32(Number(cluster), Number(numFat), Number(nEntradasD), Number(soporteLFN));

    res.json({ message: 'Configuración guardada exitosamente' });
});

// Ruta para crear archivos FAT32
router.post('/crearArchivo', (req, res) => {
    console.log(req.body);
    const { nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo } = req.body;

    const mensaje = crearArchivoFat32(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo);
    
    res.status(200).json({ message: mensaje });
});

// Ruta para guardar archivos FAT32
router.post('/guardarArchivo', (req, res) => {
    console.log(req.body);
    const { nombreArchivoExistente, nombreArchivoNuevo, pesoArchivoNuevo, tipoArchivo, rutaArchivoExistente } = req.body;

    const mensaje = guardarArchivoFat32(nombreArchivoExistente, nombreArchivoNuevo, pesoArchivoNuevo, tipoArchivo, rutaArchivoExistente);

    res.status(200).json({ message: mensaje });
});

// Ruta para eliminar archivos FAT32
router.post('/eliminarArchivo', (req, res) => {
    console.log(req.body);
    const { nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo } = req.body;

    const mensaje = eliminarArchivoFat32(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo);
    
    res.status(200).json({ message: mensaje });
});

// Ruta para mover archivos FAT32
router.post('/moverArchivo', (req, res) => {
    console.log(req.body)
    const { nombreArchivo, tipoArchivo, rutaArchivo, nuevaRutaArchivo } = req.body;

    const mensaje = moverArchivoFat32(nombreArchivo, tipoArchivo, rutaArchivo, nuevaRutaArchivo);

    res.status(200).json({ message: mensaje });
});

/**
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
*              Configuración del FileSystem NTFS
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 */

// Guardar configuracion del OS NTFS
router.post('/guardarDatosNtfs', (req, res) => {
    console.log(req.body);
    const { cluster, numMFT, cifrado, compresion } = req.body;

    // Llamar a la función para actualizar la configuración
    guardarConfigNtfs(cluster, numMFT, cifrado, compresion);

    res.json({ message: 'Configuración guardada exitosamente' });
});

// Ruta para crear archivos NTFS
router.post('/crearArchivo', (req, res) => {
    console.log(req.body);
    const { nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo } = req.body;

    const mensaje = crearArchivoNtfs(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo);

    res.status(200).send(mensaje);
});

// Ruta para guardar archivos NTFS
router.post('/guardarArchivo', (req, res) => {
    console.log(req.body);
    const { nombreArchivoExistente, nombreArchivoNuevo, pesoArchivoNuevo, tipoArchivo, rutaArchivoExistente } = req.body;

    const mensaje = guardarArchivoNtfs(nombreArchivoExistente, nombreArchivoNuevo, pesoArchivoNuevo, tipoArchivo, rutaArchivoExistente);

    res.status(200).json({ message: mensaje });
});


// Ruta para eliminar archivos NTFS
router.delete('/eliminarArchivo', (req, res) => {
    const { nombreEliminar, tipoEliminar, rutaEliminar } = req.body;

    const mensaje = eliminarArchivoNtfs(nombreEliminar, tipoEliminar, rutaEliminar);

    res.status(200).json({ message: mensaje });
});

// Ruta para mover archivos NTFS
router.post('/moverArchivo', (req, res) => {
    console.log(req.body)
    const { nombreArchivo, tipoArchivo, rutaArchivo, nuevaRutaArchivo } = req.body;

    const mensaje = moverArchivoNtfs(nombreArchivo, tipoArchivo, rutaArchivo, nuevaRutaArchivo);

    res.status(200).json({ message: mensaje });
});

/**
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 *              Configuración del FileSystem EXT4
 * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
 */

// Guardar configuracion del OS EXT4
router.post('/guardarDatosExt4', (req, res) => {
    console.log(req.body);
    const { bloque, nInodos, extents } = req.body;

    guardarConfigExt4(Number(bloque), Number(nInodos), Number(extents));

    res.json({ message: 'Configuración guardada exitosamente' });
});

// Ruta para crear archivos EXT4
router.post('/crearArchivo', (req, res) => {
    console.log(req.body);
    const { nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo } = req.body;

    const mensaje = crearArchivoExt4(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo);

    res.status(200).send(mensaje);
});

// Ruta para guardar archivos EXT4
router.post('/guardarArchivo', (req, res) => {
    console.log(req.body);
    const { nombreArchivoExistente, nombreArchivoNuevo, pesoArchivoNuevo, tipoArchivo, rutaArchivoExistente } = req.body;

    const mensaje = guardarArchivoExt4(nombreArchivoExistente, nombreArchivoNuevo, pesoArchivoNuevo, tipoArchivo, rutaArchivoExistente);

    res.status(200).json({ message: mensaje });
});


// Ruta para eliminar archivos EXT4
router.delete('/eliminarArchivo', (req, res) => {
    const { nombreEliminar, tipoEliminar, rutaEliminar } = req.body;

    const mensaje = eliminarArchivoExt4(nombreEliminar, tipoEliminar, rutaEliminar);

    res.status(200).json({ message: mensaje });
});

// Ruta para mover archivos EXT4
router.post('/moverArchivo', (req, res) => {
    console.log(req.body)
    const { nombreArchivo, tipoArchivo, rutaArchivo, nuevaRutaArchivo } = req.body;

    const mensaje = moverArchivoExt4(nombreArchivo, tipoArchivo, rutaArchivo, nuevaRutaArchivo);

    res.status(200).json({ message: mensaje });
});

export default router;