import React, { useEffect, useState } from 'react';

import { TextField, SelectField, RadioField, CheckBoxField } from '../common/form';

import api from '../../api/index.js';
import { IProffession, IQuality } from '../../models';

import {
  validator,
  IS_REQUIRED,
  MIN_MAX_LEGTH,
  HAS_SPECIAL_CHARACTER,
  IS_EMAIL,
  HAS_DIGIT,
  HAS_CAPITAL_SYMBOL,
  IS_SET_TRUE,
} from '../../utils/validator';
import MultiSelectField from '../common/form/multiSelectField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    professionID: '',
    sex: '',
    qualities: [],
    license: false,
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState<IProffession[]>([]);
  const [qualities, setQualities] = useState<IQuality[]>([]);

  const handleChange = (target) => {
    if (target) {
      //--> понять синтаксис квадратных скобок для [target.name] - это налаог образения к полю объекта: obj.name ~ obj["name"]
      setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const validatorConfig = {
    email: { [IS_REQUIRED]: { message: 'Email пустой' }, [IS_EMAIL]: { message: 'Email не корректный' } },
    password: {
      [IS_REQUIRED]: { message: 'Пароль пустой' },
      [MIN_MAX_LEGTH]: { min: 8, max: 16, message: 'Пароль должен быть от 8 до 16 символов' },
      [HAS_SPECIAL_CHARACTER]: { message: 'Пароль не содержит спец.символ' },
      [HAS_DIGIT]: { message: 'Пароль не содержит цифру' },
      [HAS_CAPITAL_SYMBOL]: { message: 'Пароль не содержит заглавной буквы' },
    },
    professionID: { [IS_REQUIRED]: { message: 'Нужно выбрать профессию' } },
    sex: { [IS_REQUIRED]: { message: 'Нужно выбрать пол' } },
    license: { [IS_SET_TRUE]: { message: 'Нужно согласиться' } },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);

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
      <SelectField
        label="Профессия"
        name="professionID"
        value={data.professionID}
        options={professions}
        defaultOption="Выбор..."
        error={errors['professionID']}
        onChange={handleChange}
      />
      <RadioField
        label="Пол"
        name="sex"
        value={data.sex}
        options={[
          { name: 'М', _id: '1' },
          { name: 'Ж', _id: '2' },
        ]}
        error={errors['sex']}
        onChange={handleChange}
      />
      <MultiSelectField
        label="Качества"
        name="qualities"
        value={data.qualities}
        options={qualities}
        error={errors['qualities']}
        onChange={handleChange}
      />
      <CheckBoxField name="license" value={data.license} error={errors['license']} onChange={handleChange}>
        Принять <a role="button">соглашение</a>
      </CheckBoxField>

      <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={Object.keys(errors).length !== 0}>
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
