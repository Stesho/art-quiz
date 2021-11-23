import images from './images.js';

const category = localStorage.getItem('category');
const pics = document.querySelector('.main__pictures');
const question = document.querySelector('.main__question');
const nextBtn = document.querySelector('.result__button');
const overlay = document.querySelector('.result__overlay');
const result = document.querySelector('.result__wrapper');
const resultIcon = document.querySelector('.result__icon');
const resultPic = document.querySelector('.result__picture');
const resultPicName = document.querySelector('.result__picture-name');
const resultAuthor = document.querySelector('.result__author');
const trueAnsAudio = document.querySelector('#true-answer');
const falseAnsAudio = document.querySelector('#false-answer');
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
    this.pic = document.querySelectorAll('.main__picture');
    this.img = images.slice(category*10, category*10 + 10);
    this.round = -1;
    this.truePic = 0;
    this.trueAnswers = 0;
  }
  setImg() {  
    question.textContent = `Какую из картин написал ${this.img[this.round].author}?`;
    for(let i = 0; i < this.pic.length; i++) {
      if(i === this.truePic) {
        this.pic[i].src = `../../art-quiz/assets/full/${this.img[this.round].imageNum}full.jpg`;  
        continue;
      }

      let randPic = getRandom(0, images.length);
      this.pic[i].src = `../../art-quiz/assets/full/${randPic}full.jpg`;
    }
  }
  startRound() {  
    this.round++;
    this.truePic = getRandom(0, 4);
    this.setImg();
  }
  getTruePic(target) {
    let index;
      
    for(let i = 0; i < this.pic.length; i++) {
      if(this.pic[i] === target) {
        index = i;
      }
    }

    if(this.truePic === index) {
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

pics.addEventListener('click', (event) => {
  if(round.getTruePic(event.target)) {
    trueAnsAudio.play();
    round.showResult(true);
  }
  else {
    falseAnsAudio.play();
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
    round.showTotal();
  }
})

nextQuizBtn.addEventListener('click', () => {
  let ans = '---------';
  if(localStorage.getItem('trueAnswers') !== null) {
    ans = localStorage.getItem('trueAnswers');
  }
  ans = ans.split('-');
  ans[category] = round.trueAnswers;
  localStorage.setItem('trueAnswers', ans.join('-'));
})

let round = new Round();
round.startRound();
round.startTimer();