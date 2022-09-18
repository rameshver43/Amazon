import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { async } from "@firebase/util";
import { collection, addDoc } from "./firebase";
import { db } from "./firebase";
import axios from "./axios";
import { doc, setDoc } from "firebase/firestore";
function Payment() {
  const history = useNavigate();
  const [{ user, basket }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expecrs the total in a currencied submits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      console.log("sssss", response);
    };
    getClientSecret();
  }, [basket]);
  console.log("secret", clientSecret);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      console.log("stripe not loaded");
      return;
    }
    console.log("cardelement", elements.getElement(CardElement));
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log("rrrresult", result);
    if (result.error) {
      alert("Payment incompleted");
      setSucceeded(false);
      setError(result.error.message);
      setProcessing(false);
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      const ref = doc(
        db,
        "users",
        user?.uid,
        "orders",
        result.paymentIntent.id
      );
      setDoc(ref, {
        basket: basket,
        amount: result.paymentIntent.amount,
        created: result.paymentIntent.created,
      });
      console.log("idddddddddddddd", result.paymentIntent.id);
      dispatch({
        type: "ADD_REAL_TIME_PAYMENT_ID",
        paymentIntentId: result.paymentIntent.id,
      });
      alert("Payment completed");
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      dispatch({
        type: "EMPTY_BASKET",
      });
      history("/orders");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    /* const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ error, id }) => {
        if (error || !id) {
          alert("Payment Failed Please Try Again!!");
          return;
        } else {
          console.log("payment", id);
          /* const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
          setDoc(ref, {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        }
      });
*/
    //paymentIntent = payment confirmation
  };
  const handleChange = (e) => {
    //Listen for changes in card
    // display error
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (
          {<Link to="/checkout">{basket ? basket.length : 0} items</Link>})
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Devilery address</h3>
          </div>
          <div className="payment_address">
            <p>{user ? user.email : "guest"}</p>
            <p>Near BSNL Tower, Gagaul</p>
            <p>Meerut, UP, 245206</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // Part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
