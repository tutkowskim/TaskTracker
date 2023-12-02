import { FC } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

const App: FC = () => {
  return (
    <div>
      <div>React App</div>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
};

export default App;
