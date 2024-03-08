import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const headerStyle = {
  textAlign: 'center',
  width: '100%',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(true)
  const [coin, setCoin] = useState(null)
  const { crypto } = useCrypto()
  useEffect(() => {
    const keydownHandler = (event) => {
      if (event.key === '/') {
        setSelect((prevState) => !prevState)
      }
    }
    document.addEventListener('keydown', keydownHandler)

    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [])
  function handleSelect(value) {
    setModal(true)
    setCoin(crypto.find((c) => c.id === value))
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prevState) => !prevState)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add asset
      </Button>
      <Modal open={modal} footer={false} onCancel={() => setModal(false)}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}
