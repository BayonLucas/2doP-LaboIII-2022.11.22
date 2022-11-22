import { Animal } from "./Animal.js";

class Anuncio_Animal extends Animal
{
    raza;
    fechaNacimiento;
    vacunas;
    
    constructor(id, titulo, descripcion, especie, precio, raza, fechaNacimiento, vacunas){
        super(id, titulo, descripcion, especie, precio);
        this.Raza = raza;
        this.FechaNacimiento = fechaNacimiento;
        this.Vacunas = vacunas;

    }

    set Raza(value){
        if(value != null && isNaN(value)){
            this.raza = value.trim();
        }else{
            this.raza = -1;
        }
    } 
    set FechaNacimiento(value){
        if(value != null){
            this.fechaNacimiento = value;
        }else{
            this.fechaNacimiento = Date.now("dd/mm/aaaa");
        }
    }    
    set Vacunas(value){
        if(value != null){
            switch(value)
            {
                case "-1":
                    this.vacunas = "error";
                    break;
                case "0":
                    this.vacunas = "No";
                    break;
                case "1":
                    this.vacunas = "Si";
                    break;                            
            }
        }
    }

    getId() {
        return this.id;    
    }
    

}
export default Anuncio_Animal;