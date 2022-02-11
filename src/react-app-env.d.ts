/// <reference types="react-scripts" />

declare interface IPool {
  tokenName: string
  title: string
  earn: string
  icon: string
  apy: number
  balance: number
  allowance: number
  staked: number
  rewards: number
}

declare interface IPools {
  [poolName: string]: IPool
}

declare interface IConfig {
  current: number
  networks: {
    [chainId: number]: {
      network: string
      rpc: string
      kyl: string
      pool: string
      lpToken: string
      lpPool: string
    }
  }
}