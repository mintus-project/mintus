import abi from '@/utils/Contract.json'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = '0x0165878A594ca255338adfa4d48449f69242Eb8F'

export const initContract = () => {
  // 先判断ethereum是否可用
  const { ethereum } = window
  if (!ethereum) {
    alert('Please install metamask')
    return false
  }
  // ethereum -> provider -> signer(执行合约的签名方)
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  // 建立一个合约的实体（合约地址、合约ABI(之前由hardhat编译生成的Counter.json文件)、签名方）
  return new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer)
}

const contractObj = initContract()

export const register = async (
  avatarString,
  username,
  domains,
  addresses
) => {
  try {
    let tx = await contractObj.register(
      avatarString,
      username,
      JSON.stringify(domains),
      JSON.stringify(addresses)
    )
    await tx.wait() // 确定上链
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const updateRecord = async (username, domains, addresses) => {
  try {
    let tx = await contractObj.updateRecord(
      username,
      JSON.stringify(domains),
      JSON.stringify(addresses)
    )
    await tx.wait()
  } catch (err) {
    console.error(err)
  }
}

export const getRecord = async (address) => {
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
