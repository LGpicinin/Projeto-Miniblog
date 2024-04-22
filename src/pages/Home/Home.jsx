//hooks
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
//styles
import styles from './Home.module.css'
// react-router
import { useNavigate, Link } from 'react-router-dom' 
// components
import PostDetails from '../../components/PostDetails/PostDetails';


const Home = () => {

  const [query, setQuery] = useState("");
  const {documents: posts, error, loading} = useFetchDocuments("posts")
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }
  return (
    <div className={styles.home}>
        <h1>Veja os nossos posts mais recentes</h1>

        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <label>
            <input type="text" placeholder='Ou pesquise pelas tags...' value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button className="btn btn-light">Buscar</button>
          </label>
        </form>

        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {posts && posts.map((post) => (<PostDetails key={post.id} post={post}/>))}
        {posts && posts.length === 0 &&
          <div className={styles.noPosts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className='btn'>Comece a criar</Link>
          </div>
        }

        
    </div>
  )
}

export default Home