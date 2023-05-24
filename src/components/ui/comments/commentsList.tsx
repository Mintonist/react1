import React from 'react';
import { IComment } from '../../../models';
import CommentItem from './commentItem';

interface CommentListProps {
  comments: Array<IComment>;
  onRemove: any;
}

const CommentsList = ({ comments, onRemove }: CommentListProps) => {
  return <>{comments && comments.map((q) => <CommentItem key={q._id} comment={q} onRemove={onRemove} />)}</>;
};

export default CommentsList;
