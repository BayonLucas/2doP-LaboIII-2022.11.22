import Anuncio_Animal from "./Anuncio_Animal.js";
import {crearTabla} from "./tablaDinamica.js";
import {validarCampoVacio, validarTexto, validarImportes, validarSelectVacio} from "./validaciones.js";
 
const listaAnuncios = localStorage.getItem("anuncios")? JSON.parse(localStorage.getItem("anuncios")) : []; 

const controles = document.forms[0].elements;

const btnGuardar = document.getElementById("btnGuardar");
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");

const tabla = document.getElementById("tabla-container");
const $smallBtn = btnGuardar.nextSibling;

const spinner = document.getElementById("spinner");

let idSelected = 0;
let estadoBotones = 0;



window.addEventListener("load", () => {
    localStorage.getItem("anuncios")? JSON.parse(localStorage.getItem("anuncios")) : localStorage.setItem("anuncios", JSON.stringify([]));
    actualizarTabla(listaAnuncios);
});

//Aplico validaciones
for(let i = 0; i < controles.length; i++){
    const control = controles.item(i);
    if((control.matches("input"))){
        control.addEventListener("blur", validarCampoVacio);
        if(control.matches("[type=text]") && !control.matches("[id=txtPrecio]")){
            control.addEventListener("blur", validarTexto);
        }
        else if(control.matches("[id=txtPrecio]")){
            control.addEventListener("input", validarImportes);
        }
    }
    else{
        control.addEventListener("blur", validarSelectVacio);
    }
}

//seleccionarItemTabla 
tabla.addEventListener("click", (e) => {
    const emisor = e.target;

    if (emisor.matches("tbody tr td")) {
        let id = emisor.parentElement.dataset.id;
        const anuncio = listaAnuncios.find((element) => element.id == id);
        if(idSelected != id){
            completarForm(anuncio);
            idSelected = anuncio.id;
            modificarBotones();
        }
    }
});

//Guardar
btnGuardar.addEventListener("click", () => {
    let anuncio = crearAnuncio(getNuevoID(listaAnuncios));
    if(!anuncio){   
        $smallBtn.textContent = "Error en la carga del anuncio";
        return;
    }
    playSpinner(listaAnuncios, anuncio);
    $smallBtn.textContent = "";
    $smallBtn.classList.remove("inputError");

});

//ModificarAnuncio
btnModificar.addEventListener("click", () => {  
    ModificarAnuncio(idSelected);
    btnCancelar.click();
});

//Cancelar
btnCancelar.addEventListener("click", () =>{
    limpiarInputs();
    idSelected = 0;
    estadoBotones = 1;
    modificarBotones()
});

//Eliminar
btnEliminar.addEventListener("click", () =>{
    eliminarAnuncio(listaAnuncios, idSelected);
    actualizarTabla(listaAnuncios);
    limpiarInputs();
    modificarBotones();
});



