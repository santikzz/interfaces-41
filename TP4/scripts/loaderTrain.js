const clouds = document.querySelectorAll('.cloud');

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

setTimeout(() => {
    animateClouds();
}, 2000);