import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

import { toyService } from "../services/toy.service"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from "../store/toy.action"
import { ToyList } from "../cmps/toy.list"
import { ToyFilter } from "../cmps/toy.filter"
import { ToySort } from '../cmps/toy.sort'
import { ADD_TOY_TO_CART } from '../store/cart.reducer'

export function ToyIndex() {

    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const [sortBy, setSortBy] = useState({ type: 'headline', desc: 1 })
    const [loggedInUser, setLoggedInUser] = useState(null)
    const user = useSelector((storeState) => storeState.userModule.user)
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const dispatch = useDispatch()
    // console.log(toys)
    // console.log(user , 'user from store')
    // console.log(loggedInUser , 'user from index')


    useEffect(() => {
        loadToys(filterBy, sortBy)
        setLoggedInUser(user)
    }, [filterBy, sortBy, user])


    function onSetFilter(filterBy) {
        // console.log('FilterBy', filterBy)
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        }
        catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    function onAddToCart(toy){
        console.log('added to cart')
        dispatch({type: ADD_TOY_TO_CART , toy})
    }

    // async function onAddToy() {
    //     const toyToSave = toyService.getEmptyToy('Random toy')
    //     try {
    //         const savedToy = await saveToy(toyToSave)
    //         showSuccessMsg(`Toy added (id: ${savedToy._id})`)
    //     }
    //     catch (err) {
    //         showErrorMsg('Cannot add toy')
    //     }
    // }



    return (
        <section className='index-container'>

            <section className='toys-filter-container'>
                <ToyFilter onSetFilter={onSetFilter} />

                <ToySort sortBy={sortBy} setSortBy={setSortBy} />

                {/* <Link to={`/toy/edit`}>
                    <button className='add-toy-btn'> Add Toy </button>
                </Link> */}

            </section>

            {isLoading && <h4>Loading...</h4>}

            <ToyList
                toys={toys}
                user={loggedInUser}
                onRemoveToy={onRemoveToy}
                onAddToCart={onAddToCart}
            />
        </section>
    )
}