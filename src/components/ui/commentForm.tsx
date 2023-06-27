import React from 'react';
import FormComponent, { TextField } from '../common/form';
import { IS_REQUIRED, MIN_MAX_LEGTH } from '../../utils/validator';

interface FormProps {
  //authors: IUser[];
  onAddComment: any;
}

const CommentForm = ({ onAddComment }: FormProps) => {
  //const [data, setData] = useState({ author: '', content: '' });

  const validatorConfig = {
    // author: { [IS_REQUIRED]: { message: 'Автор не указан' } },
    content: {
      [IS_REQUIRED]: { message: 'Пустое сообщение' },
      [MIN_MAX_LEGTH]: { max: 100, message: 'Слишком длинное сообщение (можно до 100 симовлов)' },
    },
  };

  const handleSubmit = (data) => {
    onAddComment(data.content);
    // setData({ author: '', content: '' });
  };

  return (
    <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig} autoClear>
      {/* <SelectField label="Автор" name="author" options={authors} defaultOption="Выбор автора..."></SelectField> */}
      <TextField label="Сообщение" name="content" rows={3} />
      <div className="d-flex flex-end">
        <button className="btn btn-primary ms-auto" type="submit">
          Опубликовать
        </button>
      </div>
    </FormComponent>
  );
};

export default CommentForm;
