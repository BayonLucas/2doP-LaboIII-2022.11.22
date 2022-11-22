const setError = (input, mensaje) =>{
    const $small = input.nextElementSibling;
    input.classList.add("inputError");
    if($small){
        $small.textContent = mensaje || `${input.name} requerido`;
    }
}    
const clearError = (input) =>{
    const $small = input.nextElementSibling;
    if($small && $small.textContent !== ""){
        input.classList.remove("inputError")
        $small.textContent = "";
    }
}    
const validarLogitudMinima = (input, minimo) =>{
    return input.value.trim().length >= minimo;
}
const validarLogitud = (input, min, max) =>{
    const text = input.value.trim();
    return text.length >= min && text.length <= max;
}
    

        


// regexr.com //Pagina de reguladores de expresiones




export const validarImportes = (e) =>{
    const input = e.target;
    
    const value = input.value;
    ((isNaN(value)) || value>50000 || value<1)? setError(input, "Solo se admiten caracteres numericos entre 0 y 50000 inclusive") : clearError(input);
}
export const validarTexto = (e) => {
    const input = e.target;
    const pattern = /^([a-zA-Z0-9])\w+/g;
    const text = input.value.trim();

    let message = "";

    if(text.length !== 0){
        if(!validarLogitud(input, 5,25)){
            message = message + "El campo debe contener entre 4 y 25 caracteres. ";
            console.log(input + " - Mensaje: " + message);
        }
        
        if(!pattern.test(text)){
            message = message + "Solo se admiten caracteres alfabeticos.";
            console.log(input, " - Mensaje: ", message);
        }
        if(message !== ""){
            setError(input, message);
        }
        else{
            clearError(input);
        }
    }
}

export const validarCampoVacio = (e) => {
    const input = e.target;
    const value = input.value.trim();
    if(input.nextElementSibling.textContent === ""){
        if(!value){
            setError(input);
        }else{
            clearError(input);
        }    
    }
};
export const validarSelectVacio = (e) => {
    const input = e.target;
    if(input.value === "-1"){
        setError(input);
    }else{
        clearError(input);
    }  
};


/* Validaciones sin usar
export const validarExtencion = (e) =>{
    const extenciones = ["gif", "jpg", "png", "jpeg"];
    const input = e.target;
    const nombre = input.files[0].name;
    const ext = nombre.split(".").pop();

    extenciones.includes(ext)? clearError(input) : setError(input, "Archivo invalido");
}
export const validarEmail = (e) =>{
    const input = e.target;
    const pattern = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/igm;
    const email = input.value.trim();
    
    if(email.length >6){
        !pattern.test(email) ? setError(input, "Campo Requerido") : clearError(input);
    }
}
export const validarPassword = (e) =>{
    const input = e.target;
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const password = input.value.trim();
    
    if(!validarLogitudMinima(input, 8)){
        setError(input, "Debe contener minimo 8 caracteres");
    }
    else{
        !pattern.test(password) ? setError(input, "Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial") : clearError(input);

    }
}
export const validarLogitudTexto = (e) =>{
    const input = e.target;
    if(!validarLogitud(input, 4, 25)){
        setError(input, "El campo debe contener entre 4 y 25 caracteres.");
    }
    else{
        clearError(input);
    }
}
*/