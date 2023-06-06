import React, { useEffect, useState } from 'react';

import { IComment, IUser } from '../../../models';
import api from '../../../api/index.js';

import CommentsList from '../../ui/comments';
import CommentForm from '../../ui/commentForm';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard ';
import { useUsers } from '../../../hooks/useUsers';

interface UserProps {
  id: string;
}

const UserPage = ({ id: userId }: UserProps) => {
  const { users: authors, getUser } = useUsers();
  const user = getUser(userId);
  // const [user, setUser] = useState<IUser>(null);
  // const [authors, setAuthors] = useState<IUser[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);

  // const params = useParams();
  // const { userId } = params;

  useEffect(() => {
    // api.users.getById(userId).then((data) => {
    //   setUser(data);
    // });
    // api.users.fetchAll().then((data) => {
    //   setAuthors(data);
    // });
    api.comments.fetchCommentsForUser(userId).then((data) => {
      data.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        else if (a.created_at < b.created_at) return 1;
        else return 0;
      });
      setComments(data);
    });
  }, []);

  const handleRemoveComment = (c: IComment) => {
    api.comments.remove(c._id).then((data) => {
      setComments(comments.filter((x) => x._id !== c._id));
    });
  };

  const handleAddComment = (authorId: string, content: string) => {
    //console.log(authorId, content);
    api.comments.add({ userId: authorId, pageId: userId, content: content }).then((data) => {
      setComments(comments.concat([data]));
    });
  };

  return (
    <>
      {user && (
        <div className="container mt-3">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user}></UserCard>
              <QualitiesCard qualities={user.qualities}></QualitiesCard>
              <MeetingsCard amount={user.completedMeetings}></MeetingsCard>
            </div>
            <div className="col-md-8">
              <div className="card mb-2">
                <div className="card-body">
                  <div>
                    <h2>New comment</h2>
                    <CommentForm authors={authors} onAddComment={handleAddComment}></CommentForm>
                  </div>
                </div>
              </div>

              {comments && comments.length > 0 && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    <CommentsList comments={comments} onRemove={handleRemoveComment} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {user === null && <h2>Loading...</h2>}
      {user === undefined && <h2>{'User with id=' + userId + ' not found.'}</h2>}
    </>
  );
};

export default UserPage;
