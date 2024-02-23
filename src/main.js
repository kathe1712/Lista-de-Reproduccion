class Song {
    constructor(id, nombre, autor, duracion, album, anio, genero, cover, urlSong) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.duracion = duracion;
        this.album = album;
        this.anio = anio;
        this.genero = genero;
        this.cover = cover;
        this.urlSong = urlSong;
    }
    getId() {
        return this.id
    }
    getSongName() {
        return this.nombre;
    }
    getSongAlbum() {
        return this.album;
    }
    getSongAutor() {
        return this.autor;
    }
    getSongYear() {
        return this.anio;
    }
    getSongGenre() {
        return this.genero;
    }
    getSongCover() {
        return this.cover;
    }
    getSongUrl() {
        return this.urlSong;
    }
}

class Playlist {
    listaCanciones;
    constructor(nombre) {
        this.nombre = nombre;
        this.listaCanciones = [];
        this.onPlay();
        this.onLike();
        this.onRemoveFromPlaylist();
    }
    getPlaylistName() {
        return this.nombre;
    }

    addSongToPlaylist(song) {


        // Verificar si la canción ya está en la lista
        if (!this.listaCanciones.some(existingSong => existingSong.id === song.id)) {
            this.listaCanciones.push(song);
            this.dibujarCanciones();
        } else {
            console.log("La canción ya está en la lista.");
        }

    }
    dibujarCanciones() {

        let canciones = document.getElementById(this.nombre);
        let alterna = "";
        let alterna2 = "";
        let color_heart = "";
        let fill = 0;
        switch (this.nombre) {
            case 'resFavoritos':
                alterna = "favorite";
                alterna2 = "add";
                color_heart = "#36367a"
                fill = 1;
                break;
            case 'resPlaylist':
                alterna = "favorite";
                alterna2 = "remove";
                color_heart = "";
                fill = 0;
                break;
        }
        canciones.innerHTML = '';
        this.listaCanciones.forEach(song => {
            canciones.innerHTML += `
            <div class="column" id="res_${song.id}">
                <img class="img_list" src="../assets/portadas/${song.cover}" width="40vh" height="40vh">
                <p data-idCancion="${song.id}">${song.nombre}</p>
                <span data-idCancion="${song.id}" class="playsong material-symbols-outlined"  style="font-variation-settings:'FILL' 1,'wght' 400;">play_circle</span>
                <span data-idCancion="${song.id}" class="favorites material-symbols-outlined" style="font-variation-settings: 'FILL' ${fill}; color:${color_heart}" >${alterna}</span>
                <span data-idCancion="${song.id}" class="removeplaylist material-symbols-outlined">${alterna2}</span>
                
            </div>
            <div class="division-line"></div>
        `;
        })
        this.onPlay();
        this.onLike();
        this.onRemoveFromPlaylist();

    }
    //LISTENER PARA PLAYSONG

    onPlay() {
        console.log("entra a onplay");
        let playSongs = document.getElementsByClassName("playsong");
        for (let i = 0; i < playSongs.length; i++) {
            playSongs[i].addEventListener("click", () => {
                let id = playSongs[i].getAttribute('data-idCancion');
                let cancion = this.listaCanciones.find(song => song.id == id)
                let event = new CustomEvent('playsong', {
                    detail: {
                        song: cancion,
                        actual: this.nombre
                    },
                });
                document.dispatchEvent(event);
            });
        }
    }

    onLike() {
        console.log("entra a onlike");
        let likes = document.getElementsByClassName("favorites");

        for (let i = 0; i < likes.length; i++) {
            likes[i].addEventListener("click", () => {
                let id = likes[i].getAttribute('data-idCancion');
                let index = this.listaCanciones.findIndex(song => song.id == id); // Usar findIndex() en lugar de find()
                let cancion = this.listaCanciones.find(song => song.id == id)

                // Obtener el valor de fill del span y convertirlo a un número
                let fill = parseInt(likes[i].style.fontVariationSettings.split(',')[0].trim().split(' ')[1]);
                console.log("fill:", fill)

                // Verificar si fill no es NaN antes de realizar comparaciones
                if (!isNaN(fill)) {
                    if (fill === 1) { // Comparar con un número en lugar de una cadena
                        console.log("fill:", fill);
                        if (index !== -1) { // Verificar que se encontró el índice
                            this.listaCanciones.splice(index, 1);
                            // Volver a dibujar las canciones después de eliminar
                            this.dibujarCanciones();
                        }
                    } 
                    if (fill === 0) {
                        let event = new CustomEvent('favorites', {
                            detail: {
                                song: this.listaCanciones[index], // Pasar el objeto de la canción
                                actual: this.nombre
                            },
                        });
                        document.dispatchEvent(event);
                    }
                }
            });
        }
    }



