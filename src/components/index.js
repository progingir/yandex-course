import '../pages/index.css';
import { createCard, renderCards } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation } from './validate.js';
import { getUserInfo, getCards, updateUserInfo, addCard, updateAvatar } from './api.js';

const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileAvatar = document.querySelector('.profile__image');
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
const confirmPopup = document.querySelector('.popup_confirm');
const placesList = document.querySelector('.places__list');
const popupChangeAvatar = document.querySelector('.popup_change-avatar');
const avatarFormElement = popupChangeAvatar.querySelector('.popup__form-change');
const avatarInput = popupChangeAvatar.querySelector('.popup__input_avatar');

getUserInfo()
  .then(user => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
    profileAvatar.alt = `Аватар пользователя ${user.name}`;
    const currentUserId = user._id;

    getCards()
      .then(cards => {
        if (Array.isArray(cards)) {
          renderCards(cards, openModal, imagePopup, imageElement, captionElement, currentUserId, confirmPopup);
        } else {
          console.error('Данные не являются массивом:', cards);
        }
      })
      .catch(error => {
        console.error('Ошибка при загрузке карточек:', error);
      });

    cardFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const name = placeNameInput.value;
      const link = linkInput.value;

      addCard(name, link)
        .then(newCard => {
          const card = createCard(newCard, openModal, imagePopup, imageElement, captionElement, currentUserId, confirmPopup);
          placesList.prepend(card);
          closeModal(cardPopup);
          placeNameInput.value = '';
          linkInput.value = '';
        })
        .catch(error => console.error('Ошибка при добавлении новой карточки:', error));
    });
  })
.catch(error => console.error(error));

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  updateUserInfo(name, about)
    .then(user => {
      if (user && user.name && user.about && user.avatar) {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        profileAvatar.src = user.avatar;
        profileAvatar.alt = `Аватар пользователя ${user.name}`;
        closeModal(profilePopup);
      } else {
        console.error('Ошибка: Некорректные данные от сервера');
      }
    })
    .catch(error => {
      console.error('Ошибка при обновлении данных пользователя:', error);
    });
});

profileAvatar.addEventListener('click', () => {
  openModal(popupChangeAvatar);
});

avatarFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const avatarUrl = avatarInput.value;
  updateAvatar(avatarUrl)
  .then(updatedUser => {
    profileAvatar.style.backgroundImage = `url(${updatedUser.avatar})`;
    closeModal(popupChangeAvatar);
  })
  .catch(error => {
    console.error('Ошибка при обновлении аватара:', error);
  });
  avatarInput.value = '';
});

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationSettings);

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