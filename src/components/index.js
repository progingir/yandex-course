import '../pages/index.css';
import { renderCards } from './cards.js';
import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';
import { enableValidation } from './validate.js';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationSettings);

const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const placeNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const linkInput = cardPopup.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('.popup_type_image');
const imageElement = imagePopup.querySelector('.popup__image');
const captionElement = imagePopup.querySelector('.popup__caption');
const addButton = document.querySelector('.profile__add-button');

renderCards(initialCards, openModal, imagePopup, imageElement, captionElement);

document.addEventListener('DOMContentLoaded', () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
});

addButton.addEventListener('click', () => {
  placeNameInput.value = '';
  linkInput.value = '';
  openModal(cardPopup);
});

cardFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  const card = createCard(cardData, openModal, imagePopup, imageElement, captionElement);
  document.querySelector('.places__list').prepend(card);
  closeModal(cardPopup);
});