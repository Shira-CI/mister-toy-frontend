import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { Link } from 'react-router-dom'
import { uploadService } from '../services/upload.service.js'


export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [labelToSave, setLabelToSave] = useState('')
    const [toyImage, setToyImage] = useState(null)

    // console.log(toyToEdit.labels)
    // console.log(labelToSave)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) {
            loadToy()
                .then(toy => {
                    // console.log(toyToEdit.labels)
                })
        }
    }, [])



    async function onHandleImg(ev) {
        try {
            const imgUrl = await uploadService.uploadImg(ev)
            setToyToEdit((preToyToEdit) => ({ ...toyToEdit, image: imgUrl }))
        } catch (err) {
            console.log('Cannot upload image right now..', err);
        }
    }


    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            // console.log(toy)
            setToyToEdit(toy)
        }
        catch (err) {
            console.log('Had issued in toy edit:', err)
            navigate('/toy')
            showErrorMsg('Toy not found!')
        }
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') :
            (target.type === 'checkbox') ? target.checked :
                target.value
        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            const savedToy = await toyService.save(toyToEdit)
            // saveToy(toyToEdit)
            // console.log('toy saved', savedToy);
            navigate('/toy')
            showSuccessMsg(`Toy '${savedToy._id}' saved!`)
        }
        catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot save toy')
        }
    }


    function onAddLabel(ev) {
        ev.preventDefault()
        if (!labelToSave) return
        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, labels: [...prevToyToEdit.labels, labelToSave] }))
        setLabelToSave('')
    }

    function onRemoveLabel(ev, label) {
        ev.preventDefault()
        const idx = toyToEdit.labels.findIndex(curLabel => curLabel === label)

        setToyToEdit(prevToyToEdit => ({
            ...prevToyToEdit,
            labels: [...prevToyToEdit.labels.slice(0, idx), ...prevToyToEdit.labels.slice(idx + 1)]
        }))
    }

    function onHandleLabel({ target }) {
        const label = target.value
        setLabelToSave(label)
    }

    return (
        <section className="toy-edit-container">
            <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

            <form className="toy-edit-inputs" onSubmit={onSaveToy}>

                {/* <input type="file" accept="image/png/jpeg" onChange={onHandleImg} /> */}
                {/* {toyImage &&
                    <img
                        alt="not found"
                        height={"150px"}
                        src={URL.createObjectURL(toyImage)}
                    />
                } */}

                <section className='edit-basics'>
                    <label htmlFor="title">Toy name:</label>
                    <input type="text" required
                        name="title"
                        id="title"
                        placeholder="Enter name"
                        onChange={handleChange}
                        value={toyToEdit.title}
                    />

                    <label htmlFor="price">Price (USD):</label>
                    <input type="number" required
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        onChange={handleChange}
                        value={toyToEdit.price}
                    />
                </section>
                <small className='toy-availability'>
                  <h3>Toy availability:</h3>
                    <input type="checkbox" name="inStock" value={toyToEdit.inStock} checked={toyToEdit.inStock} onChange={handleChange} />
                    <label className='toy-in-stock'>Toy In Stock</label>
                </small>

                <div className="labels-container">
                    <ul>
                        <h3>Labels:</h3>
                        {toyToEdit.labels.map(label => {
                            return <li
                                id={label}
                                key={label} >
                                {label}
                                <button title='remove label' onClick={(event) => onRemoveLabel(event, label)}>x</button>
                            </li>
                        })}
                    </ul>
                        <section className='add-label-container'>
                    <input type="text"
                        name="label"
                        id="label"
                        placeholder="Enter new label"
                        onChange={onHandleLabel}
                        value={labelToSave}
                    />
                    <button className='add-label-btn' onClick={onAddLabel}>Add label</button>
                    </section>
                </div>

                <div className="exit-buttons">
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>

        </section>
    )
}