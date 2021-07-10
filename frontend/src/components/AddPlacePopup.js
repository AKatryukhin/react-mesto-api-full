import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormAndValidation from '../hooks/useFormAndValidation.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSending }) {
  const { values, handleChange, resetForm, errors, isValid} =
    useFormAndValidation();

  const { name, link } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid &&
      onAddPlace({ name, link }, () => {
        resetForm();
      });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='place_form'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      buttonTitle={isSending ? "Создание..." : "Создать" }
      isDisabled={!isValid || isSending}
    >
      <fieldset className='popup__fild'>
        <input
          type='text'
          className='popup__input popup__input_type_name'
          id='place-input'
          name='name'
          placeholder='Название'
          required
          minLength='2'
          maxLength='30'
          onChange={handleChange}
          value={name || ''}
        />
        <span className='popup__input-error place-input-error'>
          {errors.name}
        </span>
        <input
          type='url'
          pattern="^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,})?(?:[\/?#]\S*)?$"
          className='popup__input popup__input_type_descr'
          id='link-input'
          name='link'
          placeholder='Ссылка на картинку'
          required
          onChange={handleChange}
          value={link ? link : ''}
        />
        <span className='popup__input-error link-input-error'>
          {errors.link}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
