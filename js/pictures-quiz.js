let main = document.querySelector('.main');
let categories = document.querySelectorAll('.category__picture img');
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


