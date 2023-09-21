
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    // onSetFilter = useRef(utilService.debounce(onSetFilter))
    // console.log(filterByToEdit)

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // onSetFilter.current(filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        // console.log(target)
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        // console.log('from cmp' ,filterByToEdit)
    }
    
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="toy-filter">
        <form onSubmit={onSubmitFilter}>

            <label htmlFor="title">Search by name:</label>
            <input type="text"
                id="title"
                name="title"
                placeholder="Enter name"
                value={filterByToEdit.title}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Enter max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <label htmlFor="inStock">In Stock:</label>
            <select className="filter-by-inStock" onChange={handleChange} name="inStock" id="inStock"  >
                <option value="all">All</option>
                <option value="inStock">Available</option>
                <option value="notInStock">Not Available</option>
            </select>

            <label htmlFor="labels">Labels:</label>
            <select className="filter-by-label" onChange={handleChange} name="labels" id="labels"  >
                <option value="">All</option>
                <option value="Animal Kingdom">Animal Kingdom</option>
                <option value="Baby">Baby</option>
                <option value="Birthday">Birthday</option>
                <option value="Cuddle Companions">Cuddle Companions</option>
                <option value="Disney">Disney</option>
                <option value="Doll">Doll</option>
                <option value="Imaginative Play">Imaginative Play</option>
                <option value="Mini Maestros">Mini Maestros</option>
                <option value="Miniature Vehicles">Miniature Vehicles</option>
                <option value="Minion Plush">Minion Plush</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Tiny Tots">Tiny Tots</option>
            </select>

        </form>
    </section>
}