    onRemoveFromPlaylist() {
        let removeButtons = document.getElementsByClassName("removeplaylist");

        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener("click", () => {
                let id = removeButtons[i].getAttribute('data-idCancion');
                let index = this.listaCanciones.findIndex(song => song.id == id); // Usar findIndex() en lugar de find()
                let cancion = this.listaCanciones.find(song => song.id == id)

                // Obtener el texto del span (remove o add)
                let spanText = removeButtons[i].innerText.trim().toLowerCase();
                console.log("span:", spanText)

                // Basado en el texto del span, determinar la acción
                if (spanText === "remove") {
                    if (index !== -1) {
                        this.listaCanciones.splice(index, 1);
                        // Volver a dibujar las canciones después de eliminar
                        this.dibujarCanciones();
                    }
                }
                if (spanText === "add"){
                    let event = new CustomEvent('addPlaylist', {
                        detail: {
                            song: this.listaCanciones[index],
                            actual: this.nombre
                        },
                    });
                    document.dispatchEvent(event);
                }
            });
        }
    }

    removeSongFromPlaylist(song) {
        this.listaCanciones = this.listaCanciones.filter(s => s !== song);
    }
    shufflePlaylist() {
        this.listaCanciones = this.listaCanciones.sort(() => Math.random() - 0.5);
    }
    playPlaylist() {
        this.listaCanciones.forEach(song => {
            console.log(`Playing: ${song.nombre}`);
        })
    }
    getCurrentSong(i) {
        console.log("tomar lista de canciones: ", this.listaCanciones[i]);
        return this.listaCanciones[i];
    }
    nextSong() {
        this.listaCanciones.shift();
    }

}

class Reproductor {
    catalogoCanciones;
    currentSong;
    currentPlaylist = 'busqueda';
    audio;
    filtroCanciones;
    favoritos;
    myPlaylist;
    isPaused;
    isStopped;
    isMuted;
    savedVolume;

