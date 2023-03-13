const form = document.getElementById('signupForm');

function validateForm() {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required]');

  inputs.forEach(input => {
    if (!input.value.trim()) {
      displayErrorMessage(input, 'Este campo es obligatorio');
      isValid = false;
    } else {
      displayErrorMessage(input, '');
    }
  });

  return isValid;
}

function displayErrorMessage(input, message) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = message;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const url = '/users';
  const headers = {
    'Content-Type': 'application/json',
  };
  const method = 'POST';
  const body = JSON.stringify(obj);

  fetch(url, {
    headers,
    method,
    body,
  })
    .then(response => {
      response.json();
      if (response.ok) {
        window.location.href = '/login';
      }
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
});