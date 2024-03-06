import { Layout, Select, Space, Button } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react'

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
  function handleSelect() {}

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
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
      <Button type="primary">Add asset</Button>
    </Layout.Header>
  )
}
