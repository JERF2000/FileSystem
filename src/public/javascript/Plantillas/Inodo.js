//Clase Inodo
export class Inodo{
    constructor(peso, ext) {
        this.refName;
        this.refEspace;
        this.peso = peso;
        this.ext = ext;
    }

    crearRefName() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let resultado = '#';
        
        for (let i = 0; i < 10; i++) {
            resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        
        this.refName = resultado;
    }

    crearRefEspace(eTotal, eLibre){
        this.refEspace = eTotal - eLibre;
    }
}