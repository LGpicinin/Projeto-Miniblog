// styles
import styles from "./Search.module.css"
// hooks
import { useQuery } from "../../hooks/useQuery"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
// react-router
import { Link } from "react-router-dom";
// components
import PostDetails from "../../components/PostDetails/PostDetails";

const Search = () => {

    const query = useQuery();
    const search = query.get("q");
    const {documents: posts, error, loading} = useFetchDocuments("posts", search)

    return (
        <div className={styles.search}>
            <h2>Resultados</h2>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {posts && posts.map((post) => (<PostDetails key={post.id} post={post}/>))}
            {posts && posts.length === 0 &&
            <div className={styles.noPosts}>
                <p>Não foram encontrados posts referentes a busca...</p>
                <Link to="/" className='btn btn-light'>Voltar</Link>
            </div>
            }
        </div>
    )
}

export default Search