import React from 'react'
import AddContact from '../components/pageComponents/homepage/AddContact'
import AllContacts from '../components/pageComponents/homepage/AllContacts'

const Home = () => {
  return (
    <div className="home">
      <AddContact />
      <AllContacts />
    </div>
  )
}

export default Home