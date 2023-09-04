import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { ReviewList } from '../cmps/review-list.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()
    // console.log(toy.reviews)
    // const [review, setReview] = useState(reviewService.getEmptyReview())
    // const [reviews, setReviews] = useState([])



    useEffect(() => {
        if (toyId.length > 1) {
            loadToy()
            // .then(toy => reviewService.query(toy._id))
            // .then(reviewsFromBackend => setReviews(reviewsFromBackend))
        }
    }, [toyId])


    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
            return toy
        }
        catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }


    function onRemoveReview(toyId, reviewId) {
        // bookService.removeReview(bookId, reviewId)
        // .then(()=>{
        //     const updatedReviews = book.reviews.filter(review => review.id !== reviewId)
        //     setBook({...book, reviews:updatedReviews})
        //     showSuccessMsg('Review saved')
        // })
    }

    // function handleReviewChange({ target }) {
    //     const { value, name: field, } = target
    //     setReview((prevReview) => ({ ...prevReview, [field]: value, toyId: toy._id }))
    // }

    // async function onSaveReview(ev) {
    //     ev.preventDefault()
    //     try {
    //         const savedReview = await reviewService.save(review)
    //     } catch (err) {
    //         console.log("Couldn't save review, err:", err)
    //     }
    // }

    const inventory = toy.inStock ? 'In stock' : 'Not available'


    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h2>Toy name : {toy.title}</h2>
            <img className='details-img' src={toy.image} alt="" />

            <h3>Price: ${toy.price}</h3>
            <h3>Created at: {toy.createdAt}</h3>
            <h3>{inventory}</h3>
            <section>
                {toy.labels.map((label, idx) =>
                    <small key={label + idx} >{label} | </small>
                )}
            </section>

            {toy.reviews.length > 0 && <ReviewList reviews={toy.reviews} onRemoveReview={onRemoveReview} toyId={toyId} />}

            <button onClick={() => navigate('/toy')}> Back </button>
            <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
            <button><Link to={`/toy/${toy._id}/review`}>Add review</Link></button>

        </section>)
}

