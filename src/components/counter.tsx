import React, { useState } from 'react';

const Counter = () => {
  //--> почему нельзя вызывать setCount внутри этой функции, а только асинхронно?
  //--> почему нельзя не использовать setCount - иначе ошибка
  //--> почему нельзя не использовать импортируемые методы?
  let [count, setCount] = useState(0);
  const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);
  const formatCount = () => (count == 0 ? 'Empty' : count);
  const getBageClasses = () =>
    'badge m-2 ' + (count != 0 ? 'bg-primary' : 'bg-warning');

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleTagChange = (id: string) =>
    setTags((prevState) => prevState.filter((tag) => tag !== id));

  const renderTags = () => {
    return (
      tags.length !== 0 &&
      tags.map((tag) => (
        <li
          key={tag}
          className="btn btn-primary btn-sm m-2"
          onClick={() => handleTagChange(tag)}
        >
          {tag}
        </li>
      ))
    );
  };

  return (
    <>
      <ul>{renderTags()}</ul>
      <span className={getBageClasses()}>{formatCount()}</span>
      <button className="btn btn-primary btn-sm m-2" onClick={handleIncrement}>
        +
      </button>
      <button className="btn btn-primary btn-sm m-2" onClick={handleDecrement}>
        -
      </button>
    </>
  );
};

export default Counter;
