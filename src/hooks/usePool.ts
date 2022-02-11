import { useEffect, useMemo, useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Message } from '@arco-design/web-react'

import useMemoState from './useMemoState'
import TOKEN_ABI from '@/libs/abis/erc20.json'
import POOL_ABI from '@/libs/abis/kylPool.json'
import PAIR_ABI from '@/libs/abis/pair.json'
import useConfig from './useConfig'
import { useProvider } from '@/libs/wallet/hooks'

const POOLS_MAP: IPools = {
  KYL: {
    tokenName: 'KYL',
    title: 'KYL Token Pool',
    earn: 'KYL',
    icon: '/imgs/KYL.png',
    apy: 0,
    balance: 0,
    allowance: 0,
    staked: 0,
    rewards: 0
  },
  KYLETH: {
    tokenName: 'KYL/ETH',
    title: 'KYL/ETH LP Pool',
    earn: 'KYL',
    icon: '/imgs/KYLETH.png',
    apy: 0,
    balance: 0,
    allowance: 0,
    staked: 0,
    rewards: 0
  }
}

export type LoadingType = 'Approve' | 'Stake' | 'Claim' | 'Withdraw'

export default function usePool(name: string) {
  const config = useConfig()
  const provider = useProvider()
  const addrs = useMemo(() => {
    if (name === 'KYL') {
      return {
        token: config.kyl,
        pool: config.pool
      }
    } else {
      return {
        token: config.lpToken,
        pool: config.lpPool
      }
    }
  }, [config, name])
  const { account, library } = useWeb3React<Web3Provider>()
  const [loading, setLoading] = useState<LoadingType>()
  const [pool, setPool] = useMemoState('pool-' + name, POOLS_MAP[name])
  const kylContract = useMemo(() => {
    return new ethers.Contract(addrs.token, TOKEN_ABI, library?.getSigner())
  }, [library, addrs.token])
  const poolContract = useMemo(() => {
    return new ethers.Contract(addrs.pool, POOL_ABI, library?.getSigner())
  }, [library, addrs.pool])
  const unsignedPoolContract = useMemo(() => {
    return new ethers.Contract(addrs.pool, POOL_ABI, provider)
  }, [provider, addrs.pool])
  const uniContract = useMemo(() => {
    const uniProvider = new ethers.providers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213'
    )
    return new ethers.Contract(
      '0xc60c479f3cc66f1654a4113f4949c98ce77a9995',
      PAIR_ABI,
      uniProvider
    )
  }, [])

  const getSupply = useCallback(async () => {
    const [poolSupply, rewardRate, uniReserves] = await Promise.all([
      unsignedPoolContract.totalSupply(),
      unsignedPoolContract.rewardRate(),
      uniContract.getReserves()
    ])
    const poolSupplyValue = Number(ethers.utils.formatUnits(poolSupply))
    const rewardRateValue = Number(ethers.utils.formatUnits(rewardRate))
    const uniStakedValue = Number(ethers.utils.formatUnits(uniReserves[0]))
    let apy = 0
    if (name === 'KYL') {
      apy = ((rewardRateValue * 3600 * 24 * 365) / poolSupplyValue || 0) * 100
    } else {
      apy = ((rewardRateValue * 3600 * 24 * 365) / uniStakedValue || 0) * 100
    }
    setPool(prev => ({
      ...prev,
      apy
    }))
    if (account) {
      const [balance, allowance, rewards, staked] = await Promise.all([
        kylContract?.balanceOf(account),
        kylContract?.allowance(account, addrs.pool),
        poolContract?.earned(account),
        poolContract?.balanceOf(account)
      ])
      setPool(prev => ({
        ...prev,
        balance: Number(ethers.utils.formatUnits(balance)),
        allowance: Number(ethers.utils.formatUnits(allowance)),
        rewards: Number(ethers.utils.formatUnits(rewards)),
        staked: Number(ethers.utils.formatUnits(staked))
      }))
    }
  }, [
    kylContract,
    poolContract,
    account,
    setPool,
    addrs.pool,
    unsignedPoolContract,
    name,
    uniContract
  ])

  const approve = async () => {
    try {
      setLoading('Approve')
      const trans = await kylContract?.approve(
        addrs.pool,
        ethers.constants.MaxUint256
      )
      const result = await trans.wait(1)
      if (!result.status) {
        setLoading(undefined)
        return Message.error('Error in Approved Transaction')
      }
      getSupply()
    } finally {
      setLoading(undefined)
    }
  }

  const stake = async (amount: number) => {
    try {
      setLoading('Stake')
      const amountValue = ethers.utils.parseEther(amount.toString())
      const trans = await poolContract?.stake(amountValue)
      const result = await trans.wait(1)
      if (result.status) {
        getSupply()
        Message.success('You have staked successfully')
      } else {
        Message.error('Error in Staked Transaction')
      }
    } finally {
      setLoading(undefined)
    }
  }

  const claim = async () => {
    try {
      setLoading('Claim')
      const trans = await poolContract?.getReward()
      const result = await trans.wait(1)
      if (result.status) {
        getSupply()
        Message.success('You have claimed successfully')
      } else {
        Message.error('Error in Claim Transaction')
      }
    } finally {
      setLoading(undefined)
    }
  }

  const withdraw = async () => {
    try {
      setLoading('Withdraw')
      const trans = await poolContract?.exit()
      const result = await trans.wait(1)
      if (result.status) {
        getSupply()
        Message.success('You have withdrawn successfully')
      } else {
        Message.error('Error in Withdraw Transaction')
      }
    } catch (error) {
      setLoading(undefined)
    }
  }

  useEffect(() => {
    getSupply()
  }, [getSupply])

  return {
    pool,
    loading,
    approve,
    stake,
    claim,
    withdraw
  }
}
