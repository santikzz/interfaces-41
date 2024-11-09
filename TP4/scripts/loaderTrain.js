const train = document.querySelector(".train-img");
const clouds = document.querySelectorAll('.cloud');
const loaderTrain = document.querySelector("loader-train");

function startTrain() {
    train.classList.add("move")
    // setTimeout(() => {
    //     animateClouds();
    // }, 4000);
    animateClouds()
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

startTrain();


