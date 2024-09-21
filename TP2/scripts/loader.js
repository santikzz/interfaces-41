let progress = 0;
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
    loader.classList.add('hidden');
  }
}

const interval = setInterval(updateProgress, 50);