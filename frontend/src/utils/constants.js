const selectors = {
  popupEditProfile: '.popup_type_profile-edit',
  popupUpdateAvatar: '.popup_type_update-avatar',
  popupAddCard: '.popup_type_add-card',
  popupExpandPic: '.popup_type_expand-image',
  popupDelCard: '.popup_type_del-card',
  inputUsername: '.form__input_type_username',
  inputJob: '.form__input_type_job',
  inputImgName: '.form__input_type_name',
  inputImgLink: '.form__input_type_link',
  userName: '.profile__title',
  userJob: '.profile__description',
  userAvatar: '.profile__avatar',
  buttonEdit: '.profile__edit-button',
  buttonUpdateAvatar: '.profile__avatar-button',
  buttonAdd: '.profile__add-button',
  buttonClose: '.popup__close',
  buttonLike: '.element__like-button',
  buttonDel: '.element__del-button',
  form: '.popup__form',
  cardsList: '.elements__list',
  cardElement: '.element',
  cardImg: '.element__image',
  cardName: '.element__title',
  cardTemplate: '.element-tmp',
  fullSizeImg: '.popup__image',
  fullSizeImgCaption: '.popup__caption',
  popup: '.popup_opened',
  like: 'element__like-button_active',
  popupOpenClose: 'popup_opened',
  likesCounter: '.element__likes-counter'
};

// Создадим объект параметров
const validationConfig = {
  form: '.form',
  formInput: '.form__input',
  formSubmit: '.form__submit',
  formSet: '.form__set',
  inputError: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
};

// ищем попап редактирования профиля
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
// ищем кнопку для открытия попапа редактирования профиля
const popupEditProfileButton = document.querySelector(selectors.buttonEdit);
// ищем форму попапа редактирования профиля
const formEditProfileSubmit = popupEditProfile.querySelector(selectors.form);
// ищем инпуты (переменные) формы попапа редактирования профиля
const nameInput = popupEditProfile.querySelector(selectors.inputUsername);
const jobInput = popupEditProfile.querySelector(selectors.inputJob);

// ищем попап обновления аватара
const popupUpdateAvatar = document.querySelector(selectors.popupUpdateAvatar);
// ищем кнопку для открытия попапа обновления аватара
const buttonUpdateAvatar = document.querySelector(selectors.buttonUpdateAvatar);
// ищем форму попапа обновления аватара
const formUpdateAvatar = popupUpdateAvatar.querySelector(selectors.form);
// ищем картинку с аватаром
const avatar = document.querySelector(selectors.userAvatar);


// ищем попап добавления карточки
const popupAddCard = document.querySelector(selectors.popupAddCard);
// ищем кнопку открытия попапа добавления карточки
const popupAddCardButton = document.querySelector(selectors.buttonAdd);

// ищем форму попапа добавления карточки
const formAddCardSubmit = popupAddCard.querySelector(selectors.form);

// ищем контейнер, в который будем вставлять карточки
const cardsList = document.querySelector(selectors.cardsList);
// ищем шаблон карточки
const cardTemplate = document.querySelector(selectors.cardTemplate).content;


export {
  selectors,
  validationConfig,
  popupEditProfile,
  popupEditProfileButton,
  formEditProfileSubmit,
  nameInput,
  jobInput,
  popupUpdateAvatar,
  buttonUpdateAvatar,
  formUpdateAvatar,
  avatar,
  popupAddCard,
  popupAddCardButton,
  formAddCardSubmit,
  cardsList,
  cardTemplate
};
