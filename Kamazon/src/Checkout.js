import React from "react";
import './Checkout.css';
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
const [{ cart, user }, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout_left_container">
                <img className="image_checkout_ad" src="https://cedcommerce.com/blog/wp-content/uploads/2019/05/Amazon-ad-types_banner.jpg" />

                <div className="checkout_title_div">
                    <h3>{user?.email}</h3>
                    <h2 className="checkout_title">You shopping cart</h2>

                    {cart.map(item => (
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
            <div className="Checkout_right_container_add">
                <Subtotal />
                <h2>The subtotal will go here</h2>
            </div>
        </div>
    )
}

export default Checkout;