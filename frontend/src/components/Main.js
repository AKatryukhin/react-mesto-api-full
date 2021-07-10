import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Preloader from './Preloader';

function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  isCardsLoading,
  isCardsError,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content container'>
      <section className='profile content__profile container'>
        <div className='profile__avatar' onClick={onEditAvatar}>
          <img
            className='profile__image'
            src={currentUser.avatar}
            alt='Картинка Аватар'
          />
        </div>
        <div className='profile__info'>
          <div className='profile__editcase'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              type='button'
              className='profile__edit'
              aria-label='Кнопка открытия окна редактирования профиля'
              onClick={onEditProfile}
            ></button>
          </div>
          <p className='profile__job'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add'
          type='button'
          aria-label='Кнопка добавления фото'
          onClick={onAddPlace}
        ></button>
      </section>
      <section className='galery content__galery' aria-label='Фото мест'>
        {isCardsLoading && <Preloader />}

        {!isCardsLoading &&
          !isCardsError &&
          cards.map((card) => {
            return (
              <Card
                key={card._id}
                onCardClick={onCardClick}
                card={card}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                isCardsError={isCardsError}
              />
            );
          })}
      </section>
    </main>
  );
}

export default Main;
