import images from './images.js';

const category = localStorage.getItem('category');

const pic = document.querySelector('.main__picture');
const buttons = document.querySelector('.main__buttons');
const nextBtn = document.querySelector('.result__button');
const overlay = document.querySelector('.result__overlay');
const result = document.querySelector('.result__wrapper');
const resultIcon = document.querySelector('.result__icon');
const resultPic = document.querySelector('.result__picture');
const resultPicName = document.querySelector('.result__picture-name');
const resultAuthor = document.querySelector('.result__author');
const trueAnsAudio = document.querySelector('#true-answer');
const falseAnsAudio = document.querySelector('#false-answer');
const finishAudio = document.querySelector('#finish-game');
const progress = document.querySelector('.header__progress');
const time = document.querySelector('.header__time');
const total = document.querySelector('.total__wrapper');
const score = document.querySelector('.total__score');
const nextQuizBtn = document.querySelector('.total__button');
let timer;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
}

class Round {
  constructor() {
    this.authors = document.querySelectorAll('.main__button');
    this.img = images.slice(category*10 + images.length/2, category*10 + images.length/2 + 10);
    this.round = -1;
    this.trueAuthor = 0;
    this.trueAnswers = 0;
  }
  setImg() {  
    pic.src = `../../art-quiz/assets/full/${this.img[this.round].imageNum}full.jpg`;   
    for(let i = 0; i < this.authors.length; i++) {
      if(i === this.trueAuthor) {
        this.authors[i].textContent = this.img[this.round].author;  
        continue;
      }
      let randAuthor = getRandom(0, images.length);
      this.authors[i].textContent = images[randAuthor].author;  
    }
  }
  startRound() {  
    this.round++;
    this.trueAuthor = getRandom(0, 4);
    this.setImg();
  }
  getTrueAuthor(target) {
    let index;
      
    for(let i = 0; i < this.authors.length; i++) {
      if(this.authors[i] === target) {
        index = i;
      }
    }

    if(this.trueAuthor === index) {
      this.trueAnswers++;
      return true;
    }

    return false;
  }
  showResult(isTrue) {
    resultPic.src = `../../art-quiz/assets/full/${this.img[this.round].imageNum}full.jpg`;
    resultPicName.textContent = this.img[this.round].name;
    resultAuthor.textContent = `${this.img[this.round].author}, ${this.img[this.round].year}г.`;
    if(isTrue) {
      resultIcon.innerHTML = '&#10004;';
      resultIcon.style.backgroundColor = '#3DDA69';
    }
    else {
      resultIcon.innerHTML = '&#10006;';
      resultIcon.style.backgroundColor = '#FF7E7E';  
    }
  }
  startTimer() {
    let isTimer = localStorage.getItem('isTimer');
    if(isTimer === 'false') {
      return;
    }
    let step = localStorage.getItem('time');
    let width = 0;
    let seconds = step;
    progress.style.width = '0%';
    time.textContent = seconds >= 10 ? `0:${seconds}` : `0:0${seconds}`;
    timer = setInterval(() => {
      if(seconds - 1 < 0) {
        overlay.classList.toggle('hide');
        this.showResult(false);
        clearInterval(timer);
        return;
      }

      seconds--;
      width += 100/step;

      let format = seconds >= 10 ? seconds : '0' + seconds;
      progress.style.width = width + '%';
      time.textContent = `0:${format}`;
    }, 1000);
  }
  showTotal () {
    score.textContent = `${this.trueAnswers}/10`;
  }
}

buttons.addEventListener('click', (event) => {
  if(round.getTrueAuthor(event.target)) {
    if(localStorage.getItem('volume') !== '0') trueAnsAudio.play();
    round.showResult(true);
  }
  else {
    if(localStorage.getItem('volume') !== '0') falseAnsAudio.play();
    round.showResult(false);
  }
  overlay.classList.toggle('hide');
  clearInterval(timer);
})

nextBtn.addEventListener('click', () => {
  if(round.round < 9) {
    overlay.classList.toggle('hide');
    round.startRound();
    round.startTimer();
  }
  else {
    result.classList.toggle('hide');
    total.classList.toggle('hide');
    if(localStorage.getItem('volume') !== '0') finishAudio.play();
    round.showTotal();
  }
})

nextQuizBtn.addEventListener('click', () => {
  let ans = ',,,,,,,,,';
  if(localStorage.getItem('artistsAnswers') !== null) {
    ans = localStorage.getItem('artistsAnswers');
  }
  ans = ans.split(',');
  ans[category] = round.trueAnswers;
  localStorage.setItem('artistsAnswers', ans.join(','));
})

let round = new Round();
round.startRound();
round.startTimer();