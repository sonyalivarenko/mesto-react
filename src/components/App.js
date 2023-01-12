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
      <PopupWithForm name="recording" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
              <input type="text" className="popup__item popup__item_value_name" id="popup__item-name" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
              <span className="popup__item-error popup__item-name-error"></span>
              <input type="text" className="popup__item popup__item_value_job" id="popup__item-job" name="job" placeholder="Профессия" required minLength="2" maxLength="200" />
              <span className="popup__item-error popup__item-job-error"></span>
      </PopupWithForm>
      <PopupWithForm name="add-image" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
              <input type="text" className="popup__item popup__item_value_title" id="popup__item-title" name="title" placeholder="Название" required minLength="2" maxLength="30" />
              <span className="popup__item-error popup__item-title-error"></span>
              <input type="url" className="popup__item popup__item_value_url" id="popup__item-url" name="url" placeholder="Ссылка на картинку" required />
              <span className="popup__item-error popup__item-url-error"></span>
      </PopupWithForm>
      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
              <input type="url" className="popup__item popup__item_value_avatar" id="popup__item-avatar" name="avatar" placeholder="Фото профиля" required />
              <span className="popup__item-error popup__item-avatar-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
    </div>
  );
}

export default App;
