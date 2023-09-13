import { useSelector, useDispatch } from "react-redux"

import { REMOVE_TOY_FROM_CART, SET_CART_IS_SHOWN } from '../store/cart.reducer.js'

import { checkout } from '../store/user.action.js'

import {showErrorMsg} from '../services/event-bus.service.js'


export function ShoppingCart() {
    const dispatch = useDispatch()

    const isCartShown = useSelector((storeState) => storeState.cartModule.isCartShown)
    const cart = useSelector((storeState) => storeState.cartModule.shoppingCart)
    const user = useSelector((storeState) => storeState.userModule.user)
    // console.log(cart)


    function onRemoveFromCart(toyId) {
        // console.log(toyId)
        dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
    }

    function getCartTotal() {
        return cart.reduce((acc, toy) => acc + toy.price, 0)
    }

    async function onCheckout() {
        const amount = getCartTotal()
        // console.log(amount)
        try {
            // const updatedUser = await checkout(-amount)
            await checkout(-amount)
            dispatch({ type: SET_CART_IS_SHOWN, isCartShown: false })
        } catch (err) {
            // console.log('no credit')

            showErrorMsg('no credit')

            //    console.log(`Charged you: $ ${amount.toLocaleString()}`)
        }
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()

    return (
        <section className="cart-container">
            <section className="cart">
                <h2>Your Cart</h2>
                <ul>
                    {cart.map((toy, idx) => <li key={idx}>
                        <button className="remove-toy-from-cart" onClick={() => onRemoveFromCart(toy._id)} > x </button>
                        {toy.title} | {toy.price}
                    </li>
                    )}
                </ul>
                <p className="cart-total">Total: ${total} </p>
                <button className="checkout-btn" disabled={!user || !total} onClick={onCheckout}>Checkout</button>
            </section>
        </section>
    )
}