import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = ({ redirect, title }) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: redirect,
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <button className="btn secondary" onClick={handleSignUp}>
      Sign Up ({title})
    </button>
  );
};

export default SignupButton;
