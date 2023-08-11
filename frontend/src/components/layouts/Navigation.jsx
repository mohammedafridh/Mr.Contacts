import React from 'react'
import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import { useAuthContext } from '../../context/UserContext'

const Navigation = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()
  console.log(user)

  const logoutHandler = async () => {
    await logout()
  }

  return (
    <div className="navDetails">
      <h2>Mr.Contacts</h2>
      <div className="nav">
        {/* {user ?
          <h3 className='proName'>Hi {user.user.name}!</h3>:''} */}
        {user ?
          <button onClick={logoutHandler}>Log Out</button>:''
        }
      </div>
    </div>
  )
}

export default Navigation