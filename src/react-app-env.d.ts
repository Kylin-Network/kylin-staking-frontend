/// <reference types="react-scripts" />

declare interface IPool {
  stake: string
  earn: string
  icon: string
  stakeAddr: string
  poolAddr: string
  balance: number
  allowance: number
  staked: number
  rewards: number
}

declare interface IConfig {
  current: number
  networks: {
    [chainId: number]: {
      network: string
      etherscan: string
      rpc: string
      kyl: string
      pool: string
    }
  }
}