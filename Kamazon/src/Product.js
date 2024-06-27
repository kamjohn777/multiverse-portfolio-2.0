import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({id, title, image, price, rating }) {
    const [state, dispatch] = useStateValue();

    console.log("This is the cart")

    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        })
    }
    return (
        <div className="product-main-div">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                
                {Array(rating).fill().map((_, i) => (
                    <i key={i}>&#11088;</i>
                    ))
                }
                </div>
            </div>
            <img src={image} alt="image"/>
            <button className="custom-btn btn-12" onClick={addToCart}><span>Click</span><span>Add to Cart</span></button>
        </div>
    )
}

export default Product;