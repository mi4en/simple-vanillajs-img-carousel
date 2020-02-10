const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const imagesLineup = document.querySelector('.images-lineup');
let smallImages = [];

// Use id to assign each image in the small image list below the big image
let id = 0;

//Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//Counter
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = `translateX(${-size * counter}px)`;

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  showSmallImages();
  focusPreviewedImg();
});

nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }

  if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }

  focusPreviewedImg();
});

// Functions
function showSmallImages() {
  carouselImages.forEach(img => {
    const imgId = img.getAttribute('id');

    if (imgId !== 'firstClone' && imgId !== 'lastClone') {
      const smallImage = document.createElement('img');
      smallImage.setAttribute('src', img.getAttribute('src'));

      // increment id;
      id++;
      // set id to each image so we can target them
      smallImage.setAttribute('id', id);

      // add event listener on click when we click on image from the lineup
      smallImage.addEventListener('click', () => {
        // set the counter to the id so that we scroll the main image
        counter = smallImage.getAttribute('id');
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;

        focusPreviewedImg();
      });

      imagesLineup.appendChild(smallImage);
    }
  });

  smallImages = document.querySelectorAll('.images-lineup img');
}

function focusPreviewedImg() {
  smallImages.forEach(img => {
    img.style.border = '';
    img.classList.remove('previewed');
  });

  smallImages[counter - 1].classList.add('previewed');
}
