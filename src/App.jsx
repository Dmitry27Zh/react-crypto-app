import './App.css'
import { Layout } from 'antd'
import AppHeader from './components/layout/AppHeader'
import AppSider from './components/layout/AppSider'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
}

function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <Layout.Content style={contentStyle}>Content</Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
