import React from 'react';

export default function ImagePopup(props) {
  return (
    <div class={`popup popup-image ${props.isOpen ? 'popup_active' : ''}`}>
        <div class="popup-image__container">
          <button class="popup__close popup-image__close" type="button" onClick={props.onClose}></button>
          <img class="popup-image__content" src={props.card.link} alt={props.card.name} />
          <p class="popup-image__name">{props.card.name}</p>
        </div>
    </div>
  );
}