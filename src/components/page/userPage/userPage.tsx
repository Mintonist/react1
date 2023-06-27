import React, { useEffect, useState } from 'react';

import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard ';
import { useUsers } from '../../../hooks/useUsers';
import { CommentsProvider, useComments } from '../../../hooks/useComments';
import CommentsBlock from '../../ui/commentsBlock';

interface UserProps {
  id: string;
}

const UserPage = ({ id: userId }: UserProps) => {
  const { getUser } = useUsers();
  const user = getUser(userId);

  // const [user, setUser] = useState<IUser>(null);
  // const [authors, setAuthors] = useState<IUser[]>([]);

  // const params = useParams();
  // const { userId } = params;

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
            <CommentsProvider>
              <CommentsBlock userId={userId} />
            </CommentsProvider>
          </div>
        </div>
      )}
      {user === null && <h2>Loading...</h2>}
      {user === undefined && <h2>{'User with id=' + userId + ' not found.'}</h2>}
    </>
  );
};

export default UserPage;
