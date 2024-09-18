export class Archivo {
    constructor(nombre, extension, peso, ruta) {
        this.nombre = nombre;
        this.extension = extension;
        this.peso = peso;
        this.ruta = ruta;
    }

    mostrarInfo() {
        return `Archivo: ${this.nombre}, Extension: ${this.extension}, Peso: ${this.peso}, Ruta: ${this.ruta}`;
    }
}




/*
// Ejemplo de uso:
const archivo = new Archivo('ejemplo', 0, 'txt', __dirname);
archivo.crearArchivo();
archivo.eliminarArchivo();
*/