const volumeBar = document.querySelector('.volume-bar');
const muteBtn = document.querySelector('.volume-mute');
const fullVolumeBtn = document.querySelector('.volume-full');
const defaultBtn = document.querySelector('.buttons-default');
const saveBtn = document.querySelector('.buttons-save');
const trueAnsAudio = document.querySelector('#true-answer');
const falseAnsAudio = document.querySelector('#false-answer');

function getVolume() {
  trueAnsAudio.volume = localStorage.getItem('volume');
  falseAnsAudio.volume = localStorage.getItem('volume');
}

function setVolume(value) {
  volumeBar.value = value;
  volumeBar.style.background = `linear-gradient(to right, #FFBCA2 ${value}%, #A4A4A4 ${value}%)`;
  trueAnsAudio.volume = value/100;
  falseAnsAudio.volume = value/100;
}

volumeBar.addEventListener('input', () => {
  setVolume(volumeBar.value);
})

muteBtn.addEventListener('click', () => {
  setVolume(0);
})

fullVolumeBtn.addEventListener('click', () => {
  setVolume(100);
})

saveBtn.addEventListener('click', () => {
  localStorage.setItem('volume', trueAnsAudio.volume);
})

defaultBtn.addEventListener('click', () => {
  setVolume(50);
})


