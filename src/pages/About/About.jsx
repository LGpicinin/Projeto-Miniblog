// styles
import styles from './About.module.css'
// react-router
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
        <h1>Sobre o Mini <span>Blog</span></h1>
        <p>É um projeto feito utilizando React no front-end e Firebase no back-end.</p>
        <Link to='/posts/create' className='btn'>Comece a criar</Link>
    </div>
  )
}

export default About