//#region funciones
function getEspecie(){
    return document.querySelector('input[name="Animal"]:checked').value;
}
function getNuevoID(arr){
    let id = 1;
    if(arr.length != 0){
        id = arr[arr.length-1].id + 1;
    }
    return id;
}
function estaCompleto(txtTitulo, txtDescripcion, txtPrecio, txtRaza, dateFecha, sltVacunas){
    let ret = true;
    if(txtTitulo.value == "" || txtDescripcion.value == "" || txtPrecio.value == "" || txtRaza.value == "" || dateFecha.value == "" || sltVacunas.value == "-1"){
        ret = false;
    }
    return ret;
}
function limpiarInputs(){
    const {txtTitulo, txtDescripcion, txtPrecio, txtRaza, dateFecha, sltVacunas} = controles;
    txtTitulo.value = "";
    txtDescripcion.value = "";
    txtPrecio.value = "";
    txtRaza.value = "";
    dateFecha.value = "";
    sltVacunas.value = "-1";
}
function crearAnuncio(id){
    const { txtTitulo, txtDescripcion, txtPrecio, txtRaza, dateFecha, sltVacunas} = controles;  
    if(!estaCompleto(txtTitulo, txtDescripcion, txtPrecio, txtRaza, dateFecha, sltVacunas)){
        return null;
    }
    return new Anuncio_Animal(id, txtTitulo.value, txtDescripcion.value, getEspecie(), txtPrecio.value, txtRaza.value, dateFecha.value, sltVacunas.value);
}
function agregarAnuncio(lista, anuncio){
    if(!validarAnuncio(anuncio)){
        $smallBtn.textContent = "Error en la carga del anuncio";
        $smallBtn.classList.add("inputError");
        return;
    }
    for (const control of controles) {
        if(control.classList.contains("inputError")){
            $smallBtn.textContent = "Error en alguno de los datos del anuncio";
            $smallBtn.classList.add("inputError");
            return;
        }
    }
    lista.push(anuncio);
    localStorage.setItem("anuncios", JSON.stringify(lista));
    limpiarInputs();
    actualizarTabla(lista);
    //playSpinner(listaAnuncios);
}
function completarForm(anuncio){
    const {txtTitulo, chPerro, chGato, txtDescripcion, txtPrecio, txtRaza, dateFecha, sltVacunas} = controles;
    if(anuncio.especie === "Perro"){
        chPerro.checked = true;
    } else {
        chGato.checked = true;
    }
    txtTitulo.value = anuncio.titulo;
    txtDescripcion.value = anuncio.descripcion;
    txtPrecio.value = anuncio.precio;
    txtRaza.value = anuncio.raza;
    dateFecha.value = anuncio.fechaNacimiento;
    switch(anuncio.vacunas){
        case "Si":
            sltVacunas.value = 1;
            break;
        case "No":
            sltVacunas.value = 0 ;
            break;
    }
}
function actualizarTabla(lista) {
    lista.sort(function(a, b){
        if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
    });    
    const container = document.getElementById("tabla-container");
    if(container.children.length > 0 && lista.length > 0){
        const table = crearTabla(lista);
        container.removeChild(container.children[0]);
        container.appendChild(table);
    } else if (lista.length > 0){
        const table = crearTabla(lista);
        container.appendChild(table);
    }   
}
function ModificarAnuncio(id){
    let anuncio = crearAnuncio(id);
    if(validarAnuncio(anuncio)){
        eliminarAnuncio(listaAnuncios, id);
        agregarAnuncio(listaAnuncios, anuncio);
        actualizarTabla(listaAnuncios);
    }
}
function modificarBotones(){
    if(estadoBotones === 0){
        btnGuardar.classList.add("invisible");
        btnModificar.classList.remove("invisible");
        btnEliminar.classList.remove("invisible");
        btnCancelar.classList.remove("invisible");
        if(idSelected ===0)
            estadoBotones = 1;
    }
    else{
        btnGuardar.classList.remove("invisible");
        btnModificar.classList.add("invisible");
        btnEliminar.classList.add("invisible");
        btnCancelar.classList.add("invisible");
        estadoBotones = 0;
    }
}
function eliminarAnuncio(lista, id){
    let index = lista.findIndex((element) => element.id === id)
    lista.splice(index, 1);
    localStorage.setItem("anuncios", JSON.stringify(lista));
}
function playSpinner(lista, anuncio){
    
    const aux = tabla.firstElementChild;
    
    spinner.classList.add("visible");
    spinner.classList.remove("notVisible");

    aux.classList.add("invisible");
    
    setTimeout(() => {
        spinner.classList.remove("visible");
        spinner.classList.add("notVisible");       
        
        aux.classList.remove("invisible");
        
        agregarAnuncio(lista, anuncio)
    }, 2000);
}
function validarAnuncio(a){
    ret = false;
    if(a.titulo !== "Error" && a.descripcion !== "error", a.especie!== "error" && a.precio!== -1 && a.raza !==-1 && a.vacunas!== "error"){
        ret = true;
    }
    return ret;
}
//#endregion
