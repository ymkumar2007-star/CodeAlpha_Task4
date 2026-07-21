// ===============================
// Music Data
// ===============================

const songs = [
    {
        title: "Song One",
        artist: "Artist One",
        src: "songs/song1.mp3",
        cover: "images/song1.jpg"
    },

    {
        title: "Song Two",
        artist: "Artist Two",
        src: "songs/song2.mp3",
        cover: "images/song2.jpg"
    },

    {
        title: "Song Three",
        artist: "Artist Three",
        src: "songs/song3.mp3",
        cover: "images/song3.jpg"
    }
];


// ===============================
// Select Elements
// ===============================

const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlistItems = document.querySelectorAll("#playlist li");


// ===============================
// Current Song
// ===============================

let songIndex = 0;


// ===============================
// Load Song
// ===============================

function loadSong(song){

    title.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.src;

    cover.src = song.cover;

    highlightPlaylist();

}


// ===============================
// Play Song
// ===============================

function playSong(){

    audio.play();

    playBtn.innerHTML = '<i class="fas fa-pause"></i>';

}


// ===============================
// Pause Song
// ===============================

function pauseSong(){

    audio.pause();

    playBtn.innerHTML = '<i class="fas fa-play"></i>';

}


// ===============================
// Play Button
// ===============================

playBtn.addEventListener("click",()=>{

    if(audio.paused){

        playSong();

    }
    else{

        pauseSong();

    }

});


// ===============================
// Next Song
// ===============================

function nextSong(){

    songIndex++;

    if(songIndex >= songs.length){

        songIndex = 0;

    }

    loadSong(songs[songIndex]);

    playSong();

}


// ===============================
// Previous Song
// ===============================

function previousSong(){

    songIndex--;

    if(songIndex < 0){

        songIndex = songs.length - 1;

    }

    loadSong(songs[songIndex]);

    playSong();

}


nextBtn.addEventListener("click",nextSong);

prevBtn.addEventListener("click",previousSong);


// ===============================
// Update Progress Bar
// ===============================

audio.addEventListener("timeupdate",()=>{


    if(audio.duration){

        let progressPercent =
        (audio.currentTime / audio.duration) * 100;


        progress.value = progressPercent;


        currentTime.textContent =
        formatTime(audio.currentTime);


        duration.textContent =
        formatTime(audio.duration);

    }

});


// ===============================
// Change Song Position
// ===============================

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value / 100) * audio.duration;

});


// ===============================
// Format Time
// ===============================

function formatTime(time){

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);


    if(seconds < 10){

        seconds = "0" + seconds;

    }


    return `${minutes}:${seconds}`;

}


// ===============================
// Volume Control
// ===============================

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});


// ===============================
// Autoplay Next Song
// ===============================

audio.addEventListener("ended",()=>{

    nextSong();

});


// ===============================
// Playlist Click
// ===============================

playlistItems.forEach(item=>{


    item.addEventListener("click",()=>{


        songIndex = item.dataset.index;


        loadSong(songs[songIndex]);


        playSong();


    });


});


// ===============================
// Highlight Active Song
// ===============================

function highlightPlaylist(){

    playlistItems.forEach(item=>{

        item.classList.remove("active");

    });


    playlistItems[songIndex]
    .classList.add("active");

}


// ===============================
// Start Player
// ===============================

loadSong(songs[songIndex]);