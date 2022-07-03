import contract from '@/utils/Contract.json'
import { ethers } from 'ethers'
// initContract - checkChain - addBinanceChain
// export const initContract = async () => {
//   // 先判断ethereum是否可用
//   const { ethereum } = window
//   if (!ethereum) {
//     alert('Please install metamask')
//     return undefined
//   }
//   const isTargetChain = checkChain()
//   if (!isTargetChain) {
//     await addBinanceChain()
//     // ethereum -> provider -> signer(执行合约的签名方)
//     const provider = new ethers.providers.Web3Provider(ethereum)
//     const signer = provider.getSigner()
//     // 建立一个合约的实体
//     return new ethers.Contract(contract.address, contract.abi, signer)
//   } else {

//     return false
//   }
// }
export const checkChain = async () => {
  const { ethereum } = window
  const currentChain = await ethereum.request({ method: 'eth_chainId' })
  if (currentChain === contract.chainId) {
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

export const initContract = () => {
  // ethereum -> provider -> signer(执行合约的签名方)
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  // 建立一个合约的实体
  return new ethers.Contract(contract.address, contract.abi, signer)
}

export const register = async (avatarString, username, domains, addresses) => {
  await checkEnv()
  const contractObj = initContract()
  let tx = await contractObj.regist(
    avatarString,
    username,
    JSON.stringify(domains),
    JSON.stringify(addresses),
    { value: ethers.utils.parseEther(contract.registerServiceFee) }
  )
  await tx.wait() // 确定上链
  return true
}

export const updateRecord = async (username, domains, addresses) => {
  await checkEnv()
  const contractObj = initContract()
  let tx = await contractObj.updateRecord(
    username,
    JSON.stringify(domains),
    JSON.stringify(addresses),
    { value: ethers.utils.parseEther(contract.updateServiceFee) }
  )
  await tx.wait()
  return true
}

export const getRecord = async (address) => {
  await checkEnv()
  const contractObj = initContract()
  const res = await contractObj.getRecord(address)
  return {
    avatarString: res[0] ?? '',
    username: res[1] ?? '',
    domains: res[2] ? JSON.parse(res[2]) : [],
    addresses: res[3] ? JSON.parse(res[3]) : []
  }
}

export const getOwner = async (avatarString) => {
  await checkEnv()
  const contractObj = initContract()
  const res = await contractObj.getOwner(avatarString)
  return res
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