    constructor() {
        this.catalogoCanciones = [
            new Song(1, "It's My Life", "Bon Jovi", "03:45", "Crush", "1998", "Pop Rock", "Its my life.jpg", "Its my life.mp3"),
            new Song(2, "Up", "Inna", "02:28", "UP", "2021", "Pop", "up.jpg", "Up.mp3"),
            new Song(3, "Cheeky", "Inna", "02:22", "Cheeky", "2024", "Dance pop", "cheeky.jpg", "Cheeky.mp3"),
            new Song(4, "Payphone", "Maroon 5", "03:42", "Overexposed", "2012", "Pop", "payphone.jpg", "Payphone.mp3"),
            new Song(5, "In the Shadows", "The Rasmus", "04:19", "Dead Letters", "2003", "Rock Alternativo", "in the shadows.jpeg", "In the Shadows.mp3"),
            new Song(6, "Blinding Lights", "The Weeknd", "03:23", "album", "2020", "Electro Pop", "blinding lights.jpg", "Blinding Lights.mp3"),
            new Song(7, "Girl You Know It's True", "Milli Vanilli", "03:58", "All or Nothing", "1988", "Dance pop, New jack swing", "girl you know its true.jpeg", "Girl You Know Its True.mp3"),
            new Song(8, "Oops!... I Did It Again", "Britney Spears", "03:30", "Oops!... I Did It Again", "2000", "Dance pop", "oops i did it again.jpg", "Oops I Did It Again.mp3"),
            new Song(9, "Play Hard", "David Guerra ft. Ne-Yo & Akon", "03:28", "album3", "2013", "Electro Pop", "play hard.jpeg", "Play Hard.mp3"),
            new Song(10, "Beautiful Monster", "Ne-Yo", "04:42", "Libra Scale", "2010", "R&B/Soul", "beautiful monster.jpeg", "Beautiful Monster.mp3"),
            new Song(11, "In The End", "Linkin Park", "03:38", "Hybrid Theory", "2000", "Rap rock, Rock", "in the end.jpeg", "In The End.mp3"),
            new Song(12, "Livin' on a Prayer", "Bon Jovi", "04:09", "Slippery When Wet", "1986", "Glam metal, Arena rock, Rock", "living on a prayer.jpg", "Livin on a prayer.mp3"),
            new Song(13, "Take you dancing", "Jason Derulo", "03:11", "Nu King", "2024", "Electrónica, Pop rock, Urban pop", "take you dancing.png", "Take you dancing.mp3"),
            new Song(14, "Ban Habits", "Ed Sheran", "04:01", "=", "2021", "Pop", "bad habits.jpg", "Bad habits.mp3"),
            new Song(15, "Señorita", "Camila Cabello, Shawn Mendes", "03:26", "Shawn Mendes", "2019", "Pop latino, Pop", "senorita.png", "Senorita.mp3"),
            new Song(16, "She's gone", "Steelheart", "04:52", "Steelheart", "1990", "Hard rock, Glam metal", "shes gone.jpg", "Shes gone.mp3"),
            new Song(17, "I was made for lovin' you", "Kiss", "03:59", "Stars 80", "1979", "Disco, Hard Rock, Rock", "i was made.jpg", "I was made for loving you.mp3"),
            new Song(18, "Beat It", "Michael Jackson", "04:59", "Thriller", "1982", "Dard rock, Dance-rock, Dance pop", "beat it.jpg", "Beat it.mp3"),
            new Song(19, "Y soy yo", "Akash", "05:54", "Alma Inmortal", "2021", "Hard rock, Heavy metal", "y soy yo.jpg", "Y Soy Yo.mp3"),
            new Song(20, "Runaway", "Bon Jovi", "04:20", "Bon Jovi", "1984", "Hard rock, Dance metal, Rock", "runaway.JPG", "Runaway.mp3"),
            new Song(21, "Lost on you", "LP", "05:09", "Lost on you", "2016", "Indie rock, Alternativa, Folk rock", "lost on you.jpg", "Lost on you.mp3"),
            new Song(22, "Burnin' Up", "Jonas Brothers", "03:20", "A little bit longer", "2008", "Pop", "burnin up.jpg", "Burning up.mp3"),
            new Song(23, "All Star", "Smash Mouth", "03:07", "Astro Lounge", "1999", "Rock alternativo, Power pop, Pop", "all star.jpg", "All star.mp3"),
            new Song(24, "In my head", "CNBLUE", "04:26", "Code Name Blue", "2012", "Korean Dance, Japanese Rock, K-pop", "in my head.jpg", "In my head.mp3"),
            new Song(25, "Hey you", "CNBLUE", "04:10", "Arena Tour 2012 Come On", "2013", "Korean Dance, Japanese Rock, K-pop", "hey you.jpg", "Hey you.mp3"),
            new Song(26, "Don't speak", "No Doubt", "05:01", "Tragic Kingdom", "1995", "Pop", "dont speak.png", "Dont speak.mp3"),
            new Song(27, "Amor prohibido", "Selena Quintanilla", "02:51", "Amor prohibido", "1994", "Reggae, Cumbia mexicana, Tropical", "amor prohibido.png", "Amor prohibido.mp3"),
            new Song(28, "Livin' la vida loca", "Ricky Martin", "03:43", "Ricky Martin", "1999", "Dance Pop, Pop", "livin la vida loca.jpg", "Livin la vida loca.mp3"),
            new Song(29, "La isla bonita", "Madonna", "04:01", "Madonna On Tour", "1986", "Pop", "isla bonita.jpg", "La isla bonita.mp3"),
            new Song(30, "Brother Louie '98", "Moder Talking", "04:26", "Ready for romance", "1998", "Synthpop, New Wave", "brother louie.jpg", "Brother Loui 98.mp3"),
            new Song(31, "Dance the night", "Dua Lipa", "02:54", "Barbie: The Album", "2023", "Pop", "dance the night.png", "Dance the night.mp3"),
            new Song(32, "Break my heart", "Dua Lipa", "03:50", "Future Nostalgia", "2020", "Dance/Electrónica", "break my heart.jpg", "Break my heart.mp3"),
            new Song(33, "As it was", "Harry Styles", "02:46", "Harry's House", "2022", "Synthpop, New Wave", "as it was.jpg", "As it was.mp3"),
            new Song(34, "I'm Yours", "Jason Mraz", "03:42", "We Sing. We Dance. We Steal Things", "2008", "Reggae, Soul, Pop", "im yours.jpg", "Im yours.mp3"),
        ];
        this.mostrarCanciones("searchResults");

        this.currentSong = this.catalogoCanciones[0];
        this.audio = new Audio();
        this.currentPlaylist = 'busqueda';
        this.favoritos = new Playlist('resFavoritos');
        this.myPlaylist = new Playlist('resPlaylist');

        document.addEventListener('playsong', (e) => {
            this.currentSong = e.detail.song;
            this.currentPlaylist = e.detail.actual;
            console.log("Current song:", this.currentSong);
            this.play();
        });

        document.addEventListener('favorites', (e) => {
            this.currentSong = e.detail.song;
            this.currentPlaylist = e.detail.actual;
            this.addPlaylist(this.currentSong.id, 'favoritos')
        });
        document.addEventListener('addPlaylist', (e) => {
            this.currentSong = e.detail.song;
            this.currentPlaylist = e.detail.actual;
            this.addPlaylist(this.currentSong.id, 'myPlaylist')
        });

        this.isPaused = false;
        this.isStopped = true;
        this.isMuted = false;
        this.inicializarControles();
        this.audio.addEventListener("ended", () => {
            this.skip_next(); // Llama al método para reproducir la siguiente canción
        });
    }
    //Métodos
    inicializarControles() {
        // Listener del buscador:
        let inputBuscar = document.getElementById("searchI");
        inputBuscar.addEventListener(
            "click", () => {
                this.buscarCancion(document.getElementById("searchBuscar").value);
            }
        );
        // Controles del reproductor
        let play = document.getElementById("play");
        play.addEventListener("click", () => {
            this.play();
        });
        let stop = document.getElementById("stop");
        stop.addEventListener("click", () => {
            this.stop();
        });
        let pause = document.getElementById("pause");
        pause.addEventListener("click", () => {
            this.pause();
        });
        let volume_off = document.getElementById("mute");
        volume_off.addEventListener("click", () => {
            this.mute();
        });
        let previous = document.getElementById("skipPrevious");
        previous.addEventListener("click", () => {
            this.skip_previous();
        });
        let next = document.getElementById("skipNext");
        next.addEventListener("click", () => {
            this.skip_next();
        });

        //Para cuando una canción acabó de reproducirse
        this.audio.addEventListener("ended", () => {

        })
    }
    mostrarInformacion = function () {
        let infoCanciones = document.getElementById("detailsSongs");
        infoCanciones.innerHTML = '';
        infoCanciones.innerHTML += `
                <div data-idInfoSong="${this.currentSong.id}" class="information-box">
                    <p class="songTitle"  data-idInfoSong="${this.currentSong.id}">${this.currentSong.nombre}</p>
                    <p class="songTitle"  data-idInfoSong="${this.currentSong.id}">${this.currentSong.autor}</p>
                    <div class="container">
                        <button id="openModalButton">Ver detalles de la canción</button>
                        <div class="modal">
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <p  data-idInfoSong="${this.currentSong.id}">
                                    <span class="detailTit1">Nombre: </span><span class="detailTit">${this.currentSong.nombre}</span>
                                </p>
                                <p  data-idInfoSong="${this.currentSong.id}">
                                    <span class="detailTit1">Artista: </span><span class="detailTit">${this.currentSong.autor}</span>
                                </p>
                                <p  data-idInfoSong="${this.currentSong.id}">
                                    <span class="detailTit1">Duración: </span><span class="detailTit">${this.currentSong.duracion}</span>
                                </p>
                                <p  data-idInfoSong="${this.currentSong.id}">
                                    <span class="detailTit1">Álbum: </span><span class="detailTit">${this.currentSong.album} </span>
                                </p>
                                <p  data-idInfoSong="${this.currentSong.id}">
                                    <span class="detailTit1">Año: </span><span class="detailTit">${this.currentSong.anio}</span>
                                </p>
                                <p  data-idInfoSong="${this.currentSong.id}">
                                    <span class="detailTit1">Género: </span><span class="detailTit">${this.currentSong.genero}</span>
                                </p>  
                            </div>
                        </div>
                    </div>
                    
                </div>
            `;
        // Agregar evento de clic al botón de apertura del modal después de que se haya agregado al DOM
        document.getElementById('openModalButton').addEventListener('click', function () {
            document.querySelector('.modal').style.display = 'block';
        });

        // Añadir evento de clic al botón de cierre del modal
        document.querySelector('.close').addEventListener('click', function () {
            document.querySelector('.modal').style.display = 'none';
        });

    }

