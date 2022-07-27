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
  const { ethereum } = window
  const walletChain = await ethereum.request({ method: 'eth_chainId' })
  if (walletChain == '0x61') {
    return true
  } else {
    return false
  }
}

export const addBinanceChain = async () => {
  const { ethereum } = window
  await ethereum.request({
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
  const isTargetChain = await checkChain()
  return isTargetChain
}

export const checkEnv = async () => {
  const { ethereum } = window
  if (!ethereum) {
    throw new Error('Please install Metamask')
  }
  const isTargetChain = await checkChain()
  if (!isTargetChain) {
    const success = await addBinanceChain()
    if (!success) {
      throw new Error('Please use Binance Smart Chain Testnet (Chain ID:97)')
    }
  }
}