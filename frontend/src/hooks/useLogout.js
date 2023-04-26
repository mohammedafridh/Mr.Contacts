import { useAuthContext } from "../context/UserContext";
import { useContactContext } from "../context/ContactContext";

const useLogout = ()=>{
    const{dispatch} = useAuthContext()
    const{dispatch:contactDispatch} = useContactContext()

    const logout = async()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        contactDispatch({type:'SetContacts', payload:null})
    }
    return {logout}
}

export default useLogout