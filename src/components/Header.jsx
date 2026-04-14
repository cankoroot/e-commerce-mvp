import React from 'react'
import { Link } from 'react-router';

function Header() {
    return (
        <div>
            <div className='header-hero'>
                <h1 className='header-title'> <a className='header-link' href="https://github.com/cankoroot" target="_blank" rel="noopener noreferrer">cankoroot</a> E-Ticaret</h1>
                <div className='header-nav-container'>
                    <nav className='header-nav'>
                        <Link className='link' to="/">Home</Link>
                        <Link className='link' to="/products">Products</Link>
                        <Link className='link' to="/">Giriş Yap</Link>
                        <Link className='link' to="/">Kayıt Ol</Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header