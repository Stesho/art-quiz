const volumeBar = document.querySelector('.volume-bar');
const muteBtn = document.querySelector('.volume-mute');
const fullVolumeBtn = document.querySelector('.volume-full');
const defaultBtn = document.querySelector('.buttons-default');
const saveBtn = document.querySelector('.buttons-save');
const trueAnsAudio = document.querySelector('#true-answer');
const falseAnsAudio = document.querySelector('#false-answer');
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const seconds = document.querySelector('.answer-time-seconds');
const timerBtn = document.querySelector('.time-game-btn input');

function getSettings() {
  if(localStorage.getItem('volume') !== null) {
    setVolume(localStorage.getItem('volume')*100);
  }
  if(localStorage.getItem('isTimer') !== null) {
    localStorage.getItem('isTimer') === 'true' ? setTimer(true) : setTimer(false);
  }
  if(localStorage.getItem('time') !== null) {
    setTime(localStorage.getItem('time'));
  }
}

function setVolume(value) {
  volumeBar.value = value;
  volumeBar.style.background = `linear-gradient(to right, #FFBCA2 ${value}%, #A4A4A4 ${value}%)`;
  trueAnsAudio.volume = value/100;
  falseAnsAudio.volume = value/100;
}

function setTimer(value) {
  timerBtn.checked = Boolean(value);
}

function setTime(value) {
  seconds.textContent = value;
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

timerBtn.addEventListener('click', () => {
  setTimer(timerBtn.checked);
})

minusBtn.addEventListener('click', () => {
  let step = 5;
  if(Number(seconds.textContent) - step >= 0) {
    seconds.textContent = Number(seconds.textContent) - 5;
    setTime(Number(seconds.textContent));
  }
})

plusBtn.addEventListener('click', () => {
  let step = 5;
  if(Number(seconds.textContent) + step <= 60) {
    seconds.textContent = Number(seconds.textContent) + 5;
    setTime(Number(seconds.textContent));
  }
})

saveBtn.addEventListener('click', () => {
  localStorage.setItem('volume', trueAnsAudio.volume);
  localStorage.setItem('time', seconds.textContent);
  localStorage.setItem('isTimer', timerBtn.checked);
})

defaultBtn.addEventListener('click', () => {
  setVolume(50);
  setTimer(true);
  setTime(20);
})

getSettings();

