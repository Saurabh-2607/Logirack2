import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductForm from './components/AddProducts'; 
import ProductCard from './components/ProductCard'; 
import HomePage from './components/HomePage'; // Import the new HomePage component

function App() {
  const handleProductSubmit = async (product) => {
    try {
      const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectId': '6708d6ab59c9b368f802b0b3',
          'environmentId': '6708d6ab59c9b368f802b0b4'
        },
        body: JSON.stringify({ products: [product] }), // Wrap in 'products' array
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Updated route for HomePage */}
          <Route path="/products" element={<ProductCard />} /> {/* Route for viewing products */}
          <Route path="/addproducts" element={<ProductForm onSubmit={handleProductSubmit} />} /> {/* Route for adding products */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
