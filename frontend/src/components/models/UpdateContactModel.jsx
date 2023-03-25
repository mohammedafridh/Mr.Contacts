import { Modal, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react'
import { useContactContext } from '../../context/ContactContext';

function UpdateContactModel({ modalOpened, setModalOpened, contact }) {
    const theme = useMantineTheme();
    const [name, setName] = useState(contact.name)
    const [contactNumber, setContactNumber] = useState(contact.contactNumber)
    const{dispatch} = useContactContext()

    useEffect(()=>{
        setName(contact.name)
        setContactNumber(contact.contactNumber)
    },[contact])

    const updateHandler = async(e)=>{
        e.preventDefault()
        console.log('update',contact._id)
        const contacts = {name,contactNumber}

        const response = await fetch(`/contact/${contact._id}`,{
            method:'PUT',
            body:JSON.stringify(contacts),
            header:{'Content-Type':'application/json'}
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type:'SetContacts', payload:json})
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
                <h3><strong>Update Contact</strong></h3>

                <div className="labels">
                    <label>Name</label>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className="labels">
                    <label>Contact Number</label>
                    <input
                        type='number'
                        onChange={(e) => setContactNumber(e.target.value)}
                        value={contactNumber}
                    />
                </div>

                <button type = 'submit' className='editBtn updtBtn'>Update Contact</button>
            </form>


        </Modal>
    );
}

export default UpdateContactModel