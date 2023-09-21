import { ReviewPreview } from "./review.preview.jsx"
import { useEffect, useState } from 'react'
import { ConfirmationModal } from './confirmation.modal'


export function ReviewList({ reviews, onRemoveReview, user }) {
    const [confirmationMsgIsShown, setConfirmationMsgIsShown] = useState(false)
    const [reviewToRemove, setReviewToRemove] = useState(null)
    // console.log(reviewToRemove)

    function onConfirmRemoveReview(reviewId) {
        setConfirmationMsgIsShown(true)
        setReviewToRemove(reviewId)
    }

    function afterRemoveConfirmation() {
        onRemoveReview(reviewToRemove)
    }

    return (
        <ul className="review-list">
            <h3>Reviews</h3>
            {reviews.map(review =>
                <li key={review.id}>
                    <ReviewPreview review={review} />
                    {user && user.isAdmin &&
                        <section className="remove-review-btn">
                            {/* <button onClick={() => onRemoveReview(toyId, review.id)} >Remove review</button> */}
                            <button onClick={() => onConfirmRemoveReview(review.id)} >Remove review</button>
                            {confirmationMsgIsShown && <ConfirmationModal setConfirmationMsgIsShown={setConfirmationMsgIsShown} afterRemoveConfirmation={afterRemoveConfirmation} />}
                        </section>
                    }
                </li>
            )}
        </ul>
    )
}