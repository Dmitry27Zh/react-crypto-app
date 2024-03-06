import { createContext, useState, useEffect, useContext } from 'react'
import { fetchAssets, fetchCrypto } from '../api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  isLoading: false,
})

export function useCrypto() {
  return useContext(CryptoContext)
}

export function CryptoContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  useEffect(() => {
    async function preload() {
      setIsLoading(true)
      const { result } = await fetchCrypto()
      const assets = await fetchAssets()
      setCrypto(result)
      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id)

          return {
            ...asset,
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
          }
        })
      )
      setIsLoading(false)
    }
    preload()
  }, [])

  return <CryptoContext.Provider value={{ isLoading, assets, crypto }}>{children}</CryptoContext.Provider>
}
