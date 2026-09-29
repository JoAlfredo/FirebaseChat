
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup , getRedirectResult  } from 'firebase/auth';

//Log In authentification
const SignIn = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  getRedirectResult(auth)
    .then((result) => {
      console.log("REDIRECT RESULT:", result);

      if (result) {
        console.log("USER:", result.user);
      }
    })
    .catch((error) => {
      console.error("REDIRECT ERROR:", error);
    });

  return (
    <>
      <button
        className='btn-login'
        onClick={googleSignIn}
      >
        <i className="fa-brands fa-google"></i>
        Sign in with Google
      </button>
    </>
  );
}

export default SignIn;