import { Modal, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react'
import { useContactContext } from '../../context/ContactContext';
import FileBase from 'react-file-base64'

function UpdateContactModel({ modalOpened, setModalOpened, contact }) {
    const theme = useMantineTheme();
    const [error, setError] = useState('')
    const [name, setName] = useState(contact.name)
    const [image, setImage] = useState(contact.image)
    const [contactNumber, setContactNumber] = useState(contact.contactNumber)
    const { dispatch } = useContactContext()

    useEffect(() => {
        setName(contact.name)
        setContactNumber(contact.contactNumber)
        setImage(contact.image)
    }, [contact])

    const updateHandler = async (e) => {
        e.preventDefault()
        console.log('update', contact._id)
        const contacts = { name, contactNumber, image }

        const response = await fetch(`/contact/${contact._id}`, {
            method: 'PUT',
            body: JSON.stringify(contacts),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UpdateContact', payload: json })
            setError('')
            setModalOpened(false)
        } if (!response.ok) {
            setError(json.error)
        }
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.10}
            overlayBlur={1}
            size='30%'
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >

            <form className='updateForm' onSubmit={updateHandler}>
                <h3 style = {{color:'orangered'}}><strong>Update Contact</strong></h3>

                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                <div className="updateLabels">
                    <label>Name</label>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className="updateLabels">
                    <label>Contact Number</label>
                    <input
                        type='number'
                        onChange={(e) => setContactNumber(e.target.value)}
                        value={contactNumber}
                    />
                </div>

                <div className="updateLabels">
                    <label>Image</label>
                    <div className="imgContainer">
                        {image ? <img src={image} className='updateImage' /> :
                            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' className='updateImage' />}
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                                setImage(base64)
                            }
                        />
                    </div>
                </div>

                <button type='submit' className='editBtn updtBtn'>Update Contact</button>
            </form>


        </Modal>
    );
}

export default UpdateContactModel