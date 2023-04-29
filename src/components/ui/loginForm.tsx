import React, { useEffect, useState } from 'react';

import TextField from '../common/form/textField';
//import * as yup from 'yup';

import {
  validator,
  IS_REQUIRED,
  MIN_MAX_LEGTH,
  HAS_SPECIAL_CHARACTER,
  IS_EMAIL,
  HAS_DIGIT,
  HAS_CAPITAL_SYMBOL,
} from '../../utils/validator';
import { CheckBoxField } from '../common/form';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  // const validateSchema = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required('Пароль пустой')
  //     .matches(/^(?=.*[A-Z])/, 'Пароль не содержит заглавной буквы')
  //     .matches(/^(?=.*[0-9])/, 'Пароль не содержит цифру')
  //     .matches(/^(?=.*[!@%^&])/, 'Пароль не содержит спец.символ !@%^&')
  //     .matches(/(?=.{8,16})/, 'Пароль должен быть от 8 до 16 символов'),
  //   email: yup.string().required('Email пустой').email('Email не корректный'),
  // });

  const validatorConfig = {
    email: { [IS_REQUIRED]: { message: 'Email пустой' }, [IS_EMAIL]: { message: 'Email не корректный' } },
    password: {
      [IS_REQUIRED]: { message: 'Пароль пустой' },
      [MIN_MAX_LEGTH]: { min: 8, max: 16, message: 'Пароль должен быть от 8 до 16 символов' },
      [HAS_SPECIAL_CHARACTER]: { message: 'Пароль не содержит спец.символ' },
      [HAS_DIGIT]: { message: 'Пароль не содержит цифру' },
      [HAS_CAPITAL_SYMBOL]: { message: 'Пароль не содержит заглавной буквы' },
    },
  };

  const handleChange = (target) => {
    if (target) {
      //--> понять синтаксис квадратных скобок для [target.name] - это налаог образения к полю объекта: obj.name ~ obj["name"]
      setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    }
  };

  const validate = () => {
    // валидация вручную
    const errors = validator(data, validatorConfig);
    setErrors(errors);

    // валидация через yup
    // validateSchema
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }));

    // true - если нет ошибок
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate();
    // если есть ошибки валидации
    if (!validate()) return;

    console.log(data);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <TextField label="Email" name="email" value={data.email} error={errors['email']} onChange={handleChange} />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        error={errors['password']}
        onChange={handleChange}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>

      <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={Object.keys(errors).length !== 0}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
