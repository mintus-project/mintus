import contract from '@/utils/Contract.json'
import { ethers } from 'ethers'

export const addBinanceChain = async () => {
  const { ethereum } = window
  ethereum
    .request({
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
    .then(() => {
      console.log('网络切换成功')
      return true
    })
    .catch((e) => {
      console.error(e)
    })
}
export const checkChain = () => {
  const { ethereum } = window
  if (ethereum) {
    if (ethereum?.chainId === contract.chainId) {
      return true
    } else {
      // addBinanceChain()
      return false
    }
  } else {
    alert('Please install metamask')
    return false
  }
}
export const initContract = () => {
  // 先判断ethereum是否可用
  const { ethereum } = window
  if (!ethereum) {
    alert('Please install metamask')
    return false
  }

  if (checkChain()) {
    // ethereum -> provider -> signer(执行合约的签名方)
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // 建立一个合约的实体
    return new ethers.Contract(contract.address, contract.abi, signer)
  } else {
    return false
  }
}

const contractObj = initContract()

export const register = async (avatarString, username, domains, addresses) => {
  if (!checkChain()) {
    throw new Error('Please use Binance Smart Chain Testnet (Chain ID:97)')
  }
  try {
    let tx = await contractObj.regist(
      avatarString,
      username,
      JSON.stringify(domains),
      JSON.stringify(addresses),
      { value: ethers.utils.parseEther(contract.registerServiceFee) }
    )
    await tx.wait() // 确定上链
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const updateRecord = async (username, domains, addresses) => {
  if (!checkChain()) {
    throw new Error('Please use Binance Smart Chain Testnet (Chain ID:97)')
  }
  try {
    let tx = await contractObj.updateRecord(
      username,
      JSON.stringify(domains),
      JSON.stringify(addresses),
      { value: ethers.utils.parseEther(contract.updateServiceFee) }
    )
    await tx.wait()
    return true
  } catch (err) {
    console.error(err)
  }
  return false
}

export const getRecord = async (address) => {
  if (!checkChain()) {
    throw new Error('Please use Binance Smart Chain Testnet (Chain ID:97)')
  }
  try {
    const res = await contractObj.getRecord(address)
    return {
      avatarString: res[0] ?? '',
      username: res[1] ?? '',
      domains: res[2] ? JSON.parse(res[2]) : [],
      addresses: res[3] ? JSON.parse(res[3]) : []
    }
  } catch (err) {
    console.error(err)
  }
}

export const getOwner = async (avatarString) => {
  if (!checkChain()) {
    throw new Error('Please use Binance Smart Chain Testnet (Chain ID:97)')
  }
  try {
    const res = await contractObj.getOwner(avatarString)
    return res
  } catch (err) {
    console.error(err)
  }
  return false
}

export const getEstimatedGasFee = async (from, to) => {
  try {
    const { ethereum } = window
    if (ethereum) {
      console.log(111111, {
        method: 'eth_estimateGas',
        params: [{ from, to }]
      })
      const res = await ethereum.request({
        method: 'eth_estimateGas',
        params: [{ from, to }]
      })
      return res
    }
  } catch (err) {
    console.error(err)
  }
}

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
window.getChainInfoByChainId = getChainInfoByChainId
