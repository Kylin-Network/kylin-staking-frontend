import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

import { LOGOS } from '@/config'
import styles from './style.module.scss'
import { useAccount, useConnect } from '@/libs/wallet/hooks'
import usePool from '@/hooks/usePool'
import KyButton from '@/components/KyButton'
import AmountInput from '@/components/AmountInput'
import SupplyInfo from '@/components/SupplyInfo'
import BlurBackground from '@/components/BlurBackground'

export default function Stake() {
  const { tokenName } = useParams()
  const { connected } = useAccount()
  const { connect } = useConnect()
  const [amount, setAmount] = useState<number>(0)
  const { pool, loading, approve, stake, claim, withdraw } = usePool(tokenName!)

  const approved = useMemo(() => {
    const amountValue = amount || 0
    if (pool?.allowance && pool.allowance > amountValue) {
      return true
    }
    return false
  }, [amount, pool])

  const [stakeDisabled, stakeText] = useMemo(() => {
    let disabled = false
    let text = 'stake'
    if (pool!.allowance === 0) {
      disabled = true
    } else if (amount > pool!.balance) {
      disabled = true
      text = `Insufficient ${pool?.tokenName} Balance`
    } else if (!amount || amount <= 0) {
      disabled = true
      text = 'Enter an amount'
    }
    return [disabled, text]
  }, [pool, amount])

  const numFormat = (value: number) => {
    if (!value) return 0
    if (value < 0.001) return value.toFixed(6)
    return value.toLocaleString()
  }

  return (
    <main className={styles.main}>
      <BlurBackground />
      <SupplyInfo />
      <div className={styles.blocks}>
        <div className={classNames(styles.block, styles.blockWrapper)}>
          <div>
            <div className={styles.title}>
              Stake {pool?.tokenName} to earn {pool?.earn}
            </div>
            <div className={styles.mainTitle}>
              {pool?.balance?.toLocaleString()}
            </div>
            <div className={styles.subTitle}>
              Current {pool?.tokenName} Balance
            </div>
            <div className={styles.mainTitle}>{pool?.apy.toFixed(2)}%</div>
            <div className={styles.subTitle}>Estimated APY</div>
          </div>
          <div className={styles.sideBottom}>
            <div className={styles.balance}>
              Available to deposit: {pool?.balance.toLocaleString()}
            </div>
            <AmountInput
              max={pool!.balance}
              value={amount!}
              onChange={value => setAmount(value)}
              suffix={
                <div className={styles.amountSuffix}>
                  <img src={LOGOS[pool!.tokenName]} alt="" />
                  <span>{pool?.tokenName}</span>
                </div>
              }
            />
            <div
              className={classNames(styles.stakeBtn, {
                [styles.approved]: approved
              })}
            >
              {!approved && (
                <KyButton
                  size="large"
                  uppercase
                  onClick={connected ? approve : connect}
                  loading={loading === 'Approve'}
                >
                  Approve
                </KyButton>
              )}
              <KyButton
                size="large"
                type="secondary"
                disabled={stakeDisabled || loading !== undefined}
                uppercase
                loading={loading === 'Stake'}
                onClick={() => stake(amount)}
              >
                {stakeText}
              </KyButton>
            </div>
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.block}>
            <img src={LOGOS[pool!.earn]} alt="" className={styles.icon} />
            <div className={styles.mainTitle}>
              {numFormat(pool!.rewards)} {pool?.earn}
            </div>
            <div className={styles.subTitle}>Unclaimed Rewards</div>
            <div className={styles.btn}>
              <KyButton
                type="secondary"
                size="large"
                uppercase
                disabled={pool!.rewards === 0 || loading !== undefined}
                onClick={claim}
                loading={loading === 'Claim'}
              >
                claim reward
              </KyButton>
            </div>
          </div>
          <div className={styles.block}>
            <img src={pool?.icon} alt="" className={styles.icon} />
            <div className={styles.mainTitle}>
              {pool?.staked} {pool?.tokenName}
            </div>
            <div className={styles.subTitle}>Total Staked</div>
            <div className={styles.btn}>
              <KyButton
                type="secondary"
                size="large"
                uppercase
                disabled={pool!.staked === 0 || loading !== undefined}
                onClick={withdraw}
                loading={loading === 'Withdraw'}
              >
                withdraw all
              </KyButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
