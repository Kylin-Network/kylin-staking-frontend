import { useEffect, useMemo, useCallback } from 'react'
import { ethers } from 'ethers'

import CONFIG from '@/config'
import useMemoState from './useMemoState'
import TOKEN_ABI from '@/libs/abis/erc20.json'
import POOL_ABI from '@/libs/abis/kylPool.json'
import PAIR_ABI from '@/libs/abis/pair.json'
import { useProvider } from '@/libs/wallet/hooks'

interface SupplyInfo {
  tokenSupply: number
  poolSupply: number
  kylStaked: number
  kylLocked: number
  circulatingSupply: number
  circulatingRate: number
  stakedRate: number
  lockedRate: number
  apy: number
}

const circulatingMap = [
  ['2021-03-01', 1614528000, 67687500],
  ['2021-04-01', 1617206400, 85296875],
  ['2021-05-01', 1619798400, 102906250],
  ['2021-06-01', 1622476800, 120515625],
  ['2021-07-01', 1625068800, 139791667],
  ['2021-08-01', 1627747200, 159067708],
  ['2021-09-01', 1630425600, 178343750],
  ['2021-10-01', 1633017600, 197619792],
  ['2021-11-01', 1635696000, 216895833],
  ['2021-12-01', 1638288000, 236171875],
  ['2022-01-01', 1640966400, 247447917],
  ['2022-02-01', 1643644800, 258723958],
  ['2022-03-01', 1646064000, 270000000],
  ['2022-04-01', 1648742400, 279166667],
  ['2022-05-01', 1651334400, 288333333],
  ['2022-06-01', 1654012800, 297500000],
  ['2022-07-01', 1656604800, 306666667],
  ['2022-08-01', 1659283200, 315833333],
  ['2022-09-01', 1661961600, 325000000],
  ['2022-10-01', 1664553600, 334166667],
  ['2022-11-01', 1667232000, 343333333],
  ['2022-12-01', 1669824000, 352500000],
  ['2023-01-01', 1672502400, 360000000],
  ['2023-02-01', 1675180800, 367500000],
  ['2023-03-01', 1677600000, 375000000],
  ['2023-04-01', 1680278400, 382500000],
  ['2023-05-01', 1682870400, 390000000],
  ['2023-06-01', 1685548800, 397500000],
  ['2023-07-01', 1688140800, 405000000],
  ['2023-08-01', 1690819200, 412500000],
  ['2023-09-01', 1693497600, 420000000],
  ['2023-10-01', 1696089600, 427500000],
  ['2023-11-01', 1698768000, 435000000],
  ['2023-12-01', 1701360000, 442500000],
  ['2024-01-01', 1704038400, 450000000],
  ['2024-02-01', 1706716800, 457500000],
  ['2024-03-01', 1709222400, 465000000]
]

export default function useSupply() {
  const [supplyInfo, setSupplyInfo] = useMemoState<SupplyInfo>('supply-info', {
    tokenSupply: 0,
    poolSupply: 0,
    kylStaked: 0,
    kylLocked: 0,
    circulatingSupply: 0,
    circulatingRate: 0,
    stakedRate: 0,
    lockedRate: 0,
    apy: 0
  })
  const provider = useProvider()
  const kylContract = useMemo(() => {
    return new ethers.Contract(CONFIG.kyl, TOKEN_ABI, provider)
  }, [provider])
  const poolContract = useMemo(() => {
    return new ethers.Contract(CONFIG.pool, POOL_ABI, provider)
  }, [provider])
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

  const getCirculatingSupply = useCallback(() => {
    const now = Math.trunc(Date.now() / 1000)
    for (let i = 0; i < circulatingMap.length; i++) {
      const item = circulatingMap[i]
      if (item[1] > now) {
        if (i === 0) return circulatingMap[0][2] as number
        else return circulatingMap[i - 1][2] as number
      }
    }
    return circulatingMap[circulatingMap.length - 1][2] as number
  }, [])

  const getSupply = useCallback(async () => {
    const result = await Promise.all([
      kylContract.totalSupply(),
      poolContract.totalSupply(),
      uniContract.getReserves(),
      poolContract.rewardRate()
    ])
    const tokenSupply = Number(ethers.utils.formatUnits(result[0]))
    const poolSupply = Number(ethers.utils.formatUnits(result[1]))
    const uniStaked = Number(ethers.utils.formatUnits(result[2][0]))
    const kylStaked = poolSupply + uniStaked
    const circulatingSupply = getCirculatingSupply()
    const kylLocked = kylStaked + (tokenSupply - circulatingSupply)
    const circulatingRate = (circulatingSupply / tokenSupply || 0) * 100
    const stakedRate = (kylStaked / circulatingSupply || 0) * 100
    const lockedRate = (kylLocked / tokenSupply || 0) * 100
    const rewardRate = Number(ethers.utils.formatUnits(result[3]))
    const apy = ((rewardRate * 3600 * 24 * 365) / poolSupply || 0) * 100
    setSupplyInfo({
      tokenSupply,
      poolSupply,
      kylStaked,
      kylLocked,
      circulatingSupply,
      circulatingRate,
      stakedRate,
      lockedRate,
      apy
    })
  }, [
    kylContract,
    poolContract,
    uniContract,
    setSupplyInfo,
    getCirculatingSupply
  ])

  useEffect(() => {
    getSupply()
  }, [getSupply])

  return supplyInfo
}
