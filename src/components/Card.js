import React from 'react';

export default function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <div className="photo__item">
      <img className="photo__img" style={{ backgroundImage: `url(${props.link})` }} onClick={handleClick} />
      <button className="photo__button-delete"></button>
      <div className="photo__text">
        <h2 className="photo__name">{props.name}</h2>
        <div className="photo__fame">
          <button className="photo__heart" type="button"></button>
          <span className="photo__number-like">{props.likes}</span>
        </div>
      </div>
    </div>)
}