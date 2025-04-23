import React, { useState, useEffect } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Typography, CircularProgress, Alert, Button } from '@mui/material';
import MenuItem from '../../components/MenuItem';
import { generateClient } from 'aws-amplify/api';
import { listMenuItems } from '../../graphql/queries';
import './MenuOverview.css';

const client = generateClient();

const MenuOverview = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for initial development
  const sampleMenuItems = [
    {
      id: '1',
      name: "Espresso",
      description: "Strong black coffee",
      price: 3.50,
      category: "coffee",
      isAvailable: true
    },
    {
      id: '2',
      name: "Cappuccino",
      description: "Espresso with steamed milk",
      price: 4.25,
      category: "coffee",
      isAvailable: true
    },
    {
      id: '3',
      name: "Croissant",
      description: "Buttery French pastry",
      price: 2.75,
      category: "pastry",
      isAvailable: true
    }
  ];

  const fetchMenuItems = async () => {
    try {
      // Try to fetch from backend first
      const { data } = await client.graphql({ 
        query: listMenuItems,
        authMode: 'API_KEY'
      });
      setMenuItems(data.listMenuItems.items);
      setError(null);
    } catch (err) {
      console.error('Error fetching from backend, using sample data:', err);
      // Fallback to sample data if backend fails
      setMenuItems(sampleMenuItems);
      setError('Connected to sample data (backend unavailable)');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSampleData = () => {
    setIsLoading(true);
    setMenuItems(sampleMenuItems);
    setError('Using sample data (not connected to backend)');
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const filteredItems = category === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === category);

  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <Typography>Loading menu...</Typography>
      </div>
    );
  }

  return (
    <div className="menu-overview">
      <Typography variant="h4" gutterBottom>
        Menu Overview
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
          {error.includes('sample data') && (
            <Button 
              color="inherit" 
              size="small" 
              onClick={fetchMenuItems}
              sx={{ ml: 1 }}
            >
              Retry Connection
            </Button>
          )}
        </Alert>
      )}

      <div className="controls-container">
        <div className="category-filter">
          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={(_, newCat) => setCategory(newCat)}
            aria-label="menu categories"
          >
            <ToggleButton value="all">All Items</ToggleButton>
            <ToggleButton value="coffee">Coffee</ToggleButton>
            <ToggleButton value="tea">Tea</ToggleButton>
            <ToggleButton value="pastry">Pastries</ToggleButton>
          </ToggleButtonGroup>
        </div>

        {process.env.NODE_ENV !== 'production' && menuItems.length === 0 && (
          <Button
            variant="outlined"
            onClick={handleUseSampleData}
            disabled={isLoading}
          >
            Use Sample Data
          </Button>
        )}
      </div>

      <Grid container spacing={3} className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <MenuItem {...item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography className="empty-message" align="center">
              No items found in this category
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default MenuOverview;