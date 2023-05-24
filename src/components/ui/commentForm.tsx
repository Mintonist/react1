import React, { useEffect, useRef, useState } from 'react';
import TextField from '../common/form/textField';
import { SelectField } from '../common/form';
import { IUser } from '../../models';
import { validator, IS_REQUIRED, MIN_MAX_LEGTH } from '../../utils/validator';

interface FormProps {
  authors: IUser[];
  onAddComment: any;
}

const CommentForm = ({ authors, onAddComment }: FormProps) => {
  const [data, setData] = useState({ author: '', content: '' });
  const [errors, setErrors] = useState({});

  let submitAmount = useRef(0);
  useEffect(() => {
    if (submitAmount.current > 0) validate();
  }, [data]);

  const validatorConfig = {
    author: { [IS_REQUIRED]: { message: 'Автор не указан' } },
    content: {
      [IS_REQUIRED]: { message: 'Пустое сообщение' },
      [MIN_MAX_LEGTH]: { max: 100, message: 'Слишком длинное сообщение (можно до 100 симовлов)' },
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

    submitAmount.current++;

    validate();
    // если есть ошибки валидации
    if (!validate()) return;

    submitAmount.current = 0;

    onAddComment(data.author, data.content);
    setData({ author: '', content: '' });
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <SelectField
        label="Автор"
        name="author"
        value={data.author}
        options={authors}
        defaultOption="Выбор автора..."
        error={errors['author']}
        onChange={handleChange}
      ></SelectField>
      <TextField
        label="Сообщение"
        name="content"
        rows={3}
        value={data.content}
        error={errors['content']}
        onChange={handleChange}
      />
      <div className="d-flex flex-end">
        <button className="btn btn-primary ms-auto" type="submit" disabled={Object.keys(errors).length !== 0}>
          Опубликовать
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
