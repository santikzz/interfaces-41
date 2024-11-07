let progress = 0;

const body = document.querySelector('body');
const loader = document.querySelector('.loader-container');
const progressBar = document.getElementById('progress');
const percentageText = document.getElementById('percentage');
const skipBtn = document.getElementById('skip-btn');

const hideLoader = () => {
  clearInterval(interval);
  loader.style.display = 'none';
  body.classList.remove('body-no-overflow');
}

skipBtn.addEventListener('click', () => {
  hideLoader();
});

function updateProgress() {
  if (progress < 100) {
    progress += 1;
    progressBar.style.width = progress + '%';
    percentageText.innerText = progress + '%';
  } else {
    hideLoader();
  }
}

const interval = setInterval(updateProgress, 50);