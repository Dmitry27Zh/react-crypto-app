import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { fetchAssets, fetchCrypto } from '../../api'
import { capitalize, percentDifference } from '../../utils'

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
              title={capitalize(asset.id)}
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
                  withTag: true,
                },
                {
                  title: 'Asset Amount',
                  value: asset.amount,
                  isPlain: true,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                    {item.isPlain ? (
                      item.value
                    ) : (
                      <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Layout.Sider>
    )
  }
}
