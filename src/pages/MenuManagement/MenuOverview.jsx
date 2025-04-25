import React, { useState, useEffect } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Typography, CircularProgress, Alert, Button, Collapse, IconButton, Box } from '@mui/material';
import MenuItem from '../../components/MenuItem';
import { generateClient } from 'aws-amplify/api';
import { listDishes } from '../../graphql/queries';
import './MenuOverview.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { sampleMenuItems } from './sampleMenuData.js';
const client = generateClient();

const MenuOverview = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, errors } = await client.graphql({
        query: listDishes,
        variables: {}, // Add empty variables object if needed
        // authMode: 'API_KEY' // Uncomment if using API key auth
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      console.log("GraphQL Response:", data);
      if (data?.listDishes?.items) {
        console.log("Fetched Dishes:", data.listDishes.items);

        const transformedItems = data.listDishes.items.map(item => ({
          id: item.id,
          name: item.name_en,
          description: item.description_en,
          price: item.price,
          category: item.categoryId?.toLowerCase(),
          isAvailable: item.isAvailable
        }));

        setMenuItems(transformedItems);

        // Initialize all categories as collapsed
        const categories = [...new Set(transformedItems.map(item => item.category))];
        const initialExpandedState = {};
        categories.forEach(cat => {
          initialExpandedState[cat] = false;
        });
        setExpandedCategories(initialExpandedState);
      } else {
        throw new Error('No items returned from API');
      }
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setError(`Failed to connect to backend: ${err.message}. Using sample data.`);
      setMenuItems(sampleMenuItems);

      // Initialize sample categories as collapsed
      const sampleCategories = [...new Set(sampleMenuItems.map(item => item.category))];
      const initialExpandedState = {};
      sampleCategories.forEach(cat => {
        initialExpandedState[cat] = false;
      });
      setExpandedCategories(initialExpandedState);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMenuItems();
  }, []);
  useEffect(() => {
    // When a specific category is selected, expand that category automatically
    if (category !== 'all') {
      setExpandedCategories(prev => ({
        ...prev,
        [category]: true
      }));
    }
  }, [category]);
  const handleUseSampleData = () => {
    setMenuItems(sampleMenuItems);
    setError('Using sample data (not connected to backend)');

    // Initialize sample categories as expanded
    const sampleCategories = [...new Set(sampleMenuItems.map(item => item.category))];
    const initialExpandedState = {};
    sampleCategories.forEach(cat => {
      initialExpandedState[cat] = true;
    });
    setExpandedCategories(initialExpandedState);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredItems = category === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === category);

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

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
          <Button
            color="inherit"
            size="small"
            onClick={fetchMenuItems}
            sx={{ ml: 1 }}
          >
            Retry Connection
          </Button>
        </Alert>
      )}

      <div className="controls-container">
        {process.env.NODE_ENV === 'development' && (
          <Button
            variant="outlined"
            onClick={handleUseSampleData}
            disabled={isLoading}
          >
            Use Sample Data
          </Button>
        )}
      </div>

      <div className="menu-sections">
        {Object.keys(groupedItems).length > 0 ? (
          Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="category-section">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f5f5f5',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => toggleCategory(category)}
              >
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {category} ({items.length})
                </Typography>
                <IconButton size="small">
                  {expandedCategories[category] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedCategories[category]}>
                {items.map(item => (
                  <Grid key={item.id} className="menu-item">
                    <MenuItem {...item} />
                  </Grid>
                ))}
              </Collapse>
            </div>
          ))
        ) : (
          <Typography className="empty-message" align="center">
            No items found
          </Typography>
        )}
      </div>
    </div>
  );
};

export default MenuOverview;