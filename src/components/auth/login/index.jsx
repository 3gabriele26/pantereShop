import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useState } from "react";
import SignInwithGoogle from "../../googleAuth";
import newUserIcon from "../../../assets/user.png"
import Header from "../../header"

import '../authentication.css'
import './login.css'


const Login = () => {

    const [email, setEmail] = useState(' ')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(email == "info@panterebaseball.com") {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Admin logged in Successfully");
                window.location.href = "/admin";
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in Successfully");
                window.location.href = "/home";
            }
          
        } catch (error) {
          console.log(error.message);
        }
    };

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit} className="authentication">
                <h2 className="auth-title">Accedi</h2>

                <div className="inputSection">
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="inputSection">
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="forgot-password"><a href=" " className="forgot-passwor-aTag"> Hai dimenticato la password</a></p> 
                </div>

                <div className="buttons">
                    <button type="submit" className="primary-btn"> Accedi </button>
                </div>

                <div className="registration-or-googleSignin">
                    <a className="icon secondary-btn" href="/register"><img src={newUserIcon} className="img-icon"/></a>
                    <SignInwithGoogle/>
                </div>
            </form>
        </>
    )
}

export default Login 

// ricordarsi di impostare un link per la reipostazione della passwrod