import React, { useState } from 'react'
import { useContactContext } from '../../../context/ContactContext'

const AddContact = () => {

    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    // const[image,setImage] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { dispatch } = useContactContext()

    const submitHandler = async (e) => {
        e.preventDefault()

        const contact = { name, contactNumber }

        // if (contactNumber.length !== 10) {
        //     setError('Contact Number must be 10 digits')
        // } else {
            const response = await fetch('/contact/create', {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()

            if (!response.ok) {
                if (json.error === '*Contact name already exists!') {
                    setError(json.error)
                } else if (json.error === '*Contact number must be 10 digits!') {
                    setError(json.error)
                } else {
                    setError(json.error)
                    setEmptyFields(json.emptyFields)
                }
            } if (response.ok) {
                dispatch({ type: 'CreateContact', payload: json })
                setError(null)
                // setImage(null)
                setEmptyFields([])
                setName('')
                setContactNumber('')
            }
        //}
    }

    return (
        <form className="contactForm" onSubmit={submitHandler}>
            <h2>Add Contact</h2>

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            <div className="labels">
                <label>Name</label>
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={emptyFields.includes('name') ? 'error' : ''}
                />
            </div>

            <div className="labels">
                <label>Contact Number</label>
                <input
                    type='number'
                    onChange={(e) => setContactNumber(e.target.value)}
                    value={contactNumber}
                    className={emptyFields.includes('contactNumber') ? 'error' : ''}
                />
            </div>

            {/* <div className="labels">
            <label>Image</label>
            <input 
                type = 'file' 
                onChange={(e)=>setImage(e.target.files[0])}
            />
        </div> */}

            <button type='submit' className='formBtn'>Add Contact</button>
        </form>
    )
}

export default AddContact