import { Link } from "react-router-dom";


export function ToyPreview({ toy, onRemoveToy, user }) {
    // console.log(user)
    return (
        <article className="toy-preview">
            <Link className="details-a-link" to={`/toy/${toy._id}`}>
                <h4>{toy.title}</h4>
                <div className="toy-img-container">
                    <img src={toy.image} alt="" />

                </div>

                <p>Price: <span>{toy.price}$</span></p>
                {!toy.inStock && <span className="toy-unavailable">Out of stock</span>}
            </Link>

            {user && user.isAdmin && <section>
                <Link to={`/toy/edit/${toy._id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => { onRemoveToy(toy._id) }}>Remove Toy</button>
            </section>}
            
            {(!user || !user.isAdmin) && (toy.inStock) &&
                <button className="add-to-cart-btn">Add to cart </button>
            }
        </article>
    )
}