    mostrarCanciones = function () {
        let canciones = document.getElementById("searchResults");
        canciones.innerHTML = ''; // Limpiar el contenido existente antes de agregar las nuevas canciones
        this.catalogoCanciones.forEach(song => {
            canciones.innerHTML += `
                <div class="column" data-idCancion="${song.id}">
                    <img class="img_list" src="../assets/portadas/${song.cover}" width="40vh" height="40vh">
                    <p data-idCancion="${song.id}">${song.nombre}</p>
                    <span data-idCancion="${song.id}" class="playsong material-symbols-outlined" style="font-variation-settings:'FILL' 1,'wght' 400;">play_circle</span>
                    <span data-idCancion="${song.id}" class="favorites material-symbols-outlined" >favorite</span>
                    <span data-idCancion="${song.id}" class="addplaylist material-symbols-outlined">add</span>
                    
                </div>
                <div class="division-line"></div>
            `;
        });
        let playSongs = document.getElementsByClassName("playsong");
        for (let i = 0; i < playSongs.length; i++) {
            playSongs[i].addEventListener("click", () => {
                this.currentPlaylist = 'busqueda';
                let id = playSongs[i].parentElement.getAttribute('data-idCancion');
                this.currentSong = this.catalogoCanciones.find(song => song.id == id);
                this.play();
            });
        }

        let favoritos = document.getElementsByClassName("favorites");
        for (let i = 0; i < favoritos.length; i++) {
            favoritos[i].addEventListener("click", () => {
                let id = favoritos[i].parentElement.getAttribute('data-idCancion');
                this.addPlaylist(id, 'favoritos')
            });
        }
        let addPlaylist = document.getElementsByClassName("addplaylist");
        for (let i = 0; i < addPlaylist.length; i++) {
            addPlaylist[i].addEventListener("click", () => {
                let id = addPlaylist[i].parentElement.getAttribute('data-idCancion');
                this.addPlaylist(id, 'myPlaylist')
            });
        }
    }
    addPlaylist = function (id, playlist) {
        console.log("Entra a add playlist")
        let cancion = this.catalogoCanciones.find(song => song.id == id);
        switch (playlist) {
            case 'favoritos':
                this.favoritos.addSongToPlaylist(cancion);
                break;
            case 'myPlaylist':
                this.myPlaylist.addSongToPlaylist(cancion);
                break;
        }
    }
    addPlaylist = function (id, playlist) {
        console.log("Entra a add playlist")
        let cancion = this.catalogoCanciones.find(song => song.id == id);
        switch (playlist) {
            case 'favoritos':
                this.favoritos.addSongToPlaylist(cancion);
                break;
            case 'myPlaylist':
                if (this.myPlaylist.getPlaylistName() !== 'favoritos') { // Verificar si no es igual a 'favoritos'
                    this.myPlaylist.addSongToPlaylist(cancion);
                } else {
                    console.log("No se puede agregar a myPlaylist porque es igual a favoritos.");
                }
                break;
        }
    }


