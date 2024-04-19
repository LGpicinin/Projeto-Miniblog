// styles
import styles from './CreatePost.module.css'
// hooks
import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [text, setText] = useState("")
  const [tags, setTags] = useState("")
  const [formError, setFormError] = useState("")
  const navigate = useNavigate();
  const {user} = useAuthValue()
  const {insertDocument, response} = useInsertDocument("posts")

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
      return;
    }

    const tagsArray = tags.split(" ").map((tag) => tag.trim().toLowerCase());


    insertDocument({
      title,
      image,
      text,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    })
  
    navigate("/")
    
  
  }
  return (
    <div className={styles.create_post}>
      <h2>Crie seu Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Escreva um título...' required/>
        </label>
        <label>
          <span>Imagem</span>
          <input type="text" name='image' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Escolha uma imagem em URL...' required/>
        </label>
        <label>
          <span>Conteúdo</span>
          <textarea name='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Excreva o conteúdo do post...' required></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input type="text" name='tags' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Escreva as tags do post separadas por espaço...' required/>
        </label>
        {!response.loading && <button className='btn'>Criar post</button>}
        {response.loading && <button className='btn' disabled>Aguarde...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost