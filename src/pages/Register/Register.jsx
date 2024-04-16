// styles
import styles from './Register.module.css'
// hooks
import { useState, useEffect } from 'react'

const Register = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
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

        console.log(user)
    }

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
                <button className='btn'>Criar cadastro</button>
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Register