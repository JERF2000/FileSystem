import { Archivo } from './Archivo.js'
import { Inodo } from './Inodo.js'

//Clase EXT4
export class fsExt4{
    constructor() {
        this.almTotal;
        this.almDisp;
        
        this.tamBloq;
        this.nInodos;
        //Crear atributo extents
        this.inodos = [];
        this.archivos = [];
    }

    crearArchivo(nombre, extension, peso, ruta) {
        const archivo = new Archivo(nombre, extension, peso, ruta);
            this.agregarArchivo(archivo);
            this.almDisp = this.almDisp - peso;
    }

    configurarFileSystemExt4(bloqueSize, numInodos, cantBloques){
        this.tamBloq = bloqueSize;
        this.nInodos = numInodos;
        console.log("El extent contiene " + cantBloques + " bloques para encapsular...");
    }

    definirEspacio(sizeT, sizeD){
        this.almTotal = sizeT;
        this.almDisp = sizeD;
    }

    // Agregar un archivo al arreglo
    agregarArchivo(archivo) {
        this.archivos.push(archivo);
    }

    // Crear un Inodo
    crearInodo(size, ext) {
        const i = new Inodo(size, ext);
            i.crearRefName();
            i.crearRefEspace(this.almTotal, this.almDisp);
            this.agregarInodo(i);
            console.log("El inodo:              " + i.refName);
            console.log("Apunta a la dirección: " + i.refEspace);
    }

    // Agregar un inodo al arreglo
    agregarInodo(inodo) {
        this.inodos.push(inodo);
    }

    

    // Método para mostrar todos los archivos y sus datos
    mostrarArchivos() {
        this.archivos.forEach(archivo => {
            console.log(archivo.mostrarInfo());
        });
    }
}