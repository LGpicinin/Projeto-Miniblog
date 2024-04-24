// hooks
import { useReducer } from "react";
// firebase
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: false, 
    error: null,
}

const deleteReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return {loading: true, error: null}
        case 'DELETE_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state
    }

}

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState)


    const deleteDocument = async(id) => {
        
        dispatch({
            type: "LOADING",
        })
        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))
            dispatch({
                type: "DELETE_DOC",
                payload: deletedDocument
            })
        } catch (error) {
            dispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }


    return { deleteDocument, response }
}