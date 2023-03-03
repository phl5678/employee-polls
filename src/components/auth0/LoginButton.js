import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = ({ redirect, title }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: redirect,
      },
    });
  };

  return (
    <button className="btn" onClick={handleLogin}>
      Log In ({title})
    </button>
  );
};

export default LoginButton;
