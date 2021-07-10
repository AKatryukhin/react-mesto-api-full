import React from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation.js';

const Register = ({ handleRegister }) => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid &&
      handleRegister({ email, password }, () => {
        setValues({});
      });
  };

  return (
    <section className='sign'>
      <h2 className='sign__title'>Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className='sign__form'
        name='sign_form'
        noValidate
      >
        <input
          type='email'
          className='sign__input'
          id='email'
          name='email'
          required
          minLength='2'
          maxLength='20'
          placeholder='Email'
          title='Доменная часть адреса электронной почты указана неверно (часть после @).'
          pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
          value={email || ''}
          onChange={handleChange}
        />
        <span className='sign__input-error'>{errors.email}</span>
        <input
          type='password'
          className='sign__input'
          id='password'
          name='password'
          required
          minLength='6'
          maxLength='20'
          placeholder='Пароль'
          pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$'
          title='Пожалуйста, укажите по крайней мере 1 заглавный символ, 1 строчный символ и 1 число.'
          value={password || ''}
          onChange={handleChange}
        />
        <span className='sign__input-error'>{errors.password}</span>
        <button
          className='sign__submit'
          type='submit'
          aria-label='Кнопка отправить'
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <Link className='sign__link' to='/signin'>
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
};

export default Register;
