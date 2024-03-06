import { Layout, Spin } from 'antd'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import AppContent from './AppContent'
import { useCrypto } from '../../context/crypto-context'

export default function AppLayout() {
  const { isLoading } = useCrypto()

  if (isLoading) {
    return <Spin fullscreen />
  } else {
    return (
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    )
  }
}
