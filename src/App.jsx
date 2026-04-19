import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className='app-shell'>
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App