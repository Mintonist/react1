import React from 'react';

import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard ';
//import { useUsers } from '../../../hooks/useUsers';
import { CommentsProvider } from '../../../hooks/useComments';
import CommentsBlock from '../../ui/commentsBlock';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/users';

interface UserProps {
  id: string;
}

const UserPage = ({ id: userId }: UserProps) => {
  // const { getUserById } = useUsers();
  // const user = getUserById(userId);
  const user = useSelector(getUserById(userId));

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
