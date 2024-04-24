// styles
import styles from './Dashboard.module.css'
// hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
// react-router
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const { user } = useAuthValue();
  const uid = user.uid
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)
  const { deleteDocument: deletePost } = useDeleteDocument("posts")


  if (loading){
    return (<p>Carregando posts...</p>)
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie seus posts</p>
      {posts && posts.lenght == 0 ? (
        <div className={styles.noPosts}>
          <p>Você ainda não tem posts</p>
          <Link to="/posts/create" className='btn'>Crie seu primeiro post</Link>
        </div>
      ) : (
        <div className={styles.post_section}>
          <div className={styles.post_header}>
            <h2>Título</h2>
            <h2>Ações</h2>
          </div>
          {posts && posts.map((post) => (
            <div key={post.id} className={styles.post_body}>
              <h3>{post.title}</h3>
              <div className={styles.post_buttons}>
                <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver post</Link>
                <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
                <button onClick={() => deletePost(post.id)} className='btn btn-outline btn-danger'>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard