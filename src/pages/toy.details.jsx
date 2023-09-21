import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { ReviewList } from '../cmps/review.list.jsx'

import { ADD_TOY_TO_CART, SET_CART_IS_SHOWN } from '../store/cart.reducer'

export function ToyDetails() {
    const [toy, setToy] = useState(toyService.getEmptyToy())
    const [loggedInUser, setLoggedInUser] = useState(null)
    const user = useSelector((storeState) => storeState.userModule.user)
    // console.log(user , 'user from store')
    // console.log(loggedInUser, 'user from details')

    const { toyId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        setLoggedInUser(user)
    }, [user])

    useEffect(() => {
        if (toyId.length > 1) {
            loadToy()
        }
    }, [toyId])


    function onAddToCart(toy) {
        console.log('added to cart')
        dispatch({ type: ADD_TOY_TO_CART, toy })
        dispatch({ type: SET_CART_IS_SHOWN, isCartShown: true })
    }


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
    const dynInventoryClass = toy.inStock ? '' : 'red'

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details-container">

            <section className='toy-details'>

                <h2 className='toy-title'>{toy.title}</h2>


                <p className='toy-description'>{toy.description}</p>

                <section className='toy-labels'>
                    {toy.labels.map((label, idx) =>
                        <span key={label + idx} >{label} | </span>
                    )}
                </section>

                <span className={`${dynInventoryClass} toy-inventory`}>{inventory}</span>

                <section className='toy-price'>
                    <span>${toy.price} </span>
                    {user && !user.isAdmin && (
                        <button onClick={()=>onAddToCart(toy)}>Add to cart </button>
                    )
                    }
                </section>

                {toy.reviews.length > 0 && <ReviewList user={loggedInUser} reviews={toy.reviews} onRemoveReview={onRemoveReview} toyId={toyId} />}

                {user && !user.isAdmin &&
                    <section className='customer-details-options'>
                        <button className='add-review-btn'> Add review
                            <Link to={`/toy/${toy._id}/review`}></Link>
                        </button>
                    </section>
                }

                {user && user.isAdmin &&
                    <button> Edit
                        <Link to={`/toy/edit/${toy._id}`}></Link>
                    </button>
                }

                <button className='back-btn-details' onClick={() => navigate('/toy')}> Back </button>
            </section>

            <section className='details-img'>
                <img src={toy.image} alt="" />
            </section>
        </section>
    )
}