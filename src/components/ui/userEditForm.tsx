import React, { useEffect, useState } from 'react';

import { TextField, SelectField, RadioField, CheckBoxField, MultiSelectField } from '../common/form';
import { useHistory } from 'react-router-dom';
import api from '../../api/index.js';
import { IProffession, IQuality, IUser } from '../../models';

import { validator, IS_REQUIRED, IS_EMAIL } from '../../utils/validator';

interface UserProps {
  id: string;
}
const UserEditForm = ({ id: userId }: UserProps) => {
  const history = useHistory();

  const [data, setData] = useState({
    name: '',
    email: '',
    professionID: '',
    sex: '',
    qualities: [],
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState<IProffession[]>([]);
  const [qualities, setQualities] = useState<IQuality[]>([]);
  const [user, setUser] = useState<IUser>(null);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.users.getById(userId).then((data) => {
      setUser(data);
      setData((prevState) => ({
        ...prevState,
        name: data.name,
        email: data.email,
        sex: data.sex,
        professionID: data.profession._id,
        qualities: data.qualities.map((q) => ({ label: q.name, value: q._id })),
      }));
    });
  }, []);

  const handleChange = (target) => {
    if (target) {
      //--> понять синтаксис квадратных скобок для [target.name] - это налаог образения к полю объекта: obj.name ~ obj["name"]
      setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: { [IS_REQUIRED]: { message: 'Email пустой' }, [IS_EMAIL]: { message: 'Email не корректный' } },
    name: {
      [IS_REQUIRED]: { message: 'Имя пустое' },
    },
    professionID: { [IS_REQUIRED]: { message: 'Нужно выбрать профессию' } },
    sex: { [IS_REQUIRED]: { message: 'Нужно выбрать пол' } },
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

    // сохраняем
    api.users.update(userId, {
      name: data.name,
      email: data.email,
      sex: data.sex,
      profession: professions.find((p) => p._id === data.professionID),
      qualities: qualities.filter((q) => data.qualities.some((qq) => q._id == qq.value)),
    });

    // возвращаемся обратно
    history.push(`/users/${userId}`);
  };

  return (
    <>
      {user && (
        <form className="" onSubmit={handleSubmit}>
          <TextField
            label="Имя"
            type="name"
            name="name"
            value={data.name}
            error={errors['name']}
            onChange={handleChange}
          />
          <TextField label="Email" name="email" value={data.email} error={errors['email']} onChange={handleChange} />

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
              { name: 'М', _id: 'male' },
              { name: 'Ж', _id: 'female' },
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

          <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={Object.keys(errors).length !== 0}>
            Обновить
          </button>
        </form>
      )}
      {user === null && <h2>Loading...</h2>}
      {user === undefined && <h2>{'User with id=' + userId + ' not found.'}</h2>}
    </>
  );
};

export default UserEditForm;
