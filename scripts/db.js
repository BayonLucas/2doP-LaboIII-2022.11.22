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

//POST
export const crearDBAnuncio = (anuncio) => {
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

//PUT
export const updateFetchAnuncio = (Anuncio) => {
    fetch(URL + "/" + Anuncio.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(Anuncio)
    })
    .then((res) => {
        return res.ok? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
      })
    .catch((err) => {
        console.error(err);
    });
};
//DELETE
export const deleteFechtPersona = (Anuncio) => {
    fetch(URL + "/" + Anuncio.id, {
        method: "DELETE",
    })
    .then((res)=> {
        if(!res.ok)
            return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
        
        return res.json();
    })
    .then((data) =>{
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    });
};


