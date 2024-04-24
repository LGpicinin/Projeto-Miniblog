// hooks
import { useReducer } from "react";
// firebase
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
    loading: false, 
    error: null,
}

const updateReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return {loading: true, error: null}
        case 'UPDATE_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state
    }

}

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState)


    const updateDocument = async(data, id) => {
        
        dispatch({
            type: "LOADING",
        })
        try {
            const docRef = await doc(db, docCollection, id)
            const updatedDocument = await updateDoc(docRef, data)

            dispatch({
                type: "UPDATE_DOC",
                payload: updatedDocument
            })
            
        } catch (error) {
            dispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }


    return { updateDocument, response }
}