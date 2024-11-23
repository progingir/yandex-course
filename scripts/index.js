// 1) Шаблон карточки
const cardTemplate = document.querySelector("#card-template").content;

// 2) DOM элементы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const cardContainer = document.querySelector(".places__list");
const modalImage = imagePopup.querySelector(".popup__image");
const modalCaption = imagePopup.querySelector(".popup__caption");
const closeImageModalButton = imagePopup.querySelector(".popup__close");

const profileForm = profilePopup.querySelector(".popup__form");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const descriptionInput = profilePopup.querySelector(".popup__input_type_description");

const cardForm = cardPopup.querySelector(".popup__form");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

// 3) Функция открытия модального окна
function showModal(modal) {
    modal.classList.add("popup_is-opened");
}

// 4) Функция закрытия модального окна
function hideModal(modal) {
    modal.classList.remove("popup_is-opened");
}

