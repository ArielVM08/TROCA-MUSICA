// 🔍 Selecionando elementos HTML para manipular via JavaScript
const songName = document.getElementById("song-name"); // Elemento que exibe o nome da música
const bandName = document.getElementById("band-name"); // Elemento que exibe o nome do artista
const song = document.getElementById("audio"); // Elemento de áudio que toca a música
const cover = document.getElementById("cover"); // Elemento que exibe a capa do álbum
const play = document.getElementById("play"); // Botão de play/pause
const next = document.getElementById("next"); // Botão para próxima música
const previous = document.getElementById("previous"); // Botão para música anterior
const progressBar = document.getElementById("progress-bar"); // Container da barra de progresso
const currentProgress = document.getElementById("current-progress"); // Barra preenchida que mostra o progresso
const body = document.body; // Corpo da página para alterar o background
const volume = document.getElementById("volume"); // Controle de volume (se necessário)

// 🎵 Playlist organizada (IMPORTANTE: caminhos corretos)
// Objeto contendo informações da primeira música da playlist
const StickoModet = {
  songName: "Sticko Modet", // Nome da música
  file: "songs/travis-scott-sicko-mode-audio.mp3", // Caminho do arquivo de áudio
  cover: "images/butterfly_effect.png", // Caminho da imagem da capa
  artist: "Zé Vaqueiro", // Nome do artista
  background: "linear-gradient(180deg, #0f1515 0%, #ac8b1f 100%)",
};

// Objeto contendo informações da segunda música da playlist
const GodsPlan = {
  songName: "God's Plan", // Nome da música
  file: "songs/drake-gods-plan.mp3", // Caminho do arquivo de áudio
  cover: "images/drake.png", // Caminho da imagem da capa
  artist: "Drake", // Nome do artista
  background: "linear-gradient(180deg, #1c1d1d 0%, #323232 100%)",
};

// Objeto contendo informações da terceira música da playlist
const tubaroes = {
  songName: "Tubarões", // Nome da música
  file: "songs/Diego-e-Victor-Hugo-Tubar-es-(CeeNaija.com).mp3", // Caminho do arquivo de áudio
  cover: "images/diego_e_vitor.png", // Caminho da imagem da capa
  artist: "Diego & Victor Hugo", // Nome do artista
  background: "linear-gradient(180deg, #021011 0%, #0d4f67 100%)",
};

// Array que agrupas todas as músicas em uma playlist
const playlist = [StickoModet, GodsPlan, tubaroes];

// Variável que rastreia qual música está sendo tocada (índice na playlist)
let currentSong = 0;
// Variável booleana que rastreia se uma música está tocando ou pausada
let isPlaying = false;

// 🔊 Função para alternar entre mudo e volume normal
function toggleVolume() {
  const btnVolume = document.getElementById('volume');
  const icone = btnVolume.querySelector("i");

  song.muted = !song.muted; // Inverte o estado (se true vira false e vice-versa)

  if (song.muted) {
    icone.classList.replace("bi-volume-up", "bi-volume-mute");
  } else {
    icone.classList.replace("bi-volume-mute", "bi-volume-up");
  }
}


// ▶️ Função para iniciar a reprodução da música
function playSong() {
  isPlaying = true; // Marca que uma música está tocando
  play.querySelector("i").classList.remove("bi-play-circle-fill"); // Remove ícone de play
  play.querySelector("i").classList.add("bi-pause-circle-fill"); // Adiciona ícone de pause
  song.play(); // Reproduz o arquivo de áudio
}

// ⏸ Função para pausar a reprodução da música
function pauseSong() {
  isPlaying = false; // Marca que a música está pausada
  play.querySelector("i").classList.add("bi-play-circle-fill"); // Adiciona ícone de play
  play.querySelector("i").classList.remove("bi-pause-circle-fill"); // Remove ícone de pause
  song.pause(); // Para a reprodução do áudio
}

// 🔁 Função que alterna entre play e pause
function playPauseDecider() {
  // Se a música está tocando, pausa; caso contrário, toca
  isPlaying ? pauseSong() : playSong();
}

// 🎶 Função para carregar os dados da música atual
function initializeSong() {
  const current = playlist[currentSong]; // Obtém o objeto da música atual

  songName.innerText = current.songName; // Exibe o nome da música na página
  bandName.innerText = current.artist; // Exibe o artista na página
  song.src = current.file; // Define o arquivo de áudio a ser tocado
  cover.src = current.cover; // Define a capa do álbum a ser exibida
  updateBackground(); // Atualiza o background da página para a música atual
}

// 🌈 Função para aplicar o background definido na música atual
function updateBackground() {
  const current = playlist[currentSong];
  body.style.background = current.background;
}

// ⏭ Função para passar para a próxima música
function nextSong() {
  currentSong = (currentSong + 1) % playlist.length; // Incrementa o índice, voltando ao início se necessário
  initializeSong(); // Carrega os dados da nova música
  playSong(); // Começa a tocar automaticamente
}

// ⏮ Função para voltar para a música anterior
function previousSong() {
  // Decrementa o índice, voltando ao final se necessário
  currentSong =
    (currentSong - 1 + playlist.length) % playlist.length;
  initializeSong(); // Carrega os dados da música anterior
  playSong(); // Começa a tocar automaticamente
}

// 📊 Função para atualizar a barra de progresso durante a reprodução
function updateProgressBar() {
  const progressPercent = (song.currentTime / song.duration) * 100; // Calcula a porcentagem de progresso
  currentProgress.style.width = `${progressPercent}%`; // Ajusta a largura da barra preenchida
}

// 🖱️ Função para pular para uma posição quando clica na barra de progresso
function setProgress(e) {
  const width = progressBar.clientWidth; // Obtém a largura total da barra
  const clickX = e.offsetX; // Obtém a posição do clique relativa à barra
  const duration = song.duration; // Obtém a duração total da música
  song.currentTime = (clickX / width) * duration; // Define o tempo de reprodução proporcionalmente
}

// 🔄 Quando música acabar, passa automaticamente para a próxima
song.addEventListener("ended", nextSong);

// 🎛 Associando funções aos eventos dos botões
play.addEventListener("click", playPauseDecider); // Botão de play/pause
next.addEventListener("click", nextSong); // Botão de próxima música
previous.addEventListener("click", previousSong); // Botão de música anterior

// 📈 Atualiza a barra de progresso em tempo real durante a reprodução
song.addEventListener("timeupdate", updateProgressBar);

// 🖱️ Permite clicar na barra de progresso para pular para aquela posição
progressBar.addEventListener("click", setProgress);

// 🚀 Carrega e exibe a primeira música da playlist ao iniciar a página
initializeSong();