import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import apiExemplar from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    apiExemplar.getProfileInfo()
    .then((res) => {
      setCurrentUser(res)
    })
    .catch((err) => {
      console.log(err); 
    }); 

    apiExemplar.getInitialCards()
    .then((res) => {
      setCards(res)
    })
    .catch((err) => {
      console.log(err); 
    }); 
  }, [])
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    apiExemplar.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleCardDelete(card) {
    apiExemplar.deleteCard(card._id)
      .then(() => {
          setCards((cards) => cards.filter((c) => c._id !== card._id ));
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleUpdateUser({name, about}) {
    apiExemplar.setProfileInfo({name, about})
    .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch((err) => {
      console.log(err); 
    });
  }
 
  function handleUpdateAvatar({avatar}) {
    apiExemplar.getNewAvatar(avatar)
    .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch((err) => {
      console.log(err); 
    });
  } 

  function handleAddCard({title, link}) {
    apiExemplar.getNewCard({title, link})
    .then((res) => {
      setCards((cards) => [res, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err); 
    });
  } 

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
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddCard} />
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}  />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
