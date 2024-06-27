import React, { useEffect, useState } from "react";
import './Payment.css'
import { Check, Email } from "@mui/icons-material";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "./reducer";
import axios from "./axios";


function Payment() {
    const [{ cart, user }, dispatch] = useStateValue();
    const Navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(null);


    useEffect(() => {

        const getClientSecret = async () => {
            try {
                const cartTotal = getCartTotal(cart) * 100;

                const response = await axios({
                    method: 'post',
                    url: `/payments/create?total=${cartTotal}`
                });
                console.log("Backend response:", response)
                setClientSecret(response.data.clientSecret);
                console.log(response.data.clientSecret);
            } catch (error) {
                console.error("Error getting client secret:", error.response ? error.response.data : error);
            }
        }

        getClientSecret();
    }, [cart])

    console.log('the secret is >>>>', clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        
        if (!clientSecret) {
            console.error("Client secret is not set yet")
            return;
        }
        // const payLoad = await stripe 
        const payLoad = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true);
            setError(null);
            setProcessing(true);

            dispatch({
                type: 'EMPTY_CART'
            })

            Navigate.replace('/orders')
        })
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout (<Link to="/checkout">{cart?.length} item(s)</Link>)
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery address</h3>
                    </div>

                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>1234 fake address blvs</p>
                        <p>fake state, fake city</p>
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Reveiw items and delivery</h3>
                    </div>
                    <div className="payment_items">
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

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        {/* stripe magic */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment_priceContainer">
                            <CurrencyFormat 
                            renderText={(value) => (
                             <>
                                <h3>Order Total: {value}</h3>
                            </>
                            )}
                             decimalScale={2}
                             value={getCartTotal(cart)} 
                             displayType={"text"}
                             thousandSeparator={true}
                             prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded || !clientSecret}>
    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
</button>

                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>      
            </div>
        </div>
    )
}


export default Payment;