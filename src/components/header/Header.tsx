import styles from './Header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.icon}></span>
      <h1 className={styles.text}>Chicken Music</h1>
    </div>
  )
}

export default Header
