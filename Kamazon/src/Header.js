import React, { useState } from "react";
import "../src/Header.css";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import kamazon from "./assets_folder/Screenshot_2024-04-28_133138-removebg-preview.png";

function Header() {
  const [{ cart, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={kamazon} />
      </Link>

      <div className="header_address">
        <span className="header_span_addressLineOne">Hello</span>
        <div className="sub-span-div-for-lineTwo">
          <span id="id-address-span" class="material-symbols-outlined">
            location_on
          </span>
          <span>Select Your address</span>
        </div>
      </div>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <span class="material-symbols-outlined">search</span>
      </div>

      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_span_optionsLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header_span_optionsLineTwo">
              {user ? "Sign out" : "Sign In"}
            </span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_span_optionsLineOne">Returns</span>
          <span className="header_span_optionsLineTwo">& Orders</span>
        </div>

        <div className="header_option">
          <span className="header_span_optionsLineOne">Your</span>
          <span className="header_span_optionsLineTwo">Prime</span>
        </div>
      </div>

      <Link to="/Checkout">
        <div className="header_optionBasket">
          <span id="shopping-cart-symbol" class="material-symbols-outlined">
            shopping_cart
          </span>
          <span className="header_optionLineTwo header_basketCount">
            {cart?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
