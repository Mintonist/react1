import React, { useState } from 'react';
import Counter from './counter';

const CounterList = () => {
  const initialState = [
    { id: 0, value: 1, name: 'Ненужная вещь' },
    { id: 1, value: 2, name: 'Ложка' },
    { id: 2, value: 3, name: 'Вилка' },
    { id: 3, value: 4, name: 'Тарелка' },
    { id: 4, value: 0, name: 'Набор минималиста' },
  ];
  const [arr, setArr] = useState(initialState);

  const handleDelete = (id: number) => {
    setArr((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handleIncrement = (id: number) => {
    setArr((prevState) => {
      prevState.forEach((el) => (el.id == id ? el.value++ : {}));
      return prevState.concat([]);
    });
    //initialState.forEach((el) => (el.id == id ? el.value++ : {}));
  };

  const handleDecrement = (id: number) => {
    setArr((prevState) => {
      prevState.forEach((el) =>
        el.id == id && el.value > 0 ? el.value-- : {}
      );
      return prevState.concat([]);
    });

    // initialState.forEach((el) =>
    //   el.id == id && el.value > 0 ? el.value-- : {}
    // );
  };

  //--> почему так не работает? а handleDelete работает. там и там новый массив (из-за concat() ссылка изменилась) - должно быть всё перерисовано
  const handleReset = () => {
    setArr(initialState.concat([]));
  };

  return (
    <>
      {arr.map((c) => (
        <Counter
          key={c.id}
          {...c}
          //   id={c.id}
          //   value={c.value}
          //   name={c.name}
          onDelete={handleDelete}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        ></Counter>
      ))}
      <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
        Сброс
      </button>
    </>
  );
};

export default CounterList;
