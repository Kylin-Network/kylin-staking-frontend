const CONFIGS: IConfig = {
  current: 3,
  networks: {
    3: {
      network: 'Ropsten',
      etherscan: 'https://ropsten.etherscan.io',
      rpc: 'https://ropsten.infura.io/v3/84842078b09946638c03157f83405213',
      kyl: '0x935B35CFA912699F819d3789d09Ab6045e62d686',
      pool: '0x4D45F1EfD80880Bae64358e4e6328b69994bf66F'
    }
  }
}

const CONFIG = {
  chainId: CONFIGS.current,
  ...CONFIGS.networks[CONFIGS.current]
}

const URLS: any = {}
for (const key in CONFIGS.networks) {
  URLS[key] = CONFIGS.networks[key].rpc
}

const LOGOS: any = {
  KYL: '/imgs/KYL.png'
}

const CHAIN_IDS = Object.keys(CONFIGS.networks).map(key => Number(key))
export { CHAIN_IDS, URLS, LOGOS }
export default CONFIG
