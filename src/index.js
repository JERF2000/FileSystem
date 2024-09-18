import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/routes.js';

const app = express();
import session from 'express-session';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(session({
    secret: 'admin123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('views', join(__dirname));
app.set('view engine', 'ejs');

app.use(express.static(join(__dirname, 'css')));
app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// La Aplicación usa las rutas (Carpeta routes)
app.use(indexRoutes);

app.listen(3000);

console.log("Server is listening in port: ", 3000);
