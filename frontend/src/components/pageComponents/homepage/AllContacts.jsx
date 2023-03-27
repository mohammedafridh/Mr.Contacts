import React, { useState, useEffect } from 'react'
import { MDBDataTable } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useContactContext } from '../../../context/ContactContext';
import UpdateContactModel from '../../models/UpdateContactModel';

const AllContacts = () => {
  const { contacts, dispatch } = useContactContext()
  const [search, setSearch] = useState('')
  const [modalOpened, setModalOpened] = useState(false)
  const [selectedContact, setSelectedContact] = useState({})

  //display all contacts

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch("/contact/", {
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SetContacts', payload: json })
        // setSearch(result)
      }
    }

    fetchContacts()

  }, [])

  //delete workout
  const dltHandler = async (id) => {

    const response = await fetch(`/contact/${id}`, {
      method: 'DELETE'
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DeleteContact', payload: id })
    }
  }

  const setModal = (contact) => {
    setModalOpened(true)
    setSelectedContact(contact)
  }

  //implementing search
  const handleSearch = (e)=>{
    setSearch(e.target.value)
    searchContacts(e.target.value)
  }

  const searchContacts = async (searchTerm) => {
    const response = await fetch(`/contact?search=${searchTerm}`, {})
    const json = await response.json()
  
    if (response.ok) {
      dispatch({ type: 'SetContacts', payload: json })
    }
  }

  return (
    <div className="contacts">
      <div className='contactsHeader'>
        <h3 style={{ fontWeight: 'bold' }}>All Contacts</h3>

        <div className='searchContainer'>
          <span>Search</span>
          <input
            type='text'
            placeholder='Contact name'
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {contacts && contacts.map((contact) => (
        <div className="contactDetails" key={contact._id}>
          <div className="details">
            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' className='contactImage' />

            <div>
              <h3 style={{ fontWeight: 'bold' }}>{contact.name}</h3>
              <p><strong>Contact Number</strong>: {contact.contactNumber}</p>
            </div>
          </div>

          <div>
            <button className='material-symbols-outlined dltBtn' onClick={() => dltHandler(contact._id)}>Delete</button>
            <button className='material-symbols-outlined editBtn'
              onClick={() => setModal(contact)}>Edit</button>

            <UpdateContactModel
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              contact={selectedContact}
            />
          </div>

        </div>
      ))}

    </div>
  );
};

export default AllContacts;