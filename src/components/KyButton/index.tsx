import classNames from 'classnames'
import { FC } from 'react'
import { IconLoading } from '@arco-design/web-react/icon'

import styles from './style.module.scss'

interface Props {
  type?: 'primary' | 'secondary'
  size?: 'normal' | 'large'
  disabled?: boolean
  onClick?: () => void
  uppercase?: boolean
  loading?: boolean
}

const KyButton: FC<Props> = props => {
  const type = props.type || 'primary'
  const size = props.size || 'normal'
  const uppercase = props.uppercase || false
  const names = classNames(styles.button, styles[type], styles[size], {
    [styles.uppercase]: uppercase
  })

  return (
    <button
      className={names}
      disabled={props.disabled || props.loading}
      onClick={props.onClick}
    >
      {props.loading && <IconLoading className={styles.loading} />}
      {props.children}
    </button>
  )
}

export default KyButton
