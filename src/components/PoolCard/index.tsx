import { Link } from 'react-router-dom'

import styles from './style.module.scss'
import KyButton from '../KyButton'
import stakeIcon from '@/assets/imgs/stake.svg'
import uniswapIcon from '@/assets/imgs/uniswap.svg'

interface Props {
  stake: string
  icon: string
  apy: string
  disabled?: boolean
  stakeLink?: string
  addLink?: string
}

export default function PoolCard(props: Props) {
  const poolBtn = (
    <KyButton size="large" type="secondary" disabled={props.disabled}>
      <img src={stakeIcon} alt="" width="16" />
      <span>stake {props.stake} on pool</span>
    </KyButton>
  )

  const renderPoolBtn = () => {
    if (props.stakeLink && !props.disabled) {
      return (
        <a href={props.stakeLink} target="_blank" rel="noreferrer">
          {poolBtn}
        </a>
      )
    }
    if (!props.stakeLink && !props.disabled) {
      return <Link to="/stake">{poolBtn}</Link>
    }
    return poolBtn
  }

  return (
    <div className={styles.card}>
      <div className={styles.title}>{props.stake} Token Pool</div>
      <div className={styles.row}>
        <img src={props.icon} alt="" />
        <div className={styles.rowValue}>
          Pool APY
          <br />
          {props.apy}
        </div>
      </div>
      <div className={styles.btns}>
        {renderPoolBtn()}
        <a href={props.addLink} target="_blank" rel="noreferrer">
          <KyButton size="large">
            <img src={uniswapIcon} alt="" width="26" />
            <span>add {props.stake} on uniswap</span>
          </KyButton>
        </a>
      </div>
    </div>
  )
}
