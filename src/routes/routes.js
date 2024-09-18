import { Router } from "express";

import { 
    crearArchivo,
    guardarArchivo, 
    eliminarArchivo,
    moverArchivo,
    actualizarConfiguracionOS, 
    guardarConfigExt4 
} from '../public/javascript/gestorExt4.js';


const router = Router();

router.get('/', (req, res) => res.render('views/home', { title: 'File System' }));
router.get('/configOS', (req, res) => res.render('views/configOS'));
router.get('/configExt4', (req, res) => res.render('views/configExt4'));
router.get('/configFat32', (req, res) => res.render('views/configFat32'));
router.get('/configNtfs', (req, res) => res.render('views/configNtfs'));
router.get('/opArchivos', (req, res) => res.render('views/opArchivos'));

// Ruta para crear archivos
router.post('/opArchivos', (req, res) => {
    console.log(req.body);
    const { nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo } = req.body;

    const mensaje = crearArchivo(nombreArchivo, tipoArchivo, pesoArchivo, rutaArchivo);
    res.status(200).send(mensaje);
});

// Ruta para guardar archivos
router.post('/guardarArchivo', (req, res) => {
    console.log(req.body);
    const { nombreArchivoExistente, nombreArchivoNuevo, pesoArchivoNuevo, tipoArchivo, rutaArchivoExistente } = req.body;

    // Llamar a la función para renombrar el archivo
    const mensaje = guardarArchivo(nombreArchivoExistente, nombreArchivoNuevo, pesoArchivoNuevo, tipoArchivo, rutaArchivoExistente);

    res.status(200).json({ message: mensaje });
});


// Ruta para eliminar archivos
router.delete('/eliminarArchivo', (req, res) => {
    const { nombreEliminar, tipoEliminar, rutaEliminar } = req.body;

    const mensaje = eliminarArchivo(nombreEliminar, tipoEliminar, rutaEliminar);
    res.status(200).json({ message: mensaje });
});

// Ruta para mover archivos
router.post('/moverArchivo', (req, res) => {
    console.log(req.body)
    const { nombreArchivo, tipoArchivo, rutaArchivo, nuevaRutaArchivo } = req.body;

    // Llamar a la función que moverá el archivo
    const mensaje = moverArchivo(nombreArchivo, tipoArchivo, rutaArchivo, nuevaRutaArchivo);

    res.status(200).json({ message: mensaje });
});

// Ruta para guardar la configuración de Almacenamiento (OS)
router.post('/guardarConfiguracion', (req, res) => {
    console.log(req.body);
    const { almacenamientoTotal, almacenamientoDisponible } = req.body;

    // Llamar a la función para actualizar la configuración
    actualizarConfiguracionOS(Number(almacenamientoTotal), Number(almacenamientoDisponible));

    res.json({ message: 'Configuración guardada exitosamente' });
});

// Ruta para guardar la configuración
router.post('/guardarDatosExt4', (req, res) => {
    console.log(req.body);
    const { bloque, nInodos, extents } = req.body;

    // Llamar a la función para actualizar la configuración
    guardarConfigExt4(Number(bloque), Number(nInodos), Number(extents));

    res.json({ message: 'Configuración guardada exitosamente' });
});

export default router;