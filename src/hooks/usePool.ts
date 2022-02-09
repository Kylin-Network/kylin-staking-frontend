import { useEffect, useMemo, useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Message } from '@arco-design/web-react'

import CONFIG from '@/config'
import useMemoState from './useMemoState'
import TOKEN_ABI from '@/libs/abis/erc20.json'
import POOL_ABI from '@/libs/abis/kylPool.json'

const KYL: IPool = {
  stake: 'KYL',
  earn: 'KYL',
  icon: '/imgs/KYL.png',
  stakeAddr: CONFIG.kyl,
  poolAddr: CONFIG.pool,
  balance: 0,
  allowance: 0,
  staked: 0,
  rewards: 0
}

export type LoadingType = 'Approve' | 'Stake' | 'Claim' | 'Withdraw'

export default function usePool() {
  const { account, library } = useWeb3React<Web3Provider>()
  const [loading, setLoading] = useState<LoadingType>()
  const [pool, setPool] = useMemoState('pool', KYL)
  const kylContract = useMemo(() => {
    return new ethers.Contract(CONFIG.kyl, TOKEN_ABI, library?.getSigner())
  }, [library])
  const poolContract = useMemo(() => {
    return new ethers.Contract(CONFIG.pool, POOL_ABI, library?.getSigner())
  }, [library])

  const getSupply = useCallback(async () => {
    if (account) {
      const [balance, allowance, rewards, staked] = await Promise.all([
        kylContract?.balanceOf(account),
        kylContract?.allowance(account, CONFIG.pool),
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
  }, [kylContract, poolContract, account, setPool])

  const approve = async () => {
    try {
      setLoading('Approve')
      const trans = await kylContract?.approve(
        CONFIG.pool,
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
