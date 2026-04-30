import React from 'react'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import { useNavigate } from 'react-router-dom';
import { addToBasket } from '../redux/slices/basketSlice';

function ProductList({ searchQuery = '' }) {

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const filteredProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return products;
        }

        return products.filter((product) =>
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }, [products, searchQuery]);


    return (
        <div className='product-list-container'>
            {filteredProducts && filteredProducts.map((product) => (
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

            {products && filteredProducts && filteredProducts.length === 0 && (
                <div style={{ padding: '40px 20px', width: '100%' }}>
                    <h2>Aradığınız ürün bulunamadı.</h2>
                </div>
            )}

        </div>

    )
}

export default ProductList