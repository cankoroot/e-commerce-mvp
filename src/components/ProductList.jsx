import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import { useNavigate } from 'react-router-dom';
import { addToBasket } from '../redux/slices/basketSlice';

function ProductList() {

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    const navigate = useNavigate();

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
                        <button
                            className='product-btn2'
                            onClick={() =>
                                dispatch(
                                    addToBasket({
                                        id: product.id,
                                        price: product.price,
                                        title: product.title,
                                        description: product.description,
                                        image: product.image,
                                    })
                                )
                            }
                        >
                            Sepete Ekle
                        </button>
                    </div>
                </div>
            ))}

        </div>

    )
}

export default ProductList