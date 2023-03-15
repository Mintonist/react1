import React from 'react';

interface StatusProps {
  amount: number;
}

const declOfNum = (
  num: number,
  titles: Array<string>,
  insertValue: Boolean = false
) => {
  const cases = [2, 0, 1, 1, 1, 2];
  let res: string =
    titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]];
  if (insertValue) {
    res = num + ' ' + res;
  }
  return res;
};

const getMessage = (amount: number) => {
  return amount == 0
    ? 'никого здесь нет!'
    : declOfNum(amount, ['человек', 'человека', 'человек'], true) +
        (amount == 1 ? ' вступил в секту' : ' вступили в секту');
};

const SearchStatus = ({ amount }: StatusProps) => {
  return (
    <p
      className={'badge ' + (amount ? 'bg-primary' : 'bg-danger') + ' m-2 p-2'}
    >
      {getMessage(amount)}
    </p>
  );
};

export default SearchStatus;
