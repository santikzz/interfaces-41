const togglePasswordVis = document.querySelector('.eye');
const passwordInput = document.querySelector('#password');

togglePasswordVis.addEventListener('click', () => {

    togglePasswordVis.querySelector('i').classList.toggle('fa-eye-slash');
    togglePasswordVis.querySelector('i').classList.toggle('fa-eye');
    if (passwordInput.type === "text") {
        passwordInput.type = "password";
      } else {
        passwordInput.type = "text";
      }

});