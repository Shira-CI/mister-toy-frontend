import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { labelService } from '../services/label.service.js'
import { Link } from 'react-router-dom'
import { uploadService } from '../services/upload.service.js'


export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [labels, setLabels] = useState([])
    const [toyImage, setToyImage] = useState(null)


    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // if (!toyId) return
        labelService.query()
            .then(labels => {
                setLabels(labels)
                if (toyId) loadToy()
            })
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

    function onHandleLabel({ target }) {
        const label = target.id
        // console.log('label:', label)
        const idx = toyToEdit.labels.findIndex(curLabel => curLabel === label)
        if (idx === -1) {
            setToyToEdit((prevToy) => {
                return { ...prevToy, labels: [...prevToy.labels, label] }
            })
        } else {
            setToyToEdit((prevToy) => {
                // * With filter
                // const updatedLabels = toyToEdit.labels.filter(curLabel => curLabel !== label)
                // return {
                //     ...prevToy,
                //     labels: updatedLabels
                // }
                // * With slice
                return {
                    ...prevToy,
                    labels: [...prevToy.labels.slice(0, idx), ...prevToy.labels.slice(idx + 1)]
                }
            })
        }
    }

    const labelsAsStr = JSON.stringify(toyToEdit.labels)

    return (
        <section className="toy-edit-container">
            <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

            <form className="toy-edit-inputs" onSubmit={onSaveToy}>
            <input type="file" accept="image/png/jpeg" onChange={onHandleImg} />

            {toyImage &&
                <img
                    alt="not found"
                    height={"150px"}
                    src={URL.createObjectURL(toyImage)}
                />
            }

                <label htmlFor="title">Name:</label>
                <input type="text" required
                    name="title"
                    id="title"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={toyToEdit.title}
                />

                <label htmlFor="price">Price:</label>
                <input type="number" required
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    onChange={handleChange}
                    value={toyToEdit.price}
                />
                <article>
                    <input type="checkbox" name="inStock" value={toyToEdit.inStock} checked={toyToEdit.inStock} onChange={handleChange} />
                    <label>Toy In Stock</label>
                </article>

                {/* <div className="label-container">
                    {(labelsAsStr.length > 0) && <pre>{labelsAsStr}</pre>}
                    <label>Labels:</label>
                    <ul>
                        {labels.map(label => {
                            return <li
                                onClick={onHandleLabel}
                                id={label}
                                key={label}
                                className={`${labelsAsStr.includes(label) ? 'red' : 'black'}`} >
                                {label}
                            </li>
                        })}
                    </ul>
                </div> */}

                <div className="button-group">
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>

            </form>
        </section>
    )
}