import React, { useState, useRef } from 'react'
import { useContactContext } from '../../../context/ContactContext'
import FileBase from 'react-file-base64'
import loadingGif from '../../../assets/loading-gif.gif'

const AddContact = () => {

    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { dispatch } = useContactContext()
    const [profileKey,setProfileKey] = useState(Date.now())
    const[loading,setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const contact = {name,contactNumber,image}

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
                setLoading(false)
            } else if (json.error === '*Contact number must be 10 digits!') {
                setError(json.error)
                setLoading(false)
            } else {
                setError(json.error)
                setEmptyFields(json.emptyFields)
                setLoading(false)
            }
        } if (response.ok) {
            dispatch({ type: 'CreateContact', payload: json })
            setError(null)
            setProfileKey(Date.now())
            setImage(null)
            setEmptyFields([])
            setName('')
            setContactNumber('')
            setLoading(false)
        }
        //}
    }

    return (
        <form className="contactForm" onSubmit={submitHandler}>
            <h2 className='addContactTitle'>Add Contact</h2>

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

            <div className="labels">
                <label>Contact Image</label>

                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                        setImage(base64)
                    }
                    key = {profileKey}
                />
            </div>

            {loading?
            <button type = 'submit'><img src = {loadingGif} className = 'loading'></img></button>:
            <button type='submit' className='formBtn'>Add Contact</button>
            }
        </form>
    )
}

export default AddContact