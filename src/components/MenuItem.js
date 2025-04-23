import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MenuItem = ({ name, price, description }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography color="textSecondary">${price.toFixed(2)}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
