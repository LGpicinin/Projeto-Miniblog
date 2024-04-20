// hooks
import { useState, useEffect } from "react";
// firebase
import { query, collection, orderBy, onSnapshot, where} from 'firebase/firestore'
import { db } from '../firebase/config'

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async function loadData(){
            setLoading(true);

            const collectionRef = await collection(db, docCollection);


            try {
                let q = await query(collectionRef, orderBy("createdAt", "desc"));
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                });
            } catch (error) {
                console.log(error);
                setError(error.message);
            }

            setLoading(false)
        }

        loadData();

    }, [docCollection, search, uid]);


    return {documents, error, loading};
}