//Resultados del buscador:
let resultadosBuscador = document.getElementById("searchResults");
let cajaTextoBuscar = document.getElementById("searchBuscar");
let canciones = ["Canción 1", "Canción 2", "Canción 3", "Canción 4"];

let inputBuscar = document.getElementById("searchI");
inputBuscar.addEventListener(
    "click",
    function () {
        // Limpiar contenido anterior
        resultadosBuscador.innerHTML = "";
        // Búsqueda
        let valorBusqueda = document.getElementById("searchBuscar").value;
        let expresion = new RegExp(valorBusqueda, "i");

        let cancionesFiltradas = canciones.filter(
            song => expresion.test(song)
        );
        resultadosBuscador.innerHTML = `
            <div class="title">
                <p class="titlesBox">Resultados del buscador: <span style="color: black;">${valorBusqueda}</span></p>
            </div>
        `;
        cancionesFiltradas.forEach(
            song => {
                resultadosBuscador.innerHTML += `
                <div class="column">
                    <p>${song}</p>
                    <span class="material-symbols-outlined">play_arrow</span>
                    <span class="material-symbols-outlined">favorite</span>
                    <span class="material-symbols-outlined">add</span>
                </div>`;
            }
        );
        //Limpiar caja de búsqueda
        cajaTextoBuscar.value = "";

    }
);



//Mi playlist:
let miplaylist = document.getElementById("myPlaylist");
let canciones1 = ["Canción 1", "Canción 2", "Canción 3", "Canción 4"];
canciones1.forEach(
    song => {
        miplaylist.innerHTML += `<div class="column">
                                <p>${song}</p>
                                <span class="material-symbols-outlined">play_arrow</span>
                                <span class="material-symbols-outlined">favorite</span>
                                <span class="material-symbols-outlined">add</span>
                                </div>`;
    }
)

//Favoritos
let misFavoritos = document.getElementById("myFavorites");
let canciones2 = ["Canción 1", "Canción 2", "Canción 3", "Canción 4"];
canciones2.forEach(
    song => {
        misFavoritos.innerHTML += `<div class="column">
                                <p>${song}</p>
                                <span class="material-symbols-outlined">play_arrow</span>
                                <span class="material-symbols-outlined">favorite</span>
                                <span class="material-symbols-outlined">add</span>
                                </div>`;
    }
)