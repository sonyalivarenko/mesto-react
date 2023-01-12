import {useEffect, useState} from 'react';
import apiExemplar from '../utils/Api';
import Card from './Card';

export default function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([apiExemplar.getInitialCards(), apiExemplar.getProfileInfo()])
      .then(([cards, profileInfo]) => {
        setUserAvatar(profileInfo.avatar);
        setUserDescription(profileInfo.about);
        setUserName(profileInfo.name);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err); 
      }); 
  }, [])

  return (
    <div className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__photo" onClick = {props.isEditAvatarPopupOpen}>
              <img className="profile__img" alt="Твоя аватарка" src={userAvatar} />
            </div>
            <div className="profile__id">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__job">{userDescription}</p>
            </div>
          </div>
          <button className="profile__button" type="button" onClick={props.isAddPlacePopupOpen}></button>
        </section>
        <div className="photo">
          {cards.map((card) =>
            <Card key={card._id} link={card.link} name={card.name} likes={card.likes.length} onCardClick={props.onCardClick} card={card} />
          )} 
        </div>
    </div>
  );
}