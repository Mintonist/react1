import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import {
  validator,
  IS_REQUIRED,
  MIN_MAX_LEGTH,
  HAS_SPECIAL_CHARACTER,
  IS_EMAIL,
  HAS_DIGIT,
  HAS_CAPITAL_SYMBOL,
} from '../utils/validator';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

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

  const handleChange = ({ target }) => {
    //--> понять синтаксис квадратных скобок для [target.name] - это налаог образения к полю объекта: obj.name ~ obj["name"]
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
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
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={Object.keys(errors).length !== 0}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
