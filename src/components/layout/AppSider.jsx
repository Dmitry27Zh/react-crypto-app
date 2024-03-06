import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { capitalize } from '../../utils'
import { CryptoContext } from '../../context/crypto-context'

const siderStyle = {
  padding: '1rem',
}

export default function AppSider() {
  const { isLoading, assets } = useContext(CryptoContext)

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
