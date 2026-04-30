import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import { setDrawer, calculateBasketTotal, removeFromBasket } from './redux/slices/basketSlice';

function App() {
  const [theme, setTheme] = useState('dark')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasketTotal());
  }, []);

  return (
    <div className='app-shell'>
      <Header
        theme={theme}
        onThemeToggle={handleThemeToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<ProductList searchQuery={searchQuery} />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        </Routes>
        <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
          {
            products && products.map((product) => (
              <div key={product.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
                <div key={product.id} style={{ display: 'flex', gap: '10px', padding: '10px' }}>
                  <img src={product.image} alt={product.title} style={{ width: '50px' }} />
                  <div>
                    <h4>{product.title} ({product.count})</h4>
                    <p style={{ width: '740px' }}>{product.price} $</p>
                  </div>
                  <button style={{ padding: '5px', width: '100px', backgroundColor: 'darkred', borderRadius: '10px', color: 'white', cursor: 'pointer' }} onClick={() => dispatch(removeFromBasket(product.id))}>
                    Sepetten Çıkar
                  </button>
                </div>
              </div>
            ))
          }
          <div>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>Toplam Fiyat : {totalAmount.toFixed(2)} $</h2>
          </div>
        </Drawer>
      </main>
      <Footer />
    </div >
  )
}

export default App