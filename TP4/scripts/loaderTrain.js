const clouds = document.querySelectorAll('.cloud');

const body = document.querySelector('body');
const loader = document.querySelector('.loader-train');
const percentageText = document.querySelector('#loading-text');
const loaderButton = document.querySelector('#loader-button');

let progress = 0;
function updateProgress() {
    if (progress < 100) {
        progress += 1;
        // progressBar.style.width = progress + '%';
        percentageText.innerText = progress + '%';
    } else {
        // termino el loader -> 100%
        // hideLoader();
        loaderButton.classList.add('show');
    }
}
const interval = setInterval(updateProgress, 75);

loaderButton.addEventListener('click', () => {
    loader.classList.add('hidden');
});

const hideLoader = () => {
    loader.style.display = 'none';
    body.classList.remove('body-no-overflow');
}

function animateClouds() {
    clouds.forEach(cloud => {
        let cloudPosition = cloud.getBoundingClientRect();

        // Si la nube sale de la pantalla por la izquierda
        if (cloudPosition.right < 0) {
            // Mueve la nube al lado derecho
            cloud.style.left = `${window.innerWidth + 100}px`;  // Un poco más allá para empezar a moverse inmediatamente
        }
        else {
            cloud.style.left = `${cloudPosition.left - 1}px`;
        }
    });

    requestAnimationFrame(animateClouds);
}

animateClouds();

// setTimeout(() => {
//     animateClouds();
// }, 2000);

// setTimeout(() => {
//     hideLoader();
// }, 10000);