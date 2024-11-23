// 1)темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// 2)DOM элементы
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

// 3)открытие и закрытие поп-апа
function toggleModal(modal, isOpen) {
    modal.classList.toggle("popup_is-opened", isOpen);
}

function initializeModals() {
    [profilePopup, cardPopup, imagePopup].forEach(modal => modal.classList.add("popup_is-animated"));
    closeImageModalButton.addEventListener("click", () => toggleModal(imagePopup, false));
}

// 4)функция создания карточки
function createCard({ name, link }) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");

    imageElement.src = link;
    imageElement.alt = name;
    cardElement.querySelector(".card__title").textContent = name;

    attachCardEventHandlers(cardElement, name, link);
    return cardElement;
}

//события для карточки
function attachCardEventHandlers(cardElement, name, link) {
    const imageElement = cardElement.querySelector(".card__image");
    imageElement.addEventListener("click", () => openImageModal(name, link));

    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_is-active"));

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => deleteButton.closest(".card").remove());
}

function openImageModal(name, link) {
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;
    toggleModal(imagePopup, true);
}

//инициализация карточек
function initializeCards() {
    const cardElements = initialCards.map(createCard);
    cardContainer.append(...cardElements);
}

//редактирование профиля
function initializeProfileEditing() {
    const editProfileButton = document.querySelector(".profile__edit-button");
    const closeProfileModalButton = profilePopup.querySelector(".popup__close");

    editProfileButton.addEventListener("click", populateProfileForm);
    closeProfileModalButton.addEventListener("click", () => toggleModal(profilePopup, false));
    profileForm.addEventListener("submit", handleProfileFormSubmit);
}

function populateProfileForm() {
    nameInput.value = profileTitleElement.textContent;
    descriptionInput.value = profileDescriptionElement.textContent;
    toggleModal(profilePopup, true);
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileTitleElement.textContent = nameInput.value;
    profileDescriptionElement.textContent = descriptionInput.value;
    toggleModal(profilePopup, false);
}

//добавление карточек
function initializeCardAdding() {
    const addCardButton = document.querySelector(".profile__add-button");
    const closeCardModalButton = cardPopup.querySelector(".popup__close");

    addCardButton.addEventListener("click", openNewCardModal);
    closeCardModalButton.addEventListener("click", () => toggleModal(cardPopup, false));
    cardForm.addEventListener("submit", handleCardFormSubmit);
}

function openNewCardModal() {
    cardNameInput.value = "";
    cardLinkInput.value = "";
    toggleModal(cardPopup, true);
}

function handleCardFormSubmit(event) {
    event.preventDefault();
    const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
    cardContainer.prepend(newCard);
    toggleModal(cardPopup, false);
}

function initialize() {
    initializeModals();
    initializeCards();
    initializeProfileEditing();
    initializeCardAdding();
}

initialize();