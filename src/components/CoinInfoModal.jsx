import { Divider, Flex, Tag, Typography } from 'antd'

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
        <Typography.Title level={2} style={{ margin: 0 }}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Flex gap={2}>
          <Typography.Text strong>1 hour:</Typography.Text>
          <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
        </Flex>
        <Flex gap={2}>
          <Typography.Text strong>1 day:</Typography.Text>
          <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
        </Flex>
        <Flex gap={2}>
          <Typography.Text strong>1 week:</Typography.Text>
          <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
        </Flex>
        <Flex gap={2}>
          <Typography.Text strong>Price:</Typography.Text>
          {coin.price.toFixed(2)}$
        </Flex>
        <Flex gap={2}>
          <Typography.Text strong>Price BTC:</Typography.Text>
          {coin.priceBtc}
        </Flex>
        <Flex gap={2}>
          <Typography.Text strong>Contract Address:</Typography.Text>
          {coin.contractAddress}
        </Flex>
      </Typography.Paragraph>
    </>
  )
}
