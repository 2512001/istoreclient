import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaArrowLeft, FaStar } from 'react-icons/fa';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product data - replace with your actual data source
  const product = {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 1099,
    storage: '256GB',
    color: 'Natural Titanium',
    rating: 4.8,
    reviews: 125,
    description: 'The most powerful iPhone ever with A17 Pro chip.',
    features: [
      '6.7-inch Super Retina XDR display',
      'A17 Pro chip for unprecedented performance',
      '48MP camera system with 5x optical zoom',
      'Titanium design with textured matte glass back',
      'USB-C connector for faster data transfer',
      'Dynamic Island for alerts and Live Activities',
      'Always-On display with StandBy mode',
      'Emergency SOS via satellite'
    ],
    specifications: {
      'Display': '6.7-inch Super Retina XDR display',
      'Chip': 'A17 Pro chip',
      'Camera': '48MP Main camera with 5x optical zoom',
      'Battery': 'Up to 29 hours video playback',
      'Water Resistance': 'IP68 rating',
      'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3'
    },
    images: [
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009283811',
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA_2?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009283811',
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA_3?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009283811'
    ]
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half-star" className="star half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <div className="product-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Products
      </button>

      <div className="product-container">
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              loading="lazy"
            />
          </div>
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <p className="product-price">${product.price.toLocaleString()}</p>
          
          <div className="product-meta">
            <span className="meta-item">
              <strong>Storage:</strong> {product.storage}
            </span>
            <span className="meta-item">
              <strong>Color:</strong> {product.color}
            </span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-features">
            <h2>Key Features</h2>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-specifications">
            <h2>Specifications</h2>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max="10"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>

            <div className="action-buttons">
              <button className="add-to-cart" onClick={handleAddToCart}>
                <FaShoppingCart /> Add to Cart
              </button>
              <button className="add-to-wishlist">
                <FaHeart /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 