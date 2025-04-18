import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import '../styles/ProductCard.css';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  const getImageUrl = (name) => {
    const map = {
      'iPhone 15 Pro Max': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=700&hei=700&fmt=jpeg&qlt=90&.v=1693009283811',
      'iPhone 15 Pro': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch_GEO_EMEA?wid=700&hei=700&fmt=jpeg&qlt=90&.v=1693009283811',
      'iPhone 15 Plus': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch_GEO_EMEA?wid=700&hei=700&fmt=jpeg&qlt=90&.v=1693009283811',
      'iPhone 15': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch_GEO_EMEA?wid=700&hei=700&fmt=jpeg&qlt=90&.v=1693009283811',
      'iPhone SE': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-se-finish-select-202207-4-7inch_GEO_EMEA?wid=700&hei=700&fmt=jpeg&qlt=90&.v=1654026289843'
    };
    return map[name] || 'https://via.placeholder.com/300x300?text=No+Image';
  };

  const calculateDiscount = (original, current) => {
    const percent = Math.round(((original - current) / original) * 100);
    return percent;
  };

  const originalPrice = product.price + 5000; // example
  const discount = calculateDiscount(originalPrice, product.price);

  const handleAddCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      className: 'custom-toast',
    });
  }


  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-card">
        <div className="img-container">
          <img src={getImageUrl(product.name)} alt={product.name} />
          {product.stock < 10 && (
            <span className="stock-badge">Only {product.stock} left!</span>
          )}
        </div>

        <div className="info">
          <h2>{product.name}</h2>
          <div className="price-wrapper">
            <span className="price">₹{product.price.toLocaleString()}</span>
            <span className="original">₹{originalPrice.toLocaleString()}</span>
            <span className="discount">({discount}% OFF)</span>
          </div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`star ${i < product.rating ? 'filled' : ''}`} />
            ))}
          </div>

          <div className="actions">
            <button onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }} className={`wishlist ${isWishlisted ? 'active' : ''}`}>
              <FaHeart /> {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
            <button onClick={(e) => handleAddCart(e)} className="cart">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
