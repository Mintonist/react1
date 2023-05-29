import React, { useEffect, useState } from 'react';

import FormComponent, { TextField, SelectField, RadioField, MultiSelectField } from '../common/form';
import { useHistory } from 'react-router-dom';
import api from '../../api/index.js';
import { IProffession, IQuality, IUser } from '../../models';

import { IS_REQUIRED, IS_EMAIL } from '../../utils/validator';

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

  const validatorConfig = {
    email: { [IS_REQUIRED]: { message: 'Email пустой' }, [IS_EMAIL]: { message: 'Email не корректный' } },
    name: {
      [IS_REQUIRED]: { message: 'Имя пустое' },
    },
    professionID: { [IS_REQUIRED]: { message: 'Нужно выбрать профессию' } },
    sex: { [IS_REQUIRED]: { message: 'Нужно выбрать пол' } },
  };

  const handleSubmit = (data) => {
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
        <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig} defaultData={data}>
          <TextField label="Имя" type="name" name="name" autoFocus />
          <TextField label="Email" name="email" value={data.email} />

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

          <button className="btn btn-primary w-100 mx-auto" type="submit">
            Обновить
          </button>
        </FormComponent>
      )}
      {user === null && <h2>Loading...</h2>}
      {user === undefined && <h2>{'User with id=' + userId + ' not found.'}</h2>}
    </>
  );
};

export default UserEditForm;
