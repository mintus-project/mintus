import axios from 'axios'
import {Alchemy} from 'alchemy-sdk'

export const getNFTs = async(params, isTestNet) => {
  const API_KEY = ''
  const options = {
  method: 'GET',
  url: `https://${isTestNet ? 'testnets-' : ''}api.opensea.io/api/v1/assets`,
  params,
  headers: {Accept: 'application/json', 'X-API-KEY': API_KEY ? API_KEY : 'null'}
}

return await axios.request(options)
}

export const getNFTsFromSelectedNetwork = async (walletAddress, network) => {
  const config = {
    apiKey: '',
    network
  }
  const alchemy = new Alchemy(config)
  return await alchemy.nft.getNftsForOwner(walletAddress)
}