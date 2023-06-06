import React, { useEffect, useState } from 'react';

import FormComponent, { TextField, SelectField, RadioField, MultiSelectField } from '../common/form';
import { useHistory } from 'react-router-dom';
import api from '../../api/index.js';
import { IProfession, IQuality, IUser } from '../../models';

import { IS_REQUIRED, IS_EMAIL } from '../../utils/validator';
import { useUsers } from '../../hooks/useUsers';
import { useProfessions } from '../../hooks/useProfessions';
import { useQualities } from '../../hooks/useQualities';

interface UserProps {
  id: string;
}
const UserEditForm = ({ id: userId }: UserProps) => {
  const history = useHistory();

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   professionID: '',
  //   sex: '',
  //   qualities: [],
  // });

  const { getUser, updateUser } = useUsers();
  //const [user, setUser] = useState<IUser>(null);
  const user = getUser(userId);

  const { professions } = useProfessions();
  // const [professions, setProfessions] = useState<IProfession[]>([]);

  const { qualities } = useQualities();
  // const [qualities, setQualities] = useState<IQuality[]>([]);

  const formData = {
    name: user.name,
    email: user.email,
    sex: user.sex,
    professionID: user.profession._id,
    qualities: user.qualities.map((q) => ({ label: q.name, value: q._id })),
  };

  // setFormData((prevState) => ({
  //   ...prevState,
  //   name: user.name,
  //   email: user.email,
  //   sex: user.sex,
  //   professionID: user.profession._id,
  //   qualities: user.qualities.map((q) => ({ label: q.name, value: q._id })),
  // }));

  // useEffect(() => {
  //   //api.professions.fetchAll().then((data) => setProfessions(data));
  //   //api.qualities.fetchAll().then((data) => setQualities(data));
  //   // api.users.getById(userId).then((data) => {
  //   //  // setUser(data);
  //   //   setFormData((prevState) => ({
  //   //     ...prevState,
  //   //     name: data.name,
  //   //     email: data.email,
  //   //     sex: data.sex,
  //   //     professionID: data.profession._id,
  //   //     qualities: data.qualities.map((q) => ({ label: q.name, value: q._id })),
  //   //   }));
  //   //});
  // }, []);

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
    // api.users.update(userId, {
    //   name: data.name,
    //   email: data.email,
    //   sex: data.sex,
    //   profession: professions.find((p) => p._id === data.professionID),
    //   qualities: qualities.filter((q) => data.qualities.some((qq) => q._id == qq.value)),
    // });
    updateUser(userId, {
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
        <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig} defaultData={formData}>
          <TextField label="Имя" type="name" name="name" autoFocus />
          <TextField label="Email" name="email" value={formData.email} />

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
