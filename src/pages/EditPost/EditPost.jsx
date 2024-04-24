// styles
import styles from './EditPost.module.css'
// hooks
import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [text, setText] = useState("")
  const [tags, setTags] = useState("")

  const [formError, setFormError] = useState("")

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { document: post, error: fetchError, loading: fetchLoading } = useFetchDocument("posts", id);
  const { updateDocument, response } = useUpdateDocument("posts")

  useEffect(() => {
    if(post){
        setTitle(post.title);
        setImage(post.image);
        setText(post.text);

        const tagsString = post.tagsArray.join(" ");
        setTags(tagsString);
    }
  }, [post])

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


    const data = {
        title,
        image,
        text,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
    }

    updateDocument(data, id)
  
    navigate("/dashboard")
    
  
  }
  return (
    <div className={styles.edit_post}>
      {post && !fetchLoading && (
        <>
            <h1>Edite seu Post</h1>
            <form onSubmit={handleSubmit}>
            <label>
                <span>Título</span>
                <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Escreva um título...' required/>
            </label>
            <label>
                <span>Imagem</span>
                <input type="text" name='image' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Escolha uma imagem em URL...' required/>
            </label>
            <h3 className={styles.preview_text}>Preview da imagem</h3>
            <img className={styles.preview_image} src={post.image} alt={post.title} />
            <label>
                <span>Conteúdo</span>
                <textarea name='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Excreva o conteúdo do post...' required></textarea>
            </label>
            <label>
                <span>Tags</span>
                <input type="text" name='tags' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Escreva as tags do post separadas por espaço...' required/>
            </label>
            {formError && <p className='error'>{formError}</p>}
            {!response.loading && <button className='btn'>Salvar alterações</button>}
            {response.loading && <button className='btn' disabled>Aguarde...</button>}
            {response.error && <p className='error'>{response.error}</p>}
            </form>
        </>
      )}
      {fetchLoading && <p>Carregando...</p>}
      {fetchError && <p className='error'>{fetchError}</p>}
    </div>
  )
}

export default EditPost