import { ReviewPreview } from "./review.preview.jsx"


export function ReviewList({ reviews, onRemoveReview, toyId, user }) {
    return (
        <ul className="review-list">
             <h3>Reviews</h3>
            {reviews.map(review =>
                <li key={review.id}>
                    <ReviewPreview review={review} />
                    {user && user.isAdmin &&
                        <section className="remove-review-btn">
                            <button onClick={() => onRemoveReview(toyId, review.id)} >Remove review</button>
                        </section>
                    }
                </li>
            )}
        </ul>
    )
}