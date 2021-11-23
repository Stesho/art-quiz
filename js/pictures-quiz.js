const main = document.querySelector('.main');
const categories = document.querySelectorAll('.category__picture img');
const score = document.querySelectorAll('.category__score');
let category;

function getCategory(event) {
  let category;
  for(let i = 0; i < categories.length; i++) {
    if(categories[i] === event.target) {
      category = i;
    }
  }
  return category;
}

main.addEventListener('click', (event) => {
  category = getCategory(event);
  localStorage.setItem('category', category);
})

if(localStorage.getItem('trueAnswers') !== null) {
  let ans = localStorage.getItem('trueAnswers').split('-');
  for(let i = 0; i < ans.length; i++) {
    if(ans[i] !== '') {
      categories[i].style.filter = 'none';
      score[i].textContent = `${ans[i]}/10`;
    }
  }
}
