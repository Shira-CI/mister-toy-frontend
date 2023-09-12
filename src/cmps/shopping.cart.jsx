import { useSelector, useDispatch } from "react-redux"


export function ShoppingCart({ isCartShown }) {

    const cart = useSelector((storeState) => storeState.cartModule.shoppingCart)
    // console.log(cart)

    if (!isCartShown) return <span></span>

    return (
        <section className="cart">
            <h5>Your Cart</h5>
            <ul>
                {cart.map((toy, idx) => <li key={idx}>
                    <button className="remove-toy-from-cart"> x </button>
                    {toy.title} | {toy.price}
                </li>
                )}
            </ul>
        </section>
    )
}