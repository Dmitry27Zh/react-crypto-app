import { Layout, Card, Statistic, List, Typography, Spin } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { fetchAssets, fetchCrypto } from '../../api'
import { percentDifference } from '../../utils'

const siderStyle = {
  padding: '1rem',
}

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

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
        <Card style={{ marginBottom: '1rem' }}>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
          <List
            size="small"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </Card>
        <Card>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Layout.Sider>
    )
  }
}
