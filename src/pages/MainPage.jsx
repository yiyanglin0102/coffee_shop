import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { mockMenu } from '../mockData';  // Moved to top level

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // For testing with mock data:
    setMenuItems(mockMenu);
    
    // For real API (uncomment when ready):
    // axios.get('https://your-api-url/menu')
    //   .then(res => setMenuItems(res.data))
    //   .catch(err => console.error(err));
  }, []);

  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);

  return (
    <div>
      <ToggleButtonGroup
        value={category}
        exclusive
        onChange={(e, newCat) => setCategory(newCat)}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="coffee">Coffee</ToggleButton>
        <ToggleButton value="pastry">Pastries</ToggleButton>
      </ToggleButtonGroup>

      <Grid container spacing={2}>
        {filteredItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.itemId}>
            <MenuItem {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;