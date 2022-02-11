import styles from './style.module.scss'
import usePool from '@/hooks/usePool'
import useConfig from '@/hooks/useConfig'
import SupplyInfo from '@/components/SupplyInfo'
import KyButton from '@/components/KyButton'
import BlurBackground from '@/components/BlurBackground'
import stakeIcon from '@/assets/imgs/stake.svg'
import uniswapIcon from '@/assets/imgs/uniswap.svg'
import { Link } from 'react-router-dom'

export default function Pools() {
  const config = useConfig()
  const { pool: kylPool } = usePool('KYL')
  const { pool: lpPool } = usePool('KYLETH')

  return (
    <main className={styles.main}>
      <BlurBackground />
      <SupplyInfo />
      <section className={styles.pools}>
        <div className={styles.card}>
          <div className={styles.title}>{kylPool.tokenName} Token Pool</div>
          <div className={styles.row}>
            <img src={kylPool.icon} alt="" />
            <div className={styles.rowValue}>
              Pool APY
              <br />
              {kylPool.apy.toFixed(2)}%
            </div>
          </div>
          <div className={styles.btns}>
            <Link to="/stake/KYL">
              <KyButton
                size="large"
                type="secondary"
                disabled={kylPool.balance === 0 && kylPool.staked === 0}
              >
                <img src={stakeIcon} alt="" width="16" />
                <span>stake KYL on pool</span>
              </KyButton>
            </Link>
            <a
              href={`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${config.kyl}&chain=${config.network}`}
              target="_blank"
              rel="noreferrer"
            >
              <KyButton size="large">
                <img src={uniswapIcon} alt="" width="26" />
                <span>buy KYL on uniswap</span>
              </KyButton>
            </a>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>{lpPool.tokenName} LP Pool</div>
          <div className={styles.row}>
            <img src={lpPool.icon} alt="" />
            <div className={styles.rowValue}>
              Pool APY
              <br />
              {lpPool.apy.toFixed(2)}%
            </div>
          </div>
          <div className={styles.btns}>
            <Link to="/stake/KYLETH">
              <KyButton
                size="large"
                type="secondary"
                disabled={lpPool.balance === 0 && lpPool.staked === 0}
              >
                <img src={stakeIcon} alt="" width="16" />
                <span>stake KYL/ETH on pool</span>
              </KyButton>
            </Link>
            <a
              href={`https://app.uniswap.org/#/add/v2/ETH/${config.kyl}?chain=${config.network}`}
              target="_blank"
              rel="noreferrer"
            >
              <KyButton size="large">
                <img src={uniswapIcon} alt="" width="26" />
                <span>add KYL on uniswap</span>
              </KyButton>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
