import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

import googleImg from "../../assets/google.png"
import './googleAuth.css'


function SignInwithGoogle() {

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        
        window.location.href = "/home";
      }
    });
  }
  return (
    <div className="icon" onClick={googleLogin}>
      <div className="logo-div">
        <img src={googleImg} className="img-icon"/>
      </div>
    </div>
  );
}
export default SignInwithGoogle;