import { ethers } from 'ethers'
import contract from '@/utils/Contract.json'
import { checkEnv } from './utils'

export const initContract = () => {
  // const provider = ethers.providers.getDefaultProvider(['1']) // 上主网之后default is better（更快更稳定）
  const provider = new ethers.providers.JsonRpcProvider(
    'https://data-seed-prebsc-2-s3.binance.org:8545'
  )
  // 合约实体
  const contractObj = new ethers.Contract(
    contract.address,
    contract.abi,
    provider
  )
  window.Contract = contractObj ?? {}
  return contractObj
}
export const updateContract = async () => {
  try {
    if (window.ethereum.selectedAddress !== null) {
      await checkEnv()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const newContract = window?.Contract?.connect(signer)
      window.Contract = newContract
    }
  } catch (e) {
    console.error(e)
    window.Contract = initContract()
  }
}

// 和钱包地址有关的操作(写操作、根据地址查询购买记录）都需要检查是否连接到了测试网上 [改为仅在切换网络时提醒一次]
export const register = async (avatarString, username, domains, addresses) => {
  // await checkEnv()
  let tx = await window.Contract?.regist(
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
  // await checkEnv()
  let tx = await window.Contract?.updateRecord(
    username,
    JSON.stringify(domains),
    JSON.stringify(addresses),
    { value: ethers.utils.parseEther(contract.updateServiceFee) }
  )
  await tx.wait()
  return true
}

export const getRecord = async (address) => {
  // await checkEnv()
  const res = await window.Contract?.getRecord(address)
  return {
    avatarString: res[0] ?? '',
    username: res[1] ?? '',
    domains: res[2] ? JSON.parse(res[2]) : [],
    addresses: res[3] ? JSON.parse(res[3]) : []
  }
}

export const getOwner = async (avatarString) => {
  const res = await window.Contract?.getOwner(avatarString)
  return res
}

// 燃油费估算
// 1 BNB = 1000000000 Gwei, 1 Gwei = 1000000000 Wei
export const estimateRegisterGas = async (avatarString, username, domains, addresses) => {
  const gasAmount = await window.Contract?.estimateGas.regist(
    avatarString,
    username,
    JSON.stringify(domains),
    JSON.stringify(addresses),
    { value: ethers.utils.parseEther(contract.registerServiceFee) }
  )
  const gasPrice = await window.Contract?.provider.getGasPrice() // 单位：Wei, 类型：BigNumber
  const gasFee = gasPrice.mul(gasAmount)
  const totalFee = gasFee.add(ethers.utils.parseEther(contract.registerServiceFee))
  const gasFeeInBnB = ethers.utils.formatUnits(gasFee, 18)   // 单位：BNB, 类型：string
  const totalFeeInBnB = ethers.utils.formatUnits(totalFee, 18)
  // console.log('gas fee:', gasFee, 'totalFee', totalFee)
  return [gasFeeInBnB, totalFeeInBnB]
}
export const estimateUpdateRecordGas = async (username, domains, addresses) => {
  const gasAmount = await window.Contract?.estimateGas.updateRecord(
    username,
    JSON.stringify(domains),
    JSON.stringify(addresses),
    { value: ethers.utils.parseEther(contract.updateServiceFee) }
  )
  const gasPrice = await window.Contract?.provider.getGasPrice() 
  const gasFee = gasPrice.mul(gasAmount)
  const totalFee = gasFee.add(ethers.utils.parseEther(contract.updateServiceFee))
  const gasFeeInBnB = ethers.utils.formatUnits(gasFee, 18)  
  const totalFeeInBnB = ethers.utils.formatUnits(totalFee, 18)
  return [gasFeeInBnB, totalFeeInBnB]
}

const ContractServices = {
  register,
  updateRecord,
  getRecord,
  getOwner,
  estimateRegisterGas,
  estimateUpdateRecordGas
}

export default ContractServices
