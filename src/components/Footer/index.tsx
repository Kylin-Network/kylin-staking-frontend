import styles from './style.module.scss'
import logoWhite from '@/assets/imgs/logoWhite.svg'
import twitter from '@/assets/imgs/twitter.svg'
import telegram from '@/assets/imgs/telegram.svg'
import networks from '@/assets/imgs/networks.svg'
import medium from '@/assets/imgs/medium.svg'
import github from '@/assets/imgs/github.svg'
import email from '@/assets/imgs/email.svg'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img src={logoWhite} alt="" className={styles.logo} />
          <div>The Polkadot Data Blockchain</div>
        </div>
        <div className={styles.links}>
          <div className={styles.block}>
            <div className={styles.blockTitle}>About</div>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Technology
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Crowdloan
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Tokenomics
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Brand Assets
            </a>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Resources</div>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Project Wiki
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Whitepaper
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              One Pager
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Overview Deck
            </a>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Foundation</div>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Meet Our Backers
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Ecosystem and Partners
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Press about Us
            </a>
            <a href="https://kylin.network/" target="_blank" rel="noreferrer">
              Roadmap
            </a>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Contact</div>
            <div className={styles.icons}>
              <a href="https://kylin.network/" target="_blank" rel="noreferrer">
                <img src={networks} alt="" />
              </a>
              <a href="https://twitter.com/Kylin_Network" target="_blank" rel="noreferrer">
                <img src={twitter} alt="" />
              </a>
              <a href="https://medium.com/@kylinNetwork" target="_blank" rel="noreferrer">
                <img src={medium} alt="" />
              </a>
              <a href="https://t.me/KylinOfficial" target="_blank" rel="noreferrer">
                <img src={telegram} alt="" />
              </a>
              <a href="https://github.com/Kylin-Network" target="_blank" rel="noreferrer">
                <img src={github} alt="" />
              </a>
              <a href="mailto:info@kylin.network">
                <img src={email} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        © Copyright {year}. All Rights Reserved.
      </div>
    </footer>
  )
}
