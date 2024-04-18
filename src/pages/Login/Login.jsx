// styles
import styles from './Login.module.css'
// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {login, loading, error: authError} = useAuthentication()

  const handleSubmit = async(e) => {
    e.preventDefault()

    setError("");
    const user = {
        email,
        password,
    }

    const res = await login({email, password});
    console.log(res)
    
  }

  useEffect(() => {
      if(authError){
          setError(authError);
      }
  }, [authError]);

  return (
    <div className={styles.login}>
            <h2>Faça o login e compartilhe suas ideias!</h2>
            <form onSubmit={handleSubmit}>
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
                {!loading && <button className='btn'>Fazer login</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
  )
}

export default Login