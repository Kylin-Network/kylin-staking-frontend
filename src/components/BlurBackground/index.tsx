import styles from './style.module.scss'

export default function BlurBackground() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.ball1} />
        <div className={styles.ball2} />
        <div className={styles.ball3} />
      </div>
    </div>
  )
}