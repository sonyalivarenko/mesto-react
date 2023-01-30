import {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main(props) {

  const currentUser = useContext(CurrentUserContext);
  
  return (
    <div className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__photo" onClick = {props.isEditAvatarPopupOpen}>
              <img className="profile__img" alt="Твоя аватарка" src={currentUser.avatar} />
            </div>
            <div className="profile__id">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__job">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__button" type="button" onClick={props.isAddPlacePopupOpen}></button>
        </section>
        <div className="photo">
          {props.cards.map((card) =>
            <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} /* onCardDelete={props.onCardDelete} */ onCardDeletePopup={props.isDeleteCardPopupOpen} setCard={props.setCard} />
          )} 
        </div>
    </div>
  );
}