    mostrarBusqueda(filtroCanciones) {
        let canciones = document.getElementById("searchResults");
        canciones.innerHTML = '';
        filtroCanciones.forEach(song => {
            canciones.innerHTML += `
                <div class="column" id="res_${song.id}">
                    <img class="img_list" src="../assets/portadas/${song.cover}" width="40vh" height="40vh">
                    <p data-idCancion="${song.id}">${song.nombre}</p>
                    <span data-idCancion="${song.id}" class="playsong material-symbols-outlined"  style="font-variation-settings:'FILL' 1,'wght' 400;">play_circle</span>
                    <span data-idCancion="${song.id}" class="favorites material-symbols-outlined" >favorite</span>
                    <span data-idCancion="${song.id}" class="addplaylist material-symbols-outlined">add</span>
                </div>
                <div class="division-line"></div>
            `;
        });
    
        // Agregar listeners de clic a los nuevos elementos
        let playSongs = document.getElementsByClassName("playsong");
        for (let i = 0; i < playSongs.length; i++) {
            playSongs[i].addEventListener("click", () => {
                this.currentPlaylist = 'busqueda';
                let id = playSongs[i].getAttribute('data-idCancion');
                this.currentSong = this.catalogoCanciones.find(song => song.id == id);
                this.play();
            });
        }
    
        let favoritos = document.getElementsByClassName("favorites");
        for (let i = 0; i < favoritos.length; i++) {
            favoritos[i].addEventListener("click", () => {
                let id = favoritos[i].getAttribute('data-idCancion');
                this.addPlaylist(id, 'favoritos')
            });
        }
        let addPlaylist = document.getElementsByClassName("addplaylist");
        for (let i = 0; i < addPlaylist.length; i++) {
            addPlaylist[i].addEventListener("click", () => {
                let id = addPlaylist[i].getAttribute('data-idCancion');
                this.addPlaylist(id, 'myPlaylist')
            });
        }
    }

