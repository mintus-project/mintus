import abi from '@/utils/Contract.json'
import { ethers } from 'ethers'

export const initContract = () => {
  const contractInfo = {
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: abi.abi
  }
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
  return new ethers.Contract(contractInfo.address, contractInfo.abi, signer)
}

export const register = async (
  contract,
  avatarString,
  username,
  domains,
  addresses
) => {
  try {
    let tx = await contract.register(
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

export const updateRecord = async (contract, username, domains, addresses) => {
  try {
    let tx = await contract.updateRecord(
      username,
      JSON.stringify(domains),
      JSON.stringify(addresses)
    )
    await tx.wait()
  } catch (err) {
    console.error(err)
  }
}

export const getRecord = async (contract, address) => {
  try {
    const res = await contract.getRecord(address)
    return {
      avatarString: res[0],
      username: res[1],
      domains: JSON.parse(res[2]),
      addresses: JSON.parse(res[3])
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
