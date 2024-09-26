const nextButtons = document.querySelectorAll(".next");
const backButtons = document.querySelectorAll(".back");

const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const steps = document.querySelectorAll('.step');

let pasoActual = 1;
const totalPasos = 3;

nextButtons.forEach((next) => {
  next.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateForm(pasoActual)) {
      updateProgressBar();
    }
  });
});

backButtons.forEach((back) => {
  back.addEventListener('click', (e) => {
    e.preventDefault();

    if (pasoActual > 1) {
      steps[pasoActual - 1].classList.remove("show");
      steps[pasoActual - 2].classList.add("show");

      pasoActual--;
      calcularPorcentaje(pasoActual);
    }
  });
});

function updateProgressBar() {
  if (pasoActual < totalPasos) {
    steps[pasoActual - 1].classList.remove("show");
    steps[pasoActual].classList.add("show");

    pasoActual++;
    calcularPorcentaje(pasoActual);
  }
  else{ //Llego al final
    showCongratulations();
  }
}

function validateForm(step) {
  const inputs = document.querySelectorAll(`#step-${step} input`);
  let valid = true;
  inputs.forEach(input => {
    if (input.classList.contains('optional')) {
      return; 
    }
    if (input.value === '') {
      input.style.border = '1px solid red';
      valid = false;
    } 
    else{
      input.style.border = '1px solid #ccc';
    }
  });
  return valid;
}

function showCongratulations(){
  document.querySelector('.container').style.display = 'none';
  document.querySelector('.progress').style.display = 'none';
  document.querySelector('.congratulations').classList.add('show');
}

function calcularPorcentaje(pasoActual){
  const porcentaje = (pasoActual / totalPasos) * 100;
  progressBar.style.width = `${porcentaje}%`;
  progressText.innerHTML = `${pasoActual} de ${totalPasos}`;
}