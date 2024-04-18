import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'



export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    const checkIfIsCancelled = () => {
        if(cancelled){
            return;
        }
    }


    // cria usuário

    const createUser = async(data) => {
        checkIfIsCancelled();
        setError(null)
        setLoading(true)

        try {
            const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, {displayName: data.userName});
            setLoading(false);
        } catch (error) {
            if(error.message.includes("Password")){
                setError("A senha deve ter pelo menos 6 caracteres");
            } else if(error.message.includes("invalid-email")){
                setError("E-mail inválido");
            }
            else{
                setError("Ocorreu um erro. Tente novamente mais tarde");
            }
        }
    }

    // login

    const login = async(data) => {
        checkIfIsCancelled();
        setError(null)
        setLoading(true)

        try {
            const {user} = await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            if(error.message.includes("invalid-credential")){
                setError("Usuário ou senha inválidos.");
            }
            else{
                setError("Ocorreu um erro. Tente novamente mais tarde");
            }
        }

        setLoading(false)
    }


    // log out

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])


    return {auth, createUser, loading, error, logout, login};
}