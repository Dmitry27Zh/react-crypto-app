import { Layout, Card, Statistic, List, Typography, Spin } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { fetchAssets, fetchCrypto } from '../../api'
import { percentDifference } from '../../utils'

const siderStyle = {
  padding: '1rem',
}

export default function AppSider() {
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

  if (isLoading) {
    return <Spin fullscreen />
  } else {
    return (
      <Layout.Sider width="25%" style={siderStyle}>
        {assets.map((asset) => (
          <Card key={asset.id} style={{ marginBottom: '1rem' }}>
            <Statistic
              title={asset.id}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              bordered
              dataSource={[
                {
                  title: 'Total Profit',
                  value: asset.totalProfit,
                },
                {
                  title: 'Asset Amount',
                  value: asset.amount,
                  isPlain: true,
                },
                {
                  title: 'Difference',
                  value: asset.growPercent,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  {item.isPlain ? <span>{item.value}</span> : <span>{item.value.toFixed(2)}$</span>}
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Layout.Sider>
    )
  }
}
