import { useDispatch } from "react-redux"

import { REMOVE_TOY_FROM_CART, SET_CART_IS_SHOWN } from '../store/cart.reducer.js'

import { checkout } from '../store/user.action.js'

import {showErrorMsg , showSuccessMsg} from '../services/event-bus.service.js'


export function ShoppingCart({user, cart}) {
    const dispatch = useDispatch()

    // const isCartShown = useSelector((storeState) => storeState.cartModule.isCartShown)
    // const cart = useSelector((storeState) => storeState.cartModule.shoppingCart)
    // const user = useSelector((storeState) => storeState.userModule.user)
    // console.log(cart)


    function onRemoveFromCart(toyId) {
        // console.log(toyId)
        dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
    }

    function getCartTotal() {
        if (!cart )return
        return cart.reduce((acc, toy) => acc + toy.price, 0)
    }

    async function onCheckout() {
        const amount = getCartTotal()
        try {
            await checkout(-amount)
            dispatch({ type: SET_CART_IS_SHOWN, isCartShown: false })
            showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)

        } catch (err) {
            showErrorMsg('no credit')
        }
    }

    // if (!isCartShown) return <span></span>
    const total = getCartTotal()
    if (!cart )return

    return (
        // <section className="cart-container">
            <section className="cart">
                <h2>Your Cart</h2>
                <ul>
                    {cart.map((toy, idx) => <li key={idx}>
                        <button className="remove-toy-from-cart" onClick={() => onRemoveFromCart(toy._id)} > x </button>
                        {toy.title} | {toy.price} $
                    </li>
                    )}
                </ul>
                <p className="cart-total">Total: {total}$ </p>
                <button className="checkout-btn" disabled={!user || !total} onClick={onCheckout}>Checkout</button>
            </section>
        // </section>
    )
}