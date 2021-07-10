function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image ${card && 'popup_opened'}`}>
      <div className='popup__container-image'>
        <button
          type='button'
          className='popup__close popup__close_type_image'
          aria-label='Кнопка для закрытия окна'
          onClick={onClose}
        ></button>
        <figure className='popup__element-image'>
          <img
            // короткая проверка, знак вопроса перед точкой защищает от null и undefined
            src={card?.link}
            alt={card?.name}
            className='popup__image'
          />
          <figcaption className='popup__title-image'>
            <h2 className='popup__name-image'>{card ? card.name : ''}</h2>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
export default ImagePopup;
