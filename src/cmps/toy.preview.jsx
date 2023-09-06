import { Link } from "react-router-dom";


export function ToyPreview({ toy, onRemoveToy, user }) {
    // console.log(user)
    return (
        <article className="toy-preview">
            <Link className="details-a-link" to={`/toy/${toy._id}`}>
                <h4>{toy.title}</h4>
                {/* {console.log('from toy preview' ,toy)} */}
                <img src={toy.image} alt="" />

                <p>Price: <span>{toy.price}$</span></p>
                {toy.inStock && <span className="toy-available">Toy Available</span>}
                {!toy.inStock && <span className="toy-available">Toy Unavailable</span>}
            </Link>
            {user && user.isAdmin && <section>

                <Link to={`/toy/edit/${toy._id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => { onRemoveToy(toy._id) }}>Remove Toy</button>
            </section>}
            {(!user || !user.isAdmin) && <section>
                <button>Add to cart </button>
                <button>Details</button>
            </section>}
        </article>
    )
}

