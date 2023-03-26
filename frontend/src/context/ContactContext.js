import { useReducer, createContext, useContext } from 'react'

const contactContext = createContext()

export const ContactContextProvider = ({ children }) => {

    const contactReducer = (state, action) => {
        switch (action.type) {
            case 'CreateContact':
                return {
                    contacts: [action.payload, ...state.contacts]
                }
            case 'SetContacts':
                return {
                    contacts: action.payload
                }
            case 'DeleteContact':
                return {
                    contacts: state.contacts.filter((w) => w._id !== action.payload),
                }
            case 'UpdateContact':
                return {
                    contacts: state.contacts.map((contact) =>
                        contact._id === action.payload._id ? action.payload : contact
                    )
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(contactReducer, {
        contacts: null
    })

    console.log('ContactContext state', state)

    return (
        <contactContext.Provider value={{ ...state, dispatch }}>
            {children}
        </contactContext.Provider>
    )
}

export const useContactContext = () => {
    return useContext(contactContext)
}