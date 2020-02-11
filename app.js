const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const imagesLineup = document.querySelector('.images-lineup');

// Init empty arr to hold the appended images for the lineup
let smallImages = [];

// Use id to assign each image in the small image list below the big image
let id = -1;

//Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//Counter
let counter = 0;
const size = carouselImages[0].clientWidth;

// carouselSlide.style.transform = `translateX(${-size * counter}px)`;

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  showSmallImages();
  focusPreviewedImg();
});

nextBtn.addEventListener('click', () => {
  // The if else is used only to catch when we go from last to first so we speed the transition
  if (counter >= carouselImages.length - 1) {
    counter = 0;
    carouselSlide.style.transition = 'transform 0.2s ease-in-out';
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  } else {
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    counter++;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
});

prevBtn.addEventListener('click', () => {
  // The if else is used only to catch when we go from first to last so we speed the transition
  if (counter <= 0) {
    counter = carouselImages.length - 1;
    carouselSlide.style.transition = 'transform 0.2s ease-in-out';
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  } else {
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    counter--;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
});

carouselSlide.addEventListener('transitionrun', () => {
  focusPreviewedImg();
});

// Functions
function showSmallImages() {
  carouselImages.forEach(img => {
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
  });

  smallImages = document.querySelectorAll('.images-lineup img');
}

function focusPreviewedImg() {
  smallImages.forEach(img => {
    img.style.border = '';
    img.classList.remove('previewed');
  });

  smallImages[counter].classList.add('previewed');
}
