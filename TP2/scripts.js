
let cardWidth = 300;
let cardCarousels = document.querySelectorAll('.cards-carousel-wrapper');

cardCarousels.forEach(wrapper => {

    const carousel = wrapper.querySelector('.cards-carousel');

    wrapper.querySelector('.action-left').addEventListener('click', () => {
        carousel.scrollLeft -= cardWidth * 1.5;
    });

    wrapper.querySelector('.action-right').addEventListener('click', () => {
        carousel.scrollLeft += cardWidth * 1.5;
    });

});


let heroTitles = [
    'Rayman Adventures: The Lost Treasure',
    'Mortal Kombat The Alien Invasion',
    'Street Fighter Rebelion Saga',
];

let heroCurrentPosition = 0;

const heroCarouselWrapper = document.querySelector('.hero-carousel-wrapper');
const heroCarousel = heroCarouselWrapper.querySelector('.hero-carousel');
const heroTotalSides = heroCarousel.querySelectorAll('.hero-slide').length;
const heroTitle = heroCarouselWrapper.querySelector('.hero-game-title');

const heroMoveCarousel = () => {
    const offset = -100 * heroCurrentPosition;
    heroCarousel.style.transform = `translateX(${offset}vw)`;
    heroTitle.textContent = heroTitles[heroCurrentPosition];
}

const heroNextSlide = () => {
    heroCurrentPosition = (heroCurrentPosition + 1) % heroTotalSides;
    heroMoveCarousel();
}

const heroPrevSlide = () => {
    heroCurrentPosition = (heroCurrentPosition - 1 + heroTotalSides) % heroTotalSides;
    heroMoveCarousel();
}

heroCarouselWrapper.querySelector('#hero-prev').addEventListener('click', heroPrevSlide);
heroCarouselWrapper.querySelector('#hero-next').addEventListener('click', heroNextSlide);

setInterval(heroNextSlide, 5000);