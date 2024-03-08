import { Divider, Flex, Tag, Typography } from 'antd'
import CoinInfo from './CoinInfo'

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol={true} />
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
