import Login from "./components/auth/login"
import Register from "./components/auth/register"
import Home from "./components/home";
import PageNotFound from "./components/pageNotFound";
import './App.css'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import Cart from "./components/cart";
import Admin from "./components/admin";



function App() {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user.email == "info@panterebaseball.com") {
        setAdmin(user)
      } else {
        setUser(user)
      }
    });
  });

  
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={ user ? <Home /> : <></>}/>
          <Route path="/cart" element={user ? <Cart /> : <></>}/>
          <Route path="/admin" element={admin ? <Admin /> : <></>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
