import { initContract, updateContract } from '@/services/contract'
import { ethers } from 'ethers'
import { useStore } from '@/store/index.js'
import { WALLET_TYPE_LIST } from '@/utils/constant'

export const detectProviders = () => {
  const providers = {}
  if (window.BinanceChain) {
    providers.Binance = web3ProviderFactory(
      window.BinanceChain,
      WALLET_TYPE_LIST.binance
    )
  }
  if (window.ethereum) {
    // edge case if MM and CBW are both installed
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach(async (p) => {
        if (p.isMetaMask)
          providers.MetaMask = web3ProviderFactory(p, WALLET_TYPE_LIST.metaMask)
        if (p.isCoinbaseWallet)
          providers.Coinbase = web3ProviderFactory(p, WALLET_TYPE_LIST.coinbase)
      })
    } else {
      if (window.ethereum.isCoinbaseWallet)
        providers.Coinbase = web3ProviderFactory(
          window.ethereum,
          WALLET_TYPE_LIST.coinbase
        )
      if (window.ethereum.isMetaMask)
        providers.MetaMask = web3ProviderFactory(
          window.ethereum,
          WALLET_TYPE_LIST.metaMask
        )
    }
  }
  return providers
}

export const web3ProviderFactory = (provider, type) => {
  if (!provider) {
    return undefined
  }
  const web3Provider = new ethers.providers.Web3Provider(provider)
  web3Provider.walletType = type
  return web3Provider
}

window.detectProviders = detectProviders

export const initWallet = async () => {
  const providers = detectProviders()
  window.selectedProvider =
    providers.Binance || providers[Object.keys(providers)[0]]
  if (window.selectedProvider) {
    try {
      window.selectedProvider.provider.on(
        'accountsChanged',
        handleAccountsChanged
      )
      window.selectedProvider.provider.on('chainChanged', handleChainChanged)
      window.selectedProvider.provider.on('disconnect', handleDisconnect)
      const accounts = await window.selectedProvider.provider.request({
        method: 'eth_accounts'
      })
      handleAccountsChanged(accounts)
    } catch (error) {
      console.error(error)
    }
  } else {
    throw new Error('No wallet extension was found.')
  }
}

export const connectWallet = async () => {
  if (window.selectedProvider !== undefined) {
    window.selectedProvider.provider.on(
      'accountsChanged',
      handleAccountsChanged
    )
    window.selectedProvider.provider.on('chainChanged', handleChainChanged)
    window.selectedProvider.provider.on('disconnect', handleDisconnect)
    window.selectedProvider.provider
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          throw new Error('Please connect to your wallet.')
        } else {
          throw err
        }
      })
  } else {
    throw new Error('No wallet extension was found.')
  }
}

export const handleAccountsChanged = async (accounts) => {
  console.log('accounts changed', accounts)
  const store = useStore()
  if (accounts?.length !== 0) {
    // 先更新Contract实例（将其绑定到新账户对应的Signer）
    await updateContract()
    store.setWalletInfo({
      address: accounts[0],
      type: window.selectedProvider.walletType
    })
    store.setUserInfo({ connected: true })
    store.setChainInfo(window.selectedProvider?.provider?.chainId)
  } else {
    initContract()
    store.setUserInfo({ connected: false })
  }
}

export const handleChainChanged = async (chainId) => {
  console.log('chain changed', chainId)
  await updateContract()
  const store = useStore()
  store.setChainInfo(chainId)
}

export const handleDisconnect = (e) => {
  console.log('disconnect', e)
}