    buscarCancion = function (valorBusqueda) {
        valorBusqueda = valorBusqueda.trim(valorBusqueda); //elimina espacios al inicio y al final
        valorBusqueda = valorBusqueda.toLowerCase();
        //valorBusqueda = valorBusqueda.toLowerCase();
        let resultadosBuscador = document.getElementById("searchResults");
        resultadosBuscador.innerHTML = `
            <div class="title_res">
                <p style="color: #2a2a58">Resultados del buscador: <span style="color: rgb(61, 60, 60);">${valorBusqueda}</span></p>
            </div>
        `;
        let resNombre = this.catalogoCanciones.filter(song => song.nombre.toLowerCase().match(valorBusqueda));
        let resAlbum = this.catalogoCanciones.filter(song => song.album.toLowerCase().match(valorBusqueda));
        let resArtista = this.catalogoCanciones.filter(song => song.autor.toLowerCase().match(valorBusqueda));
        let resGenero = this.catalogoCanciones.filter(song => song.genero.toLowerCase().match(valorBusqueda));
        let filtroCanciones = [...resNombre, ...resAlbum, ...resArtista, ...resGenero];
        filtroCanciones = [...new Set(filtroCanciones)]; // crea un nuevo objeto sin contenidos duplicados
        this.mostrarBusqueda(filtroCanciones);


    }

    buscarAutor = function (songAuthor) {
        return this.catalogoCanciones.find(song => song.autor === songAuthor);
    }

    buscarAlbum = function (songAlbum) {
        return this.catalogoCanciones.find(song => song.album === songAlbum);
    }
    buscarGenero = function (songGenre) {
        return this.catalogoCanciones.find(song => song.genero === songGenre);
    }

    cambiarPortada = function () {
        const cover = document.getElementById("cover");
        cover.src = "../assets/portadas/" + this.currentSong.cover;
    }

    //CONTROLES DE REPRODUCTOR 
    play = function () {
        let msjInformacion = document.getElementById("msjInfo");
        msjInformacion.innerHTML = '';
        console.log("Entra a play(): ", this.currentSong)
        if (this.currentSong !== undefined && this.isPaused == false) {
            this.audio.src = "../assets/canciones/" + this.currentSong.urlSong;

            this.audio.play();
            this.cambiarPortada();
            this.mostrarInformacion();
            this.isStopped = false; // Indicamos que la canción ya no está detenida
        }
        else if (this.isPaused) {
            this.audio.play(); // Continuamos la reproducción desde la posición en pausa
            this.isPaused = false; // Indicamos que ya no está pausada
        }


    }
    pause = function () {
        if (!this.isStopped) { // Solo si la canción no está detenida
            this.audio.pause();
            this.isPaused = true; // Indicamos que la canción está pausada
        }
    }

    stop = function () {
        if (!this.isStopped) { // Solo si la canción no está detenida
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isStopped = true; // Indicamos que la canción está detenida
            this.isPaused = false; // Reiniciamos el estado de pausa
        }
    }
    mute = function () {
        if (!this.isMuted) { // Si no está en silencio, guardamos el volumen actual y lo establecemos a cero
            this.savedVolume = this.audio.volume;
            this.audio.volume = 0;
            this.isMuted = true;
        } else { // Si está en silencio, restauramos el volumen guardado
            this.audio.volume = this.savedVolume;
            this.isMuted = false;
        }
    }
    skip_next = function () {
        let currentIndex = this.catalogoCanciones.findIndex(song => song.id === this.currentSong.id);
        let nextIndex = (currentIndex + 1) % this.catalogoCanciones.length;
        this.currentSong = this.catalogoCanciones[nextIndex];
        this.play();
    }

    skip_previous = function () {
        let currentIndex = this.catalogoCanciones.findIndex(song => song.id === this.currentSong.id);
        let previousIndex = (currentIndex - 1 + this.catalogoCanciones.length) % this.catalogoCanciones.length;
        this.currentSong = this.catalogoCanciones[previousIndex];
        this.play();
    }

}



let reproductor = new Reproductor();