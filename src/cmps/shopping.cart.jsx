import { useSelector, useDispatch } from "react-redux"

import {REMOVE_TOY_FROM_CART} from '../store/cart.reducer.js'


export function ShoppingCart({ isCartShown }) {
    const dispatch = useDispatch()

    const cart = useSelector((storeState) => storeState.cartModule.shoppingCart)
    // console.log(cart)

    function onRemoveFromCart(toyId) {
        // console.log(toyId)
        dispatch({type: REMOVE_TOY_FROM_CART , toyId})
    }

    function getCartTotal(){
        return cart.reduce((acc , toy) => acc + toy.price , 0)
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()

    return (
        <section className="cart">
            <h5>Your Cart</h5>
            <ul>
                {cart.map((toy, idx) => <li key={idx}>
                    <button className="remove-toy-from-cart" onClick={() => onRemoveFromCart(toy._id)} > x </button>
                    {toy.title} | {toy.price}
                </li>
                )}
            </ul>
            <p>Total: ${total} </p>
        </section>
    )
}