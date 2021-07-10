import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete, isCardsError }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `photo__trash ${
    isOwn ? 'photo__trash_type_visible' : ''
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo__like ${
    isLiked ? 'photo__like_type_active' : ''
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className='photo'>
      <figure className='photo__element'>
        <button
          className={cardDeleteButtonClassName}
          type='button'
          aria-label='Кнопка для Удаления'
          onClick={handleDeleteClick}
        />
        <img
          src={card.link}
          alt={card.name}
          className='photo__image'
          onClick={handleClick}
        />
        <figcaption className='photo__title'>
          <h2 className='photo__name'>
            {isCardsError ? isCardsError : card.name}
          </h2>
          <div className='photo__like-container'>
            <button
              className={cardLikeButtonClassName}
              type='button'
              aria-label='Кнопка для Лайков'
              onClick={handleLikeClick}
            />
            <p className='photo__like-total'>{card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </article>
  );
}
export default Card;
