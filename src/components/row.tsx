import React from 'react';
import { IQuality, IUser } from '../models';

interface RowProps {
  user: IUser;
  onDelete: any;
}

const renderQualities = (arr: IQuality[]) => {
  return arr.map((q) => (
    <span key={q._id} className={'badge m-1 bg-' + q.color}>
      {q.name}
    </span>
  ));
};

const Row = (props: RowProps) => {
  return (
    <tr>
      <th>{props.user.name}</th>
      <th>{renderQualities(props.user.qualities)}</th>
      <th>{props.user.profession.name}</th>
      <th>{props.user.completedMeetings}</th>
      <th>{props.user.rate}/5</th>
      <th>
        <span
          className="btn btn-danger p-2"
          onClick={() => props.onDelete(props.user._id)}
        >
          delete
        </span>
      </th>
    </tr>
  );
};

export default Row;
