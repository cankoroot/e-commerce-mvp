import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";
import style from './../../node_modules/dom-helpers/esm/css';
import Badge from '@mui/material/Badge';
import { useDispatch } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';

function Header({ theme, onThemeToggle }) {

    const { products, drawer } = useSelector((store) => store.basket);
    const dispatch = useDispatch();

    return (
        <div>
            <div className='header-hero'>
                <h1 className='header-title'> <a className='header-link' href="https://github.com/cankoroot" target="_blank" rel="noopener noreferrer">cankoroot</a> E-Ticaret</h1>

                <div className='search-container'>
                    <form className='search-bar'>
                        <input className='search-input' type="text" placeholder='Ürün, marka veya kategori ara' />
                    </form>
                    <div>
                        <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} style={{ cursor: 'pointer' }} color="primary">
                            <IoCartOutline className='cart-icon' />
                        </Badge>
                    </div>
                </div>

                <div className='header-nav-container'>
                    <nav className='header-nav'>
                        <Link className='link' to="/">Home</Link>
                        <Link className='link' to="/products">Products</Link>
                        <Link className='link' to="/">Giriş Yap</Link>
                        <Link className='link' to="/">Kayıt Ol</Link>
                        <button style={{ fontSize: '20px' }} type='button' className='theme-toggle-btn' onClick={onThemeToggle} aria-label='Tema değiştir'>
                            {theme === 'dark' ? <MdOutlineWbSunny /> : <MdNightlightRound />}
                        </button>
                    </nav>
                </div>

            </div>
        </div>
    )
}

export default Header