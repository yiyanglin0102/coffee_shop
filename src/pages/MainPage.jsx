import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

const Home = () => {

  useEffect(() => {
   
    // For real API (uncomment when ready):
    // axios.get('https://your-api-url/menu')
    //   .then(res => setMenuItems(res.data))
    //   .catch(err => console.error(err));
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Home;