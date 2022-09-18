import React from "react";
import "./Home.css";
import Product from "./Product";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/610hkELQ3ZL._SX3000_.jpg",
  },
  {
    url: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/714CfPLSbmL._SX3000_.jpg",
  },

  {
    url: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/717Y5V0QJQL._SX3000_.jpg",
  },
  {
    url: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61jrk9H3e4L._SX3000_.jpg",
  },
  {
    url: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71S-sNfXIDL._SX3000_.jpg",
  },
  {
    url: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71nqaV173zL._SX3000_.jpg",
  },
];

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <SimpleImageSlider
          style={{
            objectFit: "contain",
            zIndex: -1,
            marginBottom: "-150px",
          }}
          width="100%"
          height={500}
          images={images}
          showBullets={false}
          showNavs={true}
          autoPlay={true}
        />
        <div className="home_row">
          <Product
            id="12321341"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
            price={11.96}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
          />
          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
          />
        </div>

        <div className="home_row">
          <Product
            id="4903850"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
          />
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={2}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          />
          <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={1}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
        </div>

        <div className="home_row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            rating={6}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
