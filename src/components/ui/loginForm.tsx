import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormComponent, { TextField, CheckBoxField } from '../common/form';
import {
  IS_REQUIRED,
  MIN_MAX_LEGTH,
  HAS_SPECIAL_CHARACTER,
  IS_EMAIL,
  HAS_DIGIT,
  HAS_CAPITAL_SYMBOL,
} from '../../utils/validator';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError, login } from '../../store/users';
//import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const dispatch: any = useDispatch();
  const history = useHistory();
  const [sumbitErrors, setSumbitErrors] = useState({});

  const loginError = useSelector(getAuthError());
  //const { login } = useAuth();

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
      // [HAS_SPECIAL_CHARACTER]: { message: 'Пароль не содержит спец.символ' },
      // [HAS_DIGIT]: { message: 'Пароль не содержит цифру' },
      // [HAS_CAPITAL_SYMBOL]: { message: 'Пароль не содержит заглавной буквы' },
    },
  };

  const handleSubmit = async (data) => {
    console.log('LoginForm. submit data:', data);

    try {
      //await login(data);
      dispatch(login(data));
      console.log(history.location.state);
      history.push(
        history.location.state && history.location.state.from && history.location.state.from.pathname
          ? history.location.state.from.pathname
          : '/'
      );
    } catch (err) {
      console.log('LodinForm. submit error:', err);
      setSumbitErrors(err);
    }
  };

  return (
    //--> почему defaultErrors (например, при ошибочном email) не отображается в форме?
    <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig} defaultErrors={sumbitErrors}>
      <TextField label="Email" name="email" />
      <TextField label="Пароль" type="password" name="password" />
      <CheckBoxField name="stayOn">Оставаться в системе</CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button className="btn btn-primary w-100 mx-auto" type="submit">
        Submit
      </button>
    </FormComponent>
  );
};

export default LoginForm;
