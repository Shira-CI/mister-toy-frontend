import { ReviewPreview } from "./review.preview.jsx"


export function ReviewList({ reviews, onRemoveReview, toyId }) {
    return (
        <ul className="review-list">
            {reviews.map(review =>
                <li key={review.id}>
                    <ReviewPreview review={review} />
                    <section>
                        <button onClick={() => onRemoveReview(toyId ,review.id)} >Remove review</button>
                    </section>
                </li>
            )}
        </ul>
    )
}