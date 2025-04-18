import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import '../styles/Products.css';

const Products = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Simulated API call to fetch products
  const fetchProducts = async (searchQuery) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // This is where you'd normally make an API call
      // For now, we'll filter the dummy data based on the search query
      const searchLower = searchQuery.toLowerCase();
      const matchedProducts = dummyProducts.filter(product => {
        const nameLower = product.name.toLowerCase();
        const descLower = product.description.toLowerCase();
        const priceLower = product.price.toString();

        // Match by name, description, price, or any relevant term
        return nameLower.includes(searchLower) || 
               descLower.includes(searchLower) || 
               priceLower.includes(searchLower) ||
               // Match specific terms like 'pro', 'max', etc.
               (searchLower === 'pro' && nameLower.includes('pro')) ||
               (searchLower === 'max' && nameLower.includes('max')) ||
               // Match price ranges
               (searchLower.includes('under') && product.price < 100000) ||
               (searchLower.includes('above') && product.price > 100000);
      });

      setProducts(matchedProducts);
      if (matchedProducts.length === 0) {
        toast.info(`No products found for "${searchQuery}"`);
      }
    } catch (error) {
      toast.error('Error fetching products');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      const decodedSearch = decodeURIComponent(search);
      setSearchTerm(decodedSearch);
      fetchProducts(decodedSearch);
      
      // Set filter if search contains 'pro'
      if (decodedSearch.toLowerCase().includes('pro')) {
        setFilter('pro');
      }
    } else {
      // Load all products when no search is specified
      setProducts(dummyProducts);
    }
  }, [location.search]);

  // Dummy products data (this would normally come from your API)
  const dummyProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 1099,
      storage: '256GB',
      color: 'Natural Titanium',
      description: 'The most powerful iPhone ever with A17 Pro chip.'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 999,
      storage: '256GB',
      color: 'Natural Titanium',
      description: 'Pro camera system and A17 Pro chip.'
    },
    {
      id: 3,
      name: 'iPhone 15 Plus',
      price: 899,
      storage: '256GB',
      color: 'Black',
      description: 'Large display and powerful performance.'
    },
    {
      id: 4,
      name: 'iPhone 15',
      price: 799,
      storage: '256GB',
      color: 'Black',
      description: 'Advanced camera system and A16 Bionic chip.'
    },
    {
      id: 5,
      name: 'iPhone 14 Pro Max',
      price: 999,
      storage: '256GB',
      color: 'Deep Purple',
      description: 'Dynamic Island and 48MP camera.'
    },
    {
      id: 6,
      name: 'iPhone 14 Pro',
      price: 899,
      storage: '256GB',
      color: 'Deep Purple',
      description: 'Pro camera system and A16 Bionic chip.'
    },
    {
      id: 7,
      name: 'iPhone 14 Plus',
      price: 799,
      storage: '256GB',
      color: 'Midnight',
      description: 'Large display and powerful performance.'
    },
    {
      id: 8,
      name: 'iPhone 14',
      price: 699,
      storage: '256GB',
      color: 'Midnight',
      description: 'Advanced camera system and A15 Bionic chip.'
    }
  ];

  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => {
        const nameLower = product.name.toLowerCase();
        const descLower = product.description.toLowerCase();
        
        // Check if search term matches the model number (e.g., '14' matches 'iPhone 14')
        const modelMatch = searchLower.match(/\d+/);
        if (modelMatch) {
          const searchModel = modelMatch[0];
          const productModel = nameLower.match(/\d+/)?.[0];
          if (productModel === searchModel) return true;
        }

        return nameLower.includes(searchLower) || 
               descLower.includes(searchLower);
      });
    }

    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(product => {
        if (filter === 'pro') return product.name.includes('Pro');
        if (filter === 'regular') return !product.name.includes('Pro');
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default: // featured
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>📱 iPhone Collection</h1>
        <div className="products-filters">
          <div className="filter-group">
            <label htmlFor="filter">Filter:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All iPhones</option>
              <option value="pro">Pro Models</option>
              <option value="regular">Regular Models</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-header">
        {searchTerm && (
          <div className="search-info">
            <p>Showing results for "{searchTerm}"</p>
            <button 
              className="clear-search" 
              onClick={() => {
                setSearchTerm('');
                navigate('/products');
              }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <div className="products-grid">
        {loading ? (
          <div className="loading">
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">
            <p>No products found{searchTerm ? ` for "${searchTerm}"` : ''}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
    