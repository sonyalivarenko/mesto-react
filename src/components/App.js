import React from 'react';
//import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link
    });
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />
      <template id="photo-template">
        <div class="photo__item">
          <img class="photo__img" />
          <button class="photo__button-delete"></button>
          <div class="photo__text">
            <h2 class="photo__name"></h2>
            <div class="photo__fame">
              <button class="photo__heart" type="button"></button>
              <span class="photo__number-like"></span>
            </div>
          </div>
        </div>
      </template>
      <PopupWithForm name="recording" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
              <input type="text" class="popup__item popup__item_value_name" id="popup__item-name" name="name" placeholder="Имя" required minlength="2" maxlength="40" />
              <span class="popup__item-error popup__item-name-error"></span>
              <input type="text" class="popup__item popup__item_value_job" id="popup__item-job" name="job" placeholder="Профессия" required minlength="2" maxlength="200" />
              <span class="popup__item-error popup__item-job-error"></span>
              <button class="popup__button" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm name="add-image" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
              <input type="text" class="popup__item popup__item_value_title" id="popup__item-title" name="title" placeholder="Название" required minlength="2" maxlength="30" />
              <span class="popup__item-error popup__item-title-error"></span>
              <input type="url" class="popup__item popup__item_value_url" id="popup__item-url" name="url" placeholder="Ссылка на картинку" required />
              <span class="popup__item-error popup__item-url-error"></span>
              <button class="popup__button" type="submit">Создать</button>
      </PopupWithForm>
      <PopupWithForm name="delete" title="Вы уверены?">
              <button class="popup__button" type="submit">Да</button>
      </PopupWithForm>
      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
              <input type="url" class="popup__item popup__item_value_avatar" id="popup__item-avatar" name="avatar" placeholder="Фото профиля" required />
              <span class="popup__item-error popup__item-avatar-error"></span>
              <button class="popup__button" type="submit">Сохранить</button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
    </div>
  );
}

export default App;
