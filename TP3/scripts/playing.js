function toggleComentario() {
    const texto = document.querySelector('.btn-comment .texto');
    const icono = document.querySelector('.btn-comment .icono');

    texto.style.visibility = 'hidden';
    texto.style.opacity = '0';
    icono.style.visibility = 'visible';
    icono.style.opacity = '1';

    setTimeout(() => {
        texto.style.visibility = 'visible';
        texto.style.opacity = '1';
        icono.style.visibility = 'hidden';
        icono.style.opacity = '0';
    }, 3000);
}