import { Link } from "react-router-dom"
import styles from "./PostDetails.module.css"

const PostDetails = ({post}) => {
  return (
    <div className={styles.post}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p>{post.text}</p>
        <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className="btn btn-outline">Detalhes</Link>
    </div>
  )
}

export default PostDetails