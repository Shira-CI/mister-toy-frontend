import { useState } from 'react'
import { useNavigate, useParams} from "react-router-dom"
import { toyService } from '../services/toy.service'


export function AddReview() {
    const [newReview, setReviewToEdit] = useState(toyService.getEmptyReview())
    const navigate = useNavigate()
    const params = useParams()

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        await toyService.addReview(params.toyId, newReview)
        navigate('/toy')
        // showSuccessMsg('Review saved')
    }

    const { fullname, rating, readAt, description } = newReview

    return (
        <section className="add-review">

            <form onSubmit={onSaveReview} className="add-review-form flex flex-column justify-center">

                <label htmlFor="fullname">Full Name:</label>
                <input required onChange={handleChange} value={fullname}
                    type="text" name="fullname" id="fullname" />

                <label htmlFor="rating">Rating:</label>
                <select onChange={handleChange} id="rating" name="rating" value={rating}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>


                <label htmlFor="description">Share details of your own experience:</label>
                <textarea onChange={handleChange} value={description} type="text"
                    name="description" id="description" ></textarea>

                <button>Add Review</button>
            </form>
        </section>
    )
}