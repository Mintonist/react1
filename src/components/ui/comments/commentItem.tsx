import React, { useEffect, useState } from 'react';
import { IComment, IUser } from '../../../models';
import { getAvatarUrl } from '../../../utils/avatarUrl';
import { getTimeStraing } from '../../../utils/formatTime';
import api from '../../../api/index.js';
import { useHistory } from 'react-router-dom';
import { useUsers } from '../../../hooks/useUsers';

interface CommentItemProps {
  // author: IUser;
  comment: IComment;
  onRemove: any;
}

const CommentItem = ({ comment, onRemove }: CommentItemProps) => {
  //const [author, setAuthor] = useState<IUser>(null);
  const history = useHistory();
  // const params = useParams();
  // const { userId } = params;

  const { getUser } = useUsers();
  const author = getUser(comment.userId);

  // useEffect(() => {
  //   api.users.getById(comment.userId).then((data) => {
  //     setAuthor(data);
  //   });
  // }, []);

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            {author && (
              <img
                src={getAvatarUrl(author)}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
            )}
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    <span
                      role="button"
                      onClick={() => {
                        console.log(`/users/${author._id}`);
                        history.replace(`/users/${author._id}`);
                      }}
                    >
                      {author && author.name}
                    </span>
                    <span className="small ps-4">{getTimeStraing(comment.created_at)}</span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onRemove(comment)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;