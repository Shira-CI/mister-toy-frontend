import { ReviewPreview } from "./review-preview.jsx"
const { Link } = "react-router-dom"


export function ReviewList({ reviews, onRemoveReview, toyId }) {
    console.log('revieslist cmp')
    console.log(reviews)
    return (
        <ul className="review-list">
            {reviews.map(review =>
                <li key={review.id}>
                    {console.log('revieslist cmp')}
                    <ReviewPreview review={review} />
                    <section>
                        {/* <button onClick={() => onRemoveReview(bookId ,review.id)} >Remove review</button> */}
                        {/* <button><Link to={`/review/${review.id}`} >Details</Link ></button> */}
                    </section>
                </li>
            )}
        </ul>
    )
}