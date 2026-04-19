import React, { use } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import { useNavigate } from 'react-router-dom';

function ProductList() {

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    const navigate = useNavigate();
    const { selectedProduct } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])


    return (
        <div className='product-list-container'>
            {products && products.map((product) => (
                <div className='card' key={product.id}>
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title} className='image' />
                    <p>${product.price.toFixed(2)}</p>
                    <div className='product-btn'>
                        <button
                            className='product-btn1'
                            onClick={() => navigate(`/ProductDetail/${product.id}`)}
                        >
                            İncele
                        </button>
                        <button className='product-btn2'>Sepete Ekle</button>
                    </div>
                </div>
            ))}

        </div>

    )
}

export default ProductList