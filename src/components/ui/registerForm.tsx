import { useState } from 'react';

import { useHistory } from 'react-router-dom';
import FormComponent, { CheckBoxField, MultiSelectField, RadioField, SelectField, TextField } from '../common/form';

import { useAuth } from '../../hooks/useAuth';
import { useProfessions } from '../../hooks/useProfessions';
import { useQualities } from '../../hooks/useQualities';
import { IS_EMAIL, IS_REQUIRED, IS_SET_TRUE, MIN_MAX_LEGTH } from '../../utils/validator';

const RegisterForm = () => {
  const history = useHistory();
  const [sumbitErrors, setSumbitErrors] = useState({});
  // const [data, setData] = useState({
  //   email: '',
  //   password: '',
  //   professionID: '',
  //   sex: '',
  //   qualities: [],
  //   license: false,
  // });

  const { signUp } = useAuth();

  const { professions } = useProfessions();
  //const [professions, setProfessions] = useState<IProfession[]>([]);

  const { qualities } = useQualities();
  //const [qualities, setQualities] = useState<IQuality[]>([]);

  // useEffect(() => {
  //   // api.professions.fetchAll().then((data) => setProfessions(data));
  //   //api.qualities.fetchAll().then((data) => setQualities(data));
  // }, []);

  const validatorConfig = {
    email: { [IS_REQUIRED]: { message: 'Email пустой' }, [IS_EMAIL]: { message: 'Email не корректный' } },
    password: {
      [IS_REQUIRED]: { message: 'Пароль пустой' },
      [MIN_MAX_LEGTH]: { min: 5, max: 16, message: 'Пароль должен быть от 5 до 16 символов' },
      // [HAS_SPECIAL_CHARACTER]: { message: 'Пароль не содержит спец.символ' },
      // [HAS_DIGIT]: { message: 'Пароль не содержит цифру' },
      // [HAS_CAPITAL_SYMBOL]: { message: 'Пароль не содержит заглавной буквы' },
    },
    profession: { [IS_REQUIRED]: { message: 'Нужно выбрать профессию' } },
    sex: { [IS_REQUIRED]: { message: 'Нужно выбрать пол' } },
    license: { [IS_SET_TRUE]: { message: 'Нужно согласиться' } },
  };

  const handleSubmit = async (data) => {
    const newdata = { ...data, qualities: data.qualities ? data.qualities.map((q) => q.value) : [] };

    console.log('RegisterForm. submit data:', newdata);

    try {
      await signUp(newdata);
      history.push('/');
    } catch (err) {
      console.log('LodinForm. submit error:', err);
      setSumbitErrors(err);
    }
  };

  return (
    //--> почему defaultErrors (например, при повторной регистрации одного и того же email) не отображается в форме?
    <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig} defaultErrors={sumbitErrors}>
      <TextField label="Email" name="email" />
      <TextField label="Пароль" type="password" name="password" />
      <SelectField label="Профессия" name="profession" options={professions} defaultOption="Выбор..." />
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
