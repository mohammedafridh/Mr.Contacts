import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import loadingGif from '../../assets/loading-gif.gif'
import useLogin from '../../hooks/useLogin'

const Login = () => {

    const[loading,setLoading] = useState(false)
    const[emptyFields,setEmptyFields] = useState([])
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    // const[error,setError] = useState('')
    const {isLoading,error,login} = useLogin()

    const submitHandler = async(e)=>{
        e.preventDefault()
        setLoading(true)
        await login(username,password)
        setLoading(false)
    }

  return (
    <div className="login">
        <form className="loginForm" onSubmit={submitHandler}>
            <h2 className='addContactTitle'>Login</h2>

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

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

            {loading?
            <button type = 'submit' className='loadingBtn formBtn'><img src = {loadingGif} className = 'loading'></img></button>:
            <button type='submit' className='formBtn'>Login</button>
            }

            <p className='regTxt'>Do not have an account? <Link to = '/register'>Register</Link></p>
        </form>
        </div>
  )
}

export default Login