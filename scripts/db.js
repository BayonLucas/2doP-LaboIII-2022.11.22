const URL = "http://localhost:3000/mascotas";

//GET
export const getAjaxDBMascotas = () =>{
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    const data = JSON.parse(xhr.responseText);
                    res(data);
                }
                else{
                    rej(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
        xhr.open("GET", URL);
        xhr.send();
    });
}
export const getFetchAsyncDBMascotas = async () => {
    try{
        const res = await fetch(URL);
        if(!res.ok){
            throw new Error(`${res.status} - ${res.statusText}`) ;
        }
        const data = await res.json();
        return data;
    }
    catch(err) {
        console.error(err);
    }
};
export const getAxiosAsyncDBMascotas = async () => {
    try{
        const {data} = await axios(URL);
        console.log(data);
    }
    catch(err){
        console.error(err.message);
    }
};

//POST
export const crearDBAnuncio = (lista, anuncio) => {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
        } else {
          console.log(Error (`${xhr.status} - ${xhr.statusText}`));
        }
      }
    });
    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(anuncio));
  };





