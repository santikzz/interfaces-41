const steps = document.querySelectorAll('.step');

let currentStep = 1;
const totalSteps = 3;

steps.forEach(step => {
    step.querySelector('.back').addEventListener('click', () => {
        if (currentStep > 1) {
            steps[currentStep - 1].classList.remove('show');
            currentStep = currentStep - 1;
            steps[currentStep - 1].classList.add('show');
        }
    });

    step.querySelector('.next').addEventListener('click', () => {
        if (currentStep < totalSteps) {
            steps[currentStep - 1].classList.remove('show');
            currentStep = currentStep + 1;
            steps[currentStep - 1].classList.add('show');
        }
    });

});