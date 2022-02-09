import { InputNumber } from '@arco-design/web-react'
import { ReactNode } from 'react'

import styles from './style.module.scss'

interface Props {
  value: number
  onChange: (value: number) => void
  max: number
  placeholder?: string
  suffix?: ReactNode
  disabled?: boolean
}

export default function AmountInput(props: Props) {
  return (
    <div className={styles.wrap} data-override>
      <InputNumber
        placeholder={props.placeholder}
        className={styles.input}
        value={props.value}
        onChange={props.onChange}
        min={0}
        max={props.max}
        disabled={props.disabled}
        hideControl
      />
      <button
        className={styles.btn}
        onClick={() => props.onChange(props.max)}
        disabled={props.disabled}
      >
        MAX
      </button>
      <div className={styles.suffix}>{props.suffix}</div>
    </div>
  )
}
