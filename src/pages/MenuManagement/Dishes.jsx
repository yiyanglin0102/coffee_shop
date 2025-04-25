import React, { useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemText, Divider,
  TextField, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, FormControlLabel, Checkbox, FormControl,
  InputLabel, Select, MenuItem, Avatar, Grid, Tabs, Tab
} from '@mui/material';
import { ArrowBack, Add, Edit, Delete, Save, Cancel, CloudUpload } from '@mui/icons-material';
import { sampleMenuItems } from './sampleMenuData';

const DishDetail = ({ dish, onBack, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentDish, setCurrentDish] = useState(dish);
  
  // Sample options data
  const taxRates = [
    { code: 'NYC-8.875', rate: 8.875, location: 'NYC' },
    { code: 'CA-7.25', rate: 7.25, location: 'CA' },
    { code: 'SEA-10.1', rate: 10.1, location: 'Seattle' }
  ];
  
  const membershipOptions = ['None', 'Silver', 'Gold', 'Platinum'];
  const discountOptions = ['None', 'Happy Hour', 'Early Bird', 'Loyalty'];

  const handleSave = () => {
    onSave(currentDish);
    setEditMode(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">{dish.name}</Typography>
        {!editMode && (
          <Button 
            startIcon={<Edit />} 
            onClick={() => setEditMode(true)}
            sx={{ ml: 'auto' }}
          >
            Edit
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Basic Info */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            {editMode ? (
              <>
                <TextField
                  label="Dish Name"
                  value={currentDish.name}
                  onChange={(e) => setCurrentDish({...currentDish, name: e.target.value})}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  value={currentDish.description}
                  onChange={(e) => setCurrentDish({...currentDish, description: e.target.value})}
                  multiline
                  rows={3}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Base Price"
                    type="number"
                    value={currentDish.price}
                    onChange={(e) => setCurrentDish({...currentDish, price: parseFloat(e.target.value) || 0})}
                    sx={{ flex: 1 }}
                  />
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Color Tag</InputLabel>
                    <Select
                      value={currentDish.color || ''}
                      onChange={(e) => setCurrentDish({...currentDish, color: e.target.value})}
                      label="Color Tag"
                    >
                      <MenuItem value="red">Red</MenuItem>
                      <MenuItem value="green">Green</MenuItem>
                      <MenuItem value="blue">Blue</MenuItem>
                      <MenuItem value="yellow">Yellow</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </>
            ) : (
              <>
                <Typography paragraph>{dish.description}</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography><strong>Price:</strong> ${dish.price.toFixed(2)}</Typography>
                  {dish.color && (
                    <Chip 
                      label={dish.color} 
                      size="small" 
                      sx={{ 
                        backgroundColor: dish.color, 
                        color: 'white',
                        textTransform: 'capitalize'
                      }} 
                    />
                  )}
                </Box>
              </>
            )}
          </Paper>

          {/* Image Upload */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Dish Image</Typography>
            {editMode ? (
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                fullWidth
              >
                Upload Image
                <input 
                  type="file" 
                  hidden 
                  accept="image/*"
                />
              </Button>
            ) : (
              <Avatar 
                src={dish.imageUrl} 
                variant="rounded"
                sx={{ width: 200, height: 200 }}
              />
            )}
          </Paper>
        </Grid>

        {/* Right Column - Pricing & Options */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Pricing & Tax</Typography>
            {editMode ? (
              <>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Tax Code</InputLabel>
                    <Select
                      value={currentDish.taxCode || ''}
                      onChange={(e) => setCurrentDish({...currentDish, taxCode: e.target.value})}
                      label="Tax Code"
                    >
                      {taxRates.map((tax) => (
                        <MenuItem key={tax.code} value={tax.code}>
                          {tax.code} ({tax.rate}%)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Rabbit Tax"
                    type="number"
                    value={currentDish.rabbitTax || 0}
                    onChange={(e) => setCurrentDish({...currentDish, rabbitTax: parseFloat(e.target.value) || 0})}
                    sx={{ flex: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Membership</InputLabel>
                    <Select
                      value={currentDish.membership || 'None'}
                      onChange={(e) => setCurrentDish({...currentDish, membership: e.target.value})}
                      label="Membership"
                    >
                      {membershipOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Discount</InputLabel>
                    <Select
                      value={currentDish.discount || 'None'}
                      onChange={(e) => setCurrentDish({...currentDish, discount: e.target.value})}
                      label="Discount"
                    >
                      {discountOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </>
            ) : (
              <>
                <Typography><strong>Tax Code:</strong> {dish.taxCode || 'Not set'}</Typography>
                <Typography><strong>Rabbit Tax:</strong> {dish.rabbitTax || 0}%</Typography>
                <Typography><strong>Membership:</strong> {dish.membership || 'None'}</Typography>
                <Typography><strong>Discount:</strong> {dish.discount || 'None'}</Typography>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Final Price: ${(dish.price * (1 + (dish.rabbitTax || 0)/100)).toFixed(2)}
                </Typography>
              </>
            )}
          </Paper>

          {/* Additional Options */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Additional Options</Typography>
            {editMode ? (
              <>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={currentDish.isAvailable || false}
                      onChange={(e) => setCurrentDish({...currentDish, isAvailable: e.target.checked})}
                    />
                  }
                  label="Available for order"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={currentDish.hasAlcohol || false}
                      onChange={(e) => setCurrentDish({...currentDish, hasAlcohol: e.target.checked})}
                    />
                  }
                  label="Contains alcohol"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={currentDish.isVegetarian || false}
                      onChange={(e) => setCurrentDish({...currentDish, isVegetarian: e.target.checked})}
                    />
                  }
                  label="Vegetarian"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={currentDish.isSpicy || false}
                      onChange={(e) => setCurrentDish({...currentDish, isSpicy: e.target.checked})}
                    />
                  }
                  label="Spicy"
                />
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {dish.isAvailable && <Chip label="Available" color="success" size="small" />}
                  {dish.hasAlcohol && <Chip label="Alcohol" size="small" />}
                  {dish.isVegetarian && <Chip label="Vegetarian" color="success" size="small" />}
                  {dish.isSpicy && <Chip label="Spicy" color="error" size="small" />}
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      {editMode && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            onClick={() => setEditMode(false)}
            startIcon={<Cancel />}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            variant="contained"
            startIcon={<Save />}
          >
            Save Changes
          </Button>
        </Box>
      )}
    </Box>
  );
};

const Dishes = () => {
  const [selectedCategory, setSelectedCategory] = useState('coffee');
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishes, setDishes] = useState(sampleMenuItems);
  const [editMode, setEditMode] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);

  // Get unique categories
  const categories = [...new Set(dishes.map(dish => dish.category))];

  const handleCreateNew = () => {
    setCurrentDish({
      id: `dish-${Date.now()}`,
      name: '',
      description: '',
      price: 0,
      category: selectedCategory,
      isAvailable: true,
      taxCode: '',
      rabbitTax: 0,
      membership: 'None',
      discount: 'None',
      color: '',
      hasAlcohol: false,
      isVegetarian: false,
      isSpicy: false
    });
    setEditMode(true);
  };

  const handleSaveDish = (updatedDish) => {
    if (updatedDish.id.startsWith('dish-')) {
      // New dish
      setDishes([...dishes, updatedDish]);
    } else {
      // Update existing dish
      setDishes(dishes.map(d => d.id === updatedDish.id ? updatedDish : d));
    }
    setSelectedDish(updatedDish);
    setEditMode(false);
  };

  // If a dish is selected, show detail view
  if (selectedDish) {
    return (
      <DishDetail 
        dish={selectedDish}
        onBack={() => setSelectedDish(null)}
        onSave={handleSaveDish}
      />
    );
  }

  // Show category/dish listing view
  return (
    <Box sx={{ display: 'flex', height: '100vh', p: 3 }}>
      {/* Left Panel - Categories */}
      <Paper sx={{ width: 250, mr: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
          Menu Categories
        </Typography>
        <List>
          {categories.map(category => (
            <React.Fragment key={category}>
              <ListItem 
                button
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                <ListItemText 
                  primary={category.charAt(0).toUpperCase() + category.slice(1)}
                  secondary={`${dishes.filter(d => d.category === category).length} items`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Button 
          variant="contained" 
          fullWidth 
          startIcon={<Add />}
          onClick={handleCreateNew}
          sx={{ mt: 2 }}
        >
          Add New Dish
        </Button>
      </Paper>

      {/* Middle Panel - Dishes List */}
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Items
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dishes
                .filter(dish => dish.category === selectedCategory)
                .map(dish => (
                  <TableRow 
                    key={dish.id}
                    hover
                    onClick={() => setSelectedDish(dish)}
                  >
                    <TableCell>{dish.name}</TableCell>
                    <TableCell sx={{ 
                      maxWidth: 300,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {dish.description}
                    </TableCell>
                    <TableCell align="right">${dish.price.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      {dish.isAvailable ? (
                        <Chip label="Available" color="success" size="small" />
                      ) : (
                        <Chip label="Unavailable" color="error" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => {
                        e.stopPropagation();
                        setCurrentDish(dish);
                        setEditMode(true);
                      }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={(e) => {
                        e.stopPropagation();
                        setDishes(dishes.filter(d => d.id !== dish.id));
                      }}>
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Dialog (shown when editing/creating dishes) */}
      {editMode && currentDish && (
        <Dialog open={editMode} onClose={() => setEditMode(false)} fullWidth maxWidth="md">
          <DialogTitle>
            {currentDish.id.startsWith('dish-') ? 'Create New Dish' : 'Edit Dish'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Dish Name"
                value={currentDish.name}
                onChange={(e) => setCurrentDish({...currentDish, name: e.target.value})}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                value={currentDish.description}
                onChange={(e) => setCurrentDish({...currentDish, description: e.target.value})}
                multiline
                rows={3}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Price"
                  type="number"
                  value={currentDish.price}
                  onChange={(e) => setCurrentDish({...currentDish, price: parseFloat(e.target.value) || 0})}
                  sx={{ flex: 1 }}
                />
                <FormControl sx={{ flex: 1 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={currentDish.category}
                    onChange={(e) => setCurrentDish({...currentDish, category: e.target.value})}
                    label="Category"
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={currentDish.isAvailable || false}
                    onChange={(e) => setCurrentDish({...currentDish, isAvailable: e.target.checked})}
                    sx={{ mt: 2 }}
                  />
                }
                label="Available for order"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
            <Button 
              onClick={() => handleSaveDish(currentDish)}
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Dishes;