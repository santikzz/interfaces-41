/* ======================= SIDENAV LOGIC ======================= */
const hamburger = document.querySelector('.toggle-sidenav');
const sidenav = document.querySelector('.sidenav');

hamburger.addEventListener('click', () => {
    sidenav.classList.toggle('open');
});

/* ======================= HERO CAROUSEL ======================= */
let heroCurrentPosition = 0;
const heroCarouselWrapper = document.querySelector('.hero-carousel-wrapper');
const heroCarousel = heroCarouselWrapper.querySelector('.hero-carousel');
const heroSlides = heroCarousel.querySelectorAll('.hero-slide');
const heroTitle = heroCarouselWrapper.querySelector('.hero-game-title');
const dotsContainer = heroCarouselWrapper.querySelector('.dots');
const dots = heroCarouselWrapper.querySelectorAll('.dot');
const heroTotalSides = heroSlides.length

const heroMoveCarousel = () => {
    const offset = -100 * heroCurrentPosition;
    heroCarousel.style.transform = `translateX(${offset}vw)`;
    heroTitle.textContent = heroSlides[heroCurrentPosition].dataset.title;
}

const heroNextSlide = () => {
    dots[heroCurrentPosition].classList.toggle('big');
    heroCurrentPosition = (heroCurrentPosition + 1) % heroTotalSides;
    dots[heroCurrentPosition].classList.toggle('big');
    heroMoveCarousel();
}

const heroPrevSlide = () => {
    dots[heroCurrentPosition].classList.toggle('big');
    heroCurrentPosition = (heroCurrentPosition - 1 + heroTotalSides) % heroTotalSides;
    dots[heroCurrentPosition].classList.toggle('big');
    heroMoveCarousel();
}

heroCarouselWrapper.querySelector('#hero-prev').addEventListener('click', heroPrevSlide);
heroCarouselWrapper.querySelector('#hero-next').addEventListener('click', heroNextSlide);

setInterval(heroNextSlide, 5000);

/* ======================= CARDS CAROUSEL ======================= */
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

/* ======================= DROPDOWN LOGIC ======================= */
const toggleDropdown = document.querySelector('.toggle-dropdown');
const dropdown = document.querySelector('.dropdown');

toggleDropdown.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

/* ======================= ADD TO CART LOGIC ======================= */

let itemsInCart = 0;
const cartItems = document.querySelector('#cart-items');
const cards = document.querySelectorAll('.card');

cards.forEach(card => {

    card.querySelector('.card-btn').addEventListener('click', () => {
        card.classList.add('incart');
        card.querySelector('i').classList.remove('fa-cart-shopping');
        card.querySelector('i').classList.add('fa-cart-plus');
        
        itemsInCart++;
        cartItems.textContent = `(${itemsInCart})`;

    })

});

