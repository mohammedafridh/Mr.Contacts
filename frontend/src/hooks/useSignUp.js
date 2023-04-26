import React,{useState} from 'react'
import {useAuthContext} from '../context/UserContext'

const useSignup = () => {

    const[error,setError] = useState(null)
    const[loading,setLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async(name,username,password)=>{
        setError(null)
        setLoading(true)

        const response = await fetch('/users/', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name,username,password})
        })

        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN', payload: json})

            // toast.success('Registered Successfully!')

            setLoading(false)
        }
    }

    return {signup, loading, error}
}

export default useSignup