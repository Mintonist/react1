import React from 'react';

interface CounterProps {
  id: number;
  value: number;
  name: string;
  onDelete: any;
  onIncrement: any;
  onDecrement: any;
}

//--> почему нельзя вызывать setCount внутри этой функции, а только асинхронно?
//--> почему нельзя не использовать setCount - иначе ошибка
//--> почему нельзя не использовать импортируемые методы?
//-> где происходит связь типов из models.ts и объектов из API?
const Counter = (props: CounterProps) => {
  //let [value, setValue] = useState(props.value);
  let value: number = props.value;

  const formatValue = () => (value == 0 ? 'Empty' : value);
  const getBageClasses = () =>
    'badge p-2 m-2 ' + (value != 0 ? 'bg-primary' : 'bg-warning');

  // const handleIncrement = () => {
  //   value++;
  // }; //setValue(value + 1);
  // const handleDecrement = () => {
  //   if (value > 0) {
  //     value--;
  //     //setValue(value - 1);
  //   }
  // };

  return (
    <div>
      {/* <ul>{renderTags()}</ul> */}
      <span>{props.name}</span>
      <span className={getBageClasses()}>{formatValue()}</span>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={() => {
          props.onIncrement(props.id);
        }}
      >
        +
      </button>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={() => {
          props.onDecrement(props.id);
        }}
      >
        -
      </button>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Counter;
