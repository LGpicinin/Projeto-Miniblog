import { db } from '../../firebase/config'
// styles
import styles from './Register.module.css'
// hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const {createUser, loading, error: authError} = useAuthentication()

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setError("As senhas precisam ser iguais!");
            return;
        }

        setError("");
        const user = {
            userName,
            email,
            password,
        }

        const res = await createUser({email, password, userName});
        console.log(res)
        
    }

    useEffect(() => {
        if(authError){
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.register}>
            <h2>Cadastre-se e compartilhe suas ideias!</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome: </span>
                    <input 
                        type="text" 
                        name="userName" 
                        required 
                        placeholder="Nome do usuário" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}/>
                </label>
                <label>
                    <span>E-mail: </span>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="E-mail do usuário" 
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    <span>Senha: </span>
                    <input 
                        type="password" 
                        name="password"
                        required 
                        placeholder="Digite a senha" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>
                    <span>Confirmar senha: </span>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        required 
                        placeholder="Confirme a senha" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                </label>
                {!loading && <button className='btn'>Criar cadastro</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Register