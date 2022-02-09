import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'

import styles from './style.module.scss'
import config from '@/config'
import logoWhite from '@/assets/imgs/logoWhite.svg'
import KyButton from '@/components/KyButton'
import { useConnect, useAccount } from '@/libs/wallet/hooks'

export default function Header() {
  const { account } = useWeb3React()
  const { connected } = useAccount()
  const { connect, disconnect } = useConnect()

  const formatAccount = () => {
    if (account) {
      return account.slice(0, 6) + '...' + account.slice(-4)
    }
    return ''
  }

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logoWhite} className={styles.logo} alt="" />
      </Link>
      <div>
        {connected ? (
          <KyButton size="large" onClick={disconnect}>
            {config.network} {formatAccount()}
          </KyButton>
        ) : (
          <KyButton uppercase size="large" onClick={connect}>
            Connect
          </KyButton>
        )}
      </div>
    </header>
  )
}
