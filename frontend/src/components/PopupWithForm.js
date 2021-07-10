function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  buttonTitle,
  children,
  onSubmit,
  isDisabled = false
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close'
          aria-label='Кнопка для закрытия'
          onClick={onClose}
        ></button>
        <h2 className='popup__title'>{title}</h2>
        <form
          onSubmit={onSubmit}
          className='popup__form'
          name={`${name}_form`}
          noValidate
        >
          {children}
          <button
            className='popup__save'
            type='submit'
            aria-label='Кнопка Сохранить'
            disabled={isDisabled}
          >
            {buttonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
