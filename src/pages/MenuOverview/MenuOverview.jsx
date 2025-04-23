import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import MenuItem from '../../components/MenuItem';
import { mockMenu } from '../../mockData';
import './MenuOverview.css';

const MenuOverview = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Add this function
  const handleAddToOrder = (item) => {
    // Implement your actual order logic here
    console.log('Adding to order:', item.name);
    // Example: Add to cart context or redux store
    // addToCart(item);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setMenuItems(mockMenu);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);

  if (isLoading) return <div className="loading">Loading menu...</div>;

  return (
    <div className="menu-overview">
      <Typography variant="h4" gutterBottom>
        Menu Overview
      </Typography>
      
      <div className="category-filter">
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={(e, newCat) => setCategory(newCat)}
          aria-label="menu categories"
        >
          <ToggleButton value="all">All Items</ToggleButton>
          <ToggleButton value="coffee">Coffee</ToggleButton>
          <ToggleButton value="tea">Tea</ToggleButton>
          <ToggleButton value="pastry">Pastries</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Grid container spacing={3} className="menu-grid">
        {filteredItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.itemId}>
            <MenuItem 
              {...item}
              onAddToOrder={() => handleAddToOrder(item)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuOverview;