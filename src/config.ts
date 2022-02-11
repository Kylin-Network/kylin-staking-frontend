const CONFIGS: IConfig = {
  current: 3,
  networks: {
    1: {
      network: 'Mainnet',
      rpc: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
      kyl: '0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c',
      pool: '0xb74eb10e8a183cade3dae09d3265998e75fba37a',
      lpToken: '0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c',
      lpPool: '0xb74eb10e8a183cade3dae09d3265998e75fba37a'
    },
    3: {
      network: 'Ropsten',
      rpc: 'https://ropsten.infura.io/v3/84842078b09946638c03157f83405213',
      kyl: '0x935B35CFA912699F819d3789d09Ab6045e62d686',
      pool: '0x4D45F1EfD80880Bae64358e4e6328b69994bf66F',
      lpToken: '0x2381930972de03712c98eabb08b6b42a4e64f1ac',
      lpPool: '0x71BDb782887B6Cc1E78C2b65A9898f3e54bd2Dd6'
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
  KYL: '/imgs/KYL.png',
  'KYL/ETH': '/imgs/KYLETH.png'
}

const CHAIN_IDS = Object.keys(CONFIGS.networks).map(key => Number(key))
export { CHAIN_IDS, URLS, LOGOS, CONFIGS }
export default CONFIG
