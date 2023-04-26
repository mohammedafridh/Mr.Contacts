import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import loadingGif from '../../assets/loading-gif.gif'
import useSignup from '../../hooks/useSignUp'

const Register = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    // const [error, setError] = useState('')
    const {loading,error,signup} = useSignup()

    const submitHandler = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        await signup(name,username,password)
        setIsLoading(false)
    }

    return (
        <div className="login">
            <form className="loginForm" onSubmit={submitHandler}>
                <h2 className='addContactTitle'>Register</h2>

                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                <div className="labels">
                    <label>Name</label>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                    // className={emptyFields.includes('name') ? 'error' : ''}
                    />
                </div>

                <div className="labels">
                    <label>Username</label>
                    <input
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                    // className={emptyFields.includes('name') ? 'error' : ''}
                    />
                </div>

                <div className="labels">
                    <label>Password</label>
                    <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    // className={emptyFields.includes('contactNumber') ? 'error' : ''}
                    />
                </div>

                {isLoading ?
                    <button type='submit'><img src={loadingGif} className='loading'></img></button> :
                    <button type='submit' className='formBtn'>Register</button>
                }

                <p className='regTxt'>Do you Have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default Register