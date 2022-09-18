import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Orders from "./Orders";
import Payment from "./Payment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import { auth, getDocs, db, collection, query, where } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51LgQwCSFBNX9oBX3dJ3BUJqixQNKcV6f8stJKGThCJaGTT5VhkmGRdLwo9hHMT2J2I9X02oO0JTKPbZV6C1XcBB400Lcv8lEjb"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // this only run once because of []
    console.log("nhi h bhai ");
    auth.onAuthStateChanged(async (authUser) => {
      console.log("User is", authUser);
      if (authUser) {
        const q = query(
          collection(db, "users"),
          where("uid", "==", authUser.uid)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          dispatch({
            type: "SET_USER",
            user: doc.data(),
          });
        });
        //just logged in / the user was logged in
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {};
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
