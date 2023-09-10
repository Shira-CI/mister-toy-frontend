
export function ReviewPreview({ review }) {

    const { fullname, rating, description } = review

    return (
        <article className="review-preview">
            <h4> Full Name:
                <span> {fullname}</span>
            </h4>
            <h4> Rating:
                <span>  {rating} </span>
            </h4>
            <h4> Description:
                <span>{description}</span>
            </h4>
        </article>
    )
}