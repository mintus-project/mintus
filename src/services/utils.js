import { WALLET_TYPE_LIST } from '@/utils/constant'

export const fetchChainList = async () => {
  try {
    const res = await fetch('https://chainid.network/chains.json')
    const json = await res.json()
    return json
  } catch (e) {
    console.error(e)
  }
}

export const getChainInfoByChainId = async (chainId) => {
  const list = await fetchChainList()
  return list.filter((item) => item.chainId === chainId)?.[0]
}

// 检查钱包是否连接到测试网上
export const checkChain = async () => {
  const walletChain = window.selectedProvider?.provider.chainId ?? ''
  if (walletChain === '0x61') {
    return true
  } else {
    return false
  }
}

export const addBinanceTestnet = async () => {
  if (window.selectedProvider) {
    if (window.selectedProvider === WALLET_TYPE_LIST.binance) {
      await window.selectedProvider.provider.switchNetwork('bsc-testnet')
    } else {
      await window.selectedProvider.provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x61',
            chainName: 'Binance Smart Chain Testnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'tBNB',
              decimals: 18
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
            blockExplorerUrls: ['https://testnet.bscscan.com']
          }
        ]
      })
    }
  }
  const isTargetChain = await checkChain()
  return isTargetChain
}

export const checkEnv = async () => {
  const isTargetChain = await checkChain()
  if (!isTargetChain) {
    const success = await addBinanceTestnet()
    if (!success) {
      throw new Error('Please use Binance Smart Chain Testnet (Chain ID:97)')
    }
  }
}