import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import Button from "@material-ui/core/Button";
function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    // push to data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <Button variant="contained" color="primary" onClick={addToBasket}>
        Add to Basket
      </Button>
    </div>
  );
}

export default Product;
