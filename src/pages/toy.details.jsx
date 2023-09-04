import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { ReviewList } from '../cmps/review-list.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (toyId.length > 1) {
            loadToy()
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


    async function onRemoveReview(toyId, reviewId) {
        try {
           const updatedToy = await toyService.removeReview(toyId, reviewId)
          setToy(updatedToy)
        }
        catch (err) {
            console.log('Had issues in removing review', err)
        }
    }

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

