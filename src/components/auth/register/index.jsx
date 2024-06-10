import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

import '../authentication.css'
import './register.css'
import Header from "../../header";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo:""
        });
      }

      console.log("User Registered Successfully!!");
      window.location.href = "/home";
      
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <>
        <Header />

        <form onSubmit={handleRegister} className="authentication">
            <h2 className="auth-title">Registrati</h2>

            <div className="inputSection">
                <input
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => setFname(e.target.value)}
                required
                />
            </div>

            <div className="inputSection">
                <input
                type="text"
                className="form-control"
                placeholder="Cognome"
                onChange={(e) => setLname(e.target.value)}
                />
            </div>

            <div className="inputSection">
                <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div className="inputSection">
                <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            <div className="form-btn">
                <button type="submit" className="primary-btn"> Registrati </button>
            </div>
            
            <p className="forgot-password">
                Sei gia registrato,  <a href="/login">Accedi</a>
            </p>
        </form>
    </>
  );
}
export default Register;