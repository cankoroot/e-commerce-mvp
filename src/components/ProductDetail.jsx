import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { addToBasket } from '../redux/slices/basketSlice';

function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, products } = useSelector((store) => store.product);

    const addBasket = () => {
        const payload = {
            id: selectedProduct.id,
            price: selectedProduct.price,
            title: selectedProduct.title,
            description: selectedProduct.description,
            image: selectedProduct.image,
        }
        dispatch(addToBasket(payload));
    }

    useEffect(() => {
        if (products.length > 0) {
            dispatch(setSelectedProduct(id));
        }
    }, [id, dispatch, products]);

    if (!selectedProduct || !selectedProduct.title) {
        return <div style={{ padding: "100px" }}>Ürün bulunamadı veya yükleniyor...</div>;
    }

    return (
        <div className="product-detail-container" style={{ display: 'flex', padding: '50px', gap: '30px' }}>
            <img src={selectedProduct.image} alt="" style={{ width: '300px' }} />
            <div>
                <h1>{selectedProduct.title}</h1>
                <p>{selectedProduct.description}</p>
                <h2 style={{ color: 'orange' }}>{selectedProduct.price} $</h2>
                <button onClick={addBasket} style={{ padding: '10px 20px', backgroundColor: 'orange', border: 'none', color: 'white', cursor: 'pointer' }}>
                    Sepete Ekle
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;