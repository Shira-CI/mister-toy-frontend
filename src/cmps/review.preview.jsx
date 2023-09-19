export function ReviewPreview({ review }) {

    const { fullname, rating, description } = review

    function renderStars(rating) {
        if (!rating) return
        let stars = []

        for (var i = 0; i < rating; i++) {
            stars.push(<span key={i}>⭐</span>)
        }
        return stars
    }

    return (
        <article className="review-preview">
            <h4> Full Name:
                <span> {fullname}</span>
            </h4>
            <h4> Rating: {renderStars(rating)}
            </h4>
            <h4> Description:
                <span>{description}</span>
            </h4>
        </article>
    )
}