import styles from './style.module.scss'
import useSupply from '@/hooks/useSupply'

export default function SupplyInfo() {
  const supply = useSupply()

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
    <section className={styles.top}>
      <div className={styles.topItem}>
        <div className={styles.topTitle}>Circulating Supply</div>
        <div className={styles.topRow}>
          <span className={styles.topValue}>
            {numFormat(supply.circulatingSupply)}
          </span>
          <span className={styles.topDesc}>
            {' '}
            / {numFormat(supply.tokenSupply)}
          </span>
        </div>
        <div className={styles.topRow}>
          <span className={styles.topValue}>
            {numFormat(supply.circulatingRate)}%
          </span>
          <span className={styles.topDesc}> of Total Supply</span>
        </div>
      </div>
      <div className={styles.topItem}>
        <div className={styles.topTitle}>Total KYL Staked</div>
        <div className={styles.topRow}>
          <span className={styles.topValue}>{numFormat(supply.kylStaked)}</span>
          <span className={styles.topDesc}>
            {' '}
            / {numFormat(supply.circulatingSupply)}
          </span>
        </div>
        <div className={styles.topRow}>
          <span className={styles.topValue}>
            {numFormat(supply.stakedRate)}%
          </span>
          <span className={styles.topDesc}> of Circulating Supply</span>
        </div>
      </div>
      <div className={styles.topItem}>
        <div className={styles.topTitle}>Total KYL Locked</div>
        <div className={styles.topRow}>
          <span className={styles.topValue}>{numFormat(supply.kylLocked)}</span>
          <span className={styles.topDesc}>
            {' '}
            / {numFormat(supply.tokenSupply)}
          </span>
        </div>
        <div className={styles.topRow}>
          <span className={styles.topValue}>
            {numFormat(supply.lockedRate)}%
          </span>
          <span className={styles.topDesc}> of Total Supply</span>
        </div>
      </div>
    </section>
  )
}
