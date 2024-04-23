// styles
import styles from './Dashboard.module.css'
// hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
// react-router
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const { user } = useAuthValue();
  const uid = user.uid
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

  const deletePost = (id) => {

  }

  if (loading){
    return (<p>Carregando posts...</p>)
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Gerencie seus posts</p>
      {posts && posts.lenght == 0 ? (
        <div>
          <p>Você ainda não tem posts</p>
          <Link to="/posts/create" className='btn'>Crie seu primeiro post</Link>
        </div>
      ) : (
        <div>
          <h2>Título</h2>
          <h2>Ações</h2>
          {posts && posts.map((post) => (
            <>
              <h3>{post.title}</h3>
              <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver post</Link>
              <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
              <button onClick={() => deletePost(post.id)} className='btn btn-outline btn-danger'>Excluir</button>
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard