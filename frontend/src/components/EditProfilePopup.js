import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { name, description } = values;

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || '',
        description: currentUser.about || '',
      });
    }
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    isValid &&
      onUpdateUser({
        name: name,
        about: description,
      });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='prof_form'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      buttonTitle={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid || isSending}
    >
      <fieldset className='popup__fild'>
        <input
          type='text'
          className='popup__input popup__input_type_name'
          id='name-input'
          name='name'
          required
          minLength='2'
          maxLength='40'
          placeholder='имя'
          value={name || ''}
          onChange={handleChange}
        />
        <span className='popup__input-error name-input-error'>
          {errors.name}
        </span>
        <input
          type='text'
          className='popup__input popup__input_type_descr'
          id='about-input'
          name='description'
          required
          minLength='2'
          maxLength='200'
          placeholder='описание'
          value={description || ''}
          onChange={handleChange}
        />
        <span className='popup__input-error name-input-error'>
          {errors.description}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
