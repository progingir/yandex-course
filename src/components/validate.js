function showError(input, errorElement, settings) {
  if (input.validity.valueMissing) {
    errorElement.textContent = 'Вы пропустили это поле.';
  } else if (input.validity.typeMismatch && input.type === 'url') {
    errorElement.textContent = 'Не ссылка';
  } else if (input.validity.tooShort) {
    errorElement.textContent = `Минимальное количество символов: ${input.minLength}. Длина текста сейчас: ${input.value.length} символов.`;
  } else {
    errorElement.textContent = input.validationMessage;
  }
  errorElement.classList.add(settings.errorClass);
  input.style.borderColor = '#FF0000';
}

function hideError(input, errorElement, settings) {
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
  input.style.borderColor = '';
}

function checkInputValidity(input, form, settings) {
  const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
  if (input.validity.valid) {
    hideError(input, errorElement, settings);
  } else {
    showError(input, errorElement, settings);
  }
}

function toggleButtonState(inputs, button, settings) {
  const isFormValid = inputs.every(input => input.validity.valid);
  if (isFormValid) {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
}

function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputs, submitButton, settings);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, form, settings);
      toggleButtonState(inputs, submitButton, settings);
    });
  });
}

export function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach(form => {
    setEventListeners(form, settings);
  });
}