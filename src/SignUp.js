import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDocs,
  collection,
  db,
  addDoc,
} from "./firebase";

import "./Login.css";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const register = async (e) => {
    e.preventDefault(); //prevent from refreshing the page
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((res) => {
        console.log("successfully created", res);
        const user = res.user;

        addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
        });

        if (res) {
          navigate("/");
        }
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  /*const register = (e) => {
    e.preventDefault(); //prevent from refreshing the page
    createUserWithEmailAndPassword(auth, email, password)
      .then(function (usercre) {
        // [END createwithemail]
        // callSomeFunction(); Optional
        // var user = firebase.auth().currentUser;
        usercre.user.updateProfile({
          displayName: name,
        });
      })
      .then((auth) => {
        console.log("successfully created");
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };*/
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={register}
            className="login_signInButton"
          >
            Sign Up
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <Link to="/signup">Sign In</Link>
      </div>
    </div>
  );
}

export default Login;
