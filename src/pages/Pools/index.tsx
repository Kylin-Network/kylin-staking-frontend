import styles from './style.module.scss'
import usePool from '@/hooks/usePool'
import useSupply from '@/hooks/useSupply'
import PoolCard from '@/components/PoolCard'
import BlurBackground from '@/components/BlurBackground'

export default function Pools() {
  const { pool } = usePool()
  const supplyInfo = useSupply()

  const convertNum = (num: number) => {
    return Number(num.toFixed(2)).toString()
  }

  const numFormat = (num: number) => {
    num = num || 0
    let value = ''
    if (num < 1000000) value = `${convertNum(num)}`
    else if (num >= 1000000 && num < 100000000) {
      value = `${convertNum(num / 1000000)} Million`
    } else {
      value = `${convertNum(num / 1000000000)} Billion`
    }
    return value
  }

  return (
    <main className={styles.main}>
      <BlurBackground />
      <section className={styles.top}>
        <div className={styles.topItem}>
          <div className={styles.topTitle}>Circulating Supply</div>
          <div className={styles.topRow}>
            <span className={styles.topValue}>
              {numFormat(supplyInfo.circulatingSupply)}
            </span>
            <span className={styles.topDesc}>
              {' '}
              / {numFormat(supplyInfo.tokenSupply)}
            </span>
          </div>
          <div className={styles.topRow}>
            <span className={styles.topValue}>
              {numFormat(supplyInfo.circulatingRate)}%
            </span>
            <span className={styles.topDesc}> of Total Supply</span>
          </div>
        </div>
        <div className={styles.topItem}>
          <div className={styles.topTitle}>Total KYL Staked</div>
          <div className={styles.topRow}>
            <span className={styles.topValue}>
              {numFormat(supplyInfo.kylStaked)}
            </span>
            <span className={styles.topDesc}>
              {' '}
              / {numFormat(supplyInfo.circulatingSupply)}
            </span>
          </div>
          <div className={styles.topRow}>
            <span className={styles.topValue}>
              {numFormat(supplyInfo.stakedRate)}%
            </span>
            <span className={styles.topDesc}> of Circulating Supply</span>
          </div>
        </div>
        <div className={styles.topItem}>
          <div className={styles.topTitle}>Total KYL Locked</div>
          <div className={styles.topRow}>
            <span className={styles.topValue}>
              {numFormat(supplyInfo.kylLocked)}
            </span>
            <span className={styles.topDesc}>
              {' '}
              / {numFormat(supplyInfo.tokenSupply)}
            </span>
          </div>
          <div className={styles.topRow}>
            <span className={styles.topValue}>
              {numFormat(supplyInfo.lockedRate)}%
            </span>
            <span className={styles.topDesc}> of Total Supply</span>
          </div>
        </div>
      </section>
      <section className={styles.pools}>
        <PoolCard
          stake={pool.stake}
          icon={pool.icon}
          disabled={!pool.balance}
          apy={numFormat(supplyInfo.apy) + '%'}
          addLink="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c&chain=mainnet"
        />
        <PoolCard
          stake="KYL/ETH"
          icon="/imgs/KYLETH.png"
          stakeLink="https://v2.info.uniswap.org/pair/0xc60c479f3cc66f1654a4113f4949c98ce77a9995"
          addLink="https://app.uniswap.org/#/add/v2/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c/ETH?chain=mainnet"
          apy={numFormat(supplyInfo.apy) + '%'}
        />
      </section>
    </main>
  )
}
