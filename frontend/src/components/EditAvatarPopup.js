import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormAndValidation from '../hooks/useFormAndValidation.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSending }) {
  const inputRef = React.useRef();
  const { values, handleChange, errors,  isValid, resetForm } = useFormAndValidation();

  const { link } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid &&
      onUpdateAvatar(
        {
          avatar: inputRef.current.value,
        },
        () => {
          resetForm();
        }
      );
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='avatar_form'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      buttonTitle={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid || isSending}
    >
      <fieldset className='popup__fild'>
        <input
          ref={inputRef}
          type='url'
          pattern="^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,})?(?:[\/?#]\S*)?$"
          className='popup__input popup__input_type_descr popup__input-avatar'
          id='avatar-link-input'
          name='link'
          value={link || ''}
          placeholder='Ссылка на аватар'
          required
          onChange={handleChange}
        />
        <span className='popup__input-error avatar-link-input-error'>
          {errors.link}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
