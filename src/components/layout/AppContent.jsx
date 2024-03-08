import { Layout, Typography } from 'antd'
import { useCrypto } from '../../context/crypto-context'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  padding: '1rem',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
}

export default function AppContent() {
  const { assets, crypto } = useCrypto()
  const cryptoPriceMap = crypto.reduce((result, coin) => ({ ...result, [coin.id]: coin.price }), {})
  const sum = assets
    .map((asset) => asset.amount * cryptoPriceMap[asset.id])
    .reduce((result, current) => result + current, 0)
    .toFixed(2)

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio: {sum}$
      </Typography.Title>
    </Layout.Content>
  )
}
