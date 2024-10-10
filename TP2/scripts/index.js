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
let cardCarousels = document.querySelectorAll('.cards-carousel-wrapper');
const cardWidth = document.querySelector('.card').offsetWidth;

cardCarousels.forEach(wrapper => {

    const carousel = wrapper.querySelector('.cards-carousel');
    let scrollPosition = 0;

    carousel.addEventListener('transitionend', () => {
        carousel.classList.remove('skew-left', 'skew-right');
    });

    wrapper.querySelector('.action-left').addEventListener('click', () => {
        // carousel.scrollLeft -= cardWidth * 1.5;
        scrollPosition += cardWidth * 1.5;
        carousel.style.transform = `translateX(${scrollPosition}px)`;        
        carousel.classList.add('skew-right');
        // carousel.querySelectorAll('.card').forEach(card => {
        //     card.style.transform = 'skewX(10deg)';
        // });
        // setTimeout(() => {
        //     carousel.querySelectorAll('.card').forEach(card => {
        //         card.style.transform = 'skewX(0)';
        //     });
        // }, 300);

    });

    wrapper.querySelector('.action-right').addEventListener('click', () => {
        // carousel.scrollLeft += cardWidth * 1.5;  
        scrollPosition -= cardWidth * 1.5;
        carousel.style.transform = `translateX(${scrollPosition}px)`;
        carousel.classList.add('skew-left');
        // carousel.querySelectorAll('.card').forEach(card => {
        //     card.style.transform = 'skewX(-10deg)';
        // });
        // setTimeout(() => {
        //     carousel.querySelectorAll('.card').forEach(card => {
        //         card.style.transform = 'skewX(0)';
        //     });
        // }, 300);

    });
});

/* ======================= ADD TO CART LOGIC ======================= */

const cards = document.querySelectorAll('.card');

cards.forEach(card => {

    card.querySelector('.card-btn').addEventListener('click', () => {
        card.classList.toggle('incart');
        card.querySelector('i').classList.toggle('fa-cart-shopping');
        card.querySelector('i').classList.toggle('fa-cart-plus');
    })

});

