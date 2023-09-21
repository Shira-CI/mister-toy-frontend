import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'

import { ConfirmationModal } from './confirmation.modal'

export function ToyPreview({ toy, onRemoveToy, user, onAddToCart }) {
    // console.log(user)
    const [confirmationMsgIsShown, setConfirmationMsgIsShown] = useState(false)

    function onConfirmRemoveToy() {
        setConfirmationMsgIsShown(true)
        // return <ConfirmationModal/>
    }

    function afterRemoveConfirmation(){
        onRemoveToy(toy._id)
    }

    return (
        <article className="toy-preview">
            <Link className="details-a-link" to={`/toy/${toy._id}`}>
                <h4>{toy.title}</h4>
                <div className="toy-img-container">
                    <img src={toy.image} alt="" />

                </div>

                <p>Price: <span>{toy.price}$</span></p>
                {!toy.inStock && <div className="toy-unavailable">
                    <span >Out of stock</span>
                </div>
                }
            </Link>

            {user && user.isAdmin && <section className="admin-btns">
                <button>
                    <Link to={`/toy/edit/${toy._id}`}>
                        Edit
                    </Link>
                </button>
                {/* <button onClick={() => { onRemoveToy(toy._id) }}>Remove Toy</button> */}
                <button onClick={()=>onConfirmRemoveToy()}>Remove Toy</button>
                {confirmationMsgIsShown && <ConfirmationModal setConfirmationMsgIsShown={setConfirmationMsgIsShown} afterRemoveConfirmation={afterRemoveConfirmation}/>}
            </section>}

            {(!user || !user.isAdmin) && (toy.inStock) &&
                <button className="add-to-cart-btn" onClick={() => onAddToCart(toy)}>Add to cart </button>
            }
            {/* <button className="add-to-cart-btn" onClick={()=> onAddToCart(toy)} disabled = {!toy.inStock || !user  ? true : false}  >Add to cart </button> */}
        </article>
    )
}

