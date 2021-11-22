import images from './images.js';

const category = localStorage.getItem('category');
const pics = document.querySelector('.main__pictures');
const question = document.querySelector('.main__question');
const nextBtn = document.querySelector('.result__button');
const result = document.querySelector('.result__overlay');
const resultIcon = document.querySelector('.result__icon');
const resultPic = document.querySelector('.result__picture');
const resultPicName = document.querySelector('.result__picture-name');
const resultAuthor = document.querySelector('.result__author');
const trueAnsAudio = document.querySelector('#true-answer');
const falseAnsAudio = document.querySelector('#false-answer');

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
}

class Round {
  constructor() {
    this.pic = document.querySelectorAll('.main__picture');
    this.img = images.slice(category*10, category*10 + 10);
    this.round = -1;
    this.truePic = 0;
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
      return true;
    }

    return false;
  }
  showResult(isTrue) {
    result.classList.toggle('hide');
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
})

nextBtn.addEventListener('click', () => {
  result.classList.toggle('hide');
  if(round.round !== 10) {
    round.startRound()
  }
  else {
    console.log('FINISH');
  }
})

let round = new Round();
round.startRound();
