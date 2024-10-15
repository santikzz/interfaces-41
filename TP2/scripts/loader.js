let progress = 0;

const body = document.querySelector('body');
const loader = document.querySelector('.loader-container');
const progressBar = document.getElementById('progress');
const percentageText = document.getElementById('percentage');

function updateProgress() {
  if (progress < 100) {
    progress += 1;
    progressBar.style.width = progress + '%';
    percentageText.innerText = progress + '%';
  } else {
    clearInterval(interval);
    loader.style.display = 'none';
    body.classList.remove('body-no-overflow');
  }
}

const interval = setInterval(updateProgress, 50);