export class Animal
{
    id;
    titulo;
    descripcion;
    especie;
    precio;
    
    constructor(id, titulo, descripcion, especie, precio)
    {
            this.Id = id;
            this.Titulo = titulo; 
            this.Especie = especie;
            this.Descripcion = descripcion;
            this.Precio = precio;
    }
    
    set Id(value){
        if(value != null && !isNaN(value)){
            this.id = parseInt(value);
        }else{
            this.id = -1;
        }
    }
    set Titulo(value){
        if(value != null && isNaN(value)){
            this.titulo = value.trim();
        }else{
            this.titulo = "error";
        }
    }
    set Especie(value){
        if(value != null && isNaN(value)){
            this.especie = value.trim();
        }else{
            this.especie = "error";
        }
    }
    set Descripcion(value){
        if(value != null && isNaN(value)){
            this.descripcion = value.trim();
        }else{
            this.descripcion = "error";
        }
    }
    set Precio(value){
        if(value != null && !isNaN(value) && value >=0 && value <=50000){
            this.precio = parseFloat(value);
        }else{
            this.precio = -1;
        }
    }

}