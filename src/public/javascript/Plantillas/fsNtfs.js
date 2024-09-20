import { Archivo } from './Archivo.js'

//Clase EXT4
export class fsNtfs{
    constructor() {
        this.almTotal;
        this.almDisp;

        this.cluster;
        this.nRegistrosMFT;
        this.cifrado;
        this.compresion;

        this.archivos = [];
    }

    crearArchivo(nombre, extension, peso, ruta) {
        const archivo = new Archivo(nombre, extension, peso, ruta);
            this.agregarArchivo(archivo);
            this.almDisp = this.almDisp - peso;
    }

    configurarFileSystemNTFS(){
        
    }

    definirEspacio(sizeT, sizeD){
        this.almTotal = sizeT;
        this.almDisp = sizeD;
    }

    // Agregar un archivo al arreglo
    agregarArchivo(archivo) {
        this.archivos.push(archivo);
    }

    // Método para mostrar todos los archivos y sus datos
    mostrarArchivos() {
        this.archivos.forEach(archivo => {
            console.log(archivo.mostrarInfo());
        });
    }
}