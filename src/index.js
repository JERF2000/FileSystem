import express from 'express';
import {dirname, join} from 'path';
// Importa 'fileURLToPath' del módulo 'url', que se utiliza para convertir la URL del archivo en una ruta de archivo
import { fileURLToPath } from 'url';
//Se importa la carpeta routes
import indexRoutes from './routes/routes.js';
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(join(__dirname, 'views'));

app.set('views', join(__dirname));
app.set('view engine', 'ejs');

//La Aplicación usa las rutas (Carpeta routes)
app.use(indexRoutes);

app.use(express.static(join(__dirname, 'css')));
app.use(express.static(join(__dirname, 'public')));



app.listen(3000);

console.log("Server is listening in port: ", 3000);