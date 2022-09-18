import React, { useState, useEffect } from "react";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import { doc, db } from "./firebase";
function Orders() {
  const [{ basket, user, paymentIntentId }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("user hai newjghgfdfgfh", paymentIntentId);
    if (user) {
      const q = query(
        collection(db, "users"),
        where("uid", "==", authUser.uid)
      );

      const querySnapshot = getDocs(q);
      querySnapshot.forEach((doc) => {
        dispatch({
          type: "SET_USER",
          user: doc.data(),
        });
      });
      const ref = doc(db, "users", user?.uid, "orders", paymentIntentId);
      const orderedOrders = query(ref, orderBy("created", "desc"));
      onSnapshot(orderedOrders, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        console.log("user hai new", orders);
      });
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
