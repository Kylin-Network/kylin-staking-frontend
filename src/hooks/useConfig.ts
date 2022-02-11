import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { CONFIGS } from '@/config'

export default function useConfig() {
  const { chainId } = useWeb3React()

  const config = useMemo(() => {
    return CONFIGS.networks[chainId || CONFIGS.current]
  }, [chainId])

  return config
}
