import React, { useEffect, useState } from 'react';

import FormComponent, { TextField, SelectField, RadioField, CheckBoxField, MultiSelectField } from '../common/form';

import api from '../../api/index.js';
import { IProffession, IQuality } from '../../models';

import {
  IS_REQUIRED,
  MIN_MAX_LEGTH,
  HAS_SPECIAL_CHARACTER,
  IS_EMAIL,
  HAS_DIGIT,
  HAS_CAPITAL_SYMBOL,
  IS_SET_TRUE,
} from '../../utils/validator';

const RegisterForm = () => {
  // const [data, setData] = useState({
  //   email: '',
  //   password: '',
  //   professionID: '',
  //   sex: '',
  //   qualities: [],
  //   license: false,
  // });

  const [professions, setProfessions] = useState<IProffession[]>([]);
  const [qualities, setQualities] = useState<IQuality[]>([]);
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

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig}>
      <TextField label="Email" name="email" />
      <TextField label="Пароль" type="password" name="password" />
      <SelectField label="Профессия" name="professionID" options={professions} defaultOption="Выбор..." />
      <RadioField
        label="Пол"
        name="sex"
        options={[
          { name: 'М', _id: 'male' },
          { name: 'Ж', _id: 'female' },
        ]}
      />
      <MultiSelectField label="Качества" name="qualities" options={qualities} />
      <CheckBoxField name="license">
        Принять{' '}
        <a role="button" href="">
          соглашение
        </a>
      </CheckBoxField>

      <button className="btn btn-primary w-100 mx-auto" type="submit">
        Submit
      </button>
    </FormComponent>
  );
};

export default RegisterForm;
