import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile: FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading ...</div>;
  if (!isAuthenticated || !user) return <div></div>;

  return (
    <div css={{}}>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
