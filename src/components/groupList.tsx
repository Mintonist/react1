import React from 'react';

interface GroupListProps {
  items: Object | Array<Object>;
  selectedID: string;
  valueProperty?: string;
  contentProperty?: string;
  onItemSelect: any;
}

const GroupList = ({
  items,
  selectedID,
  valueProperty = '_id',
  contentProperty = 'name',
  onItemSelect,
}: GroupListProps) => {
  console.dir(items);

  return (
    <ul className="list-group">
      {Array.isArray(items)
        ? items.map((item) => (
            <li
              key={item[valueProperty]}
              role="button"
              className={'list-group-item ' + (item[valueProperty] == selectedID ? ' active' : '')}
              onClick={() => {
                onItemSelect(item[valueProperty]);
              }}
            >
              {item[contentProperty]}
            </li>
          ))
        : Object.keys(items).map((k) => (
            <li
              key={items[k][valueProperty]}
              role="button"
              className={'list-group-item ' + (items[k][valueProperty] == selectedID ? ' active' : '')}
              onClick={() => {
                onItemSelect(items[k][valueProperty]);
              }}
            >
              {items[k][contentProperty]}
            </li>
          ))}
    </ul>
  );
};

export default GroupList;
