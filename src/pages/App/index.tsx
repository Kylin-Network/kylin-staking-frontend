import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Message } from '@arco-design/web-react'
import { useWeb3React } from '@web3-react/core'

import { useEagerConnect, useInactiveListener } from '@/libs/wallet/hooks'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Pools from '../Pools'
import Stake from '../Stake'

export default function App() {
  const { error } = useWeb3React()
  const tried = useEagerConnect()
  useInactiveListener(!tried)

  useEffect(() => {
    if (error?.message) Message.error(error.message)
  }, [error])

  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<Pools />} />
          <Route path="/stake/:tokenName" element={<Stake />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
