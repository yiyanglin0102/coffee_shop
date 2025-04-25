import React, { useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemText, Divider,
  TextField, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Autocomplete, Checkbox, FormControlLabel
} from '@mui/material';
import { Add, Edit, Delete, Save, Cancel } from '@mui/icons-material';

// Sample data
const sampleAddOnData = [
  {
    id: '1',
    name: 'Boba Toppings',
    connectedDishIds: ['1', '3'],
    items: [
      { id: '1-1', name: 'Pearl', chineseName: '珍珠', price: 0.5 },
      { id: '1-2', name: 'Pudding', chineseName: '布丁', price: 0.75 }
    ]
  },
  {
    id: '2',
    name: 'Tea Base',
    connectedDishIds: ['2'],
    items: [
      { id: '2-1', name: 'Oolong Tea', chineseName: '烏龍茶', price: 1.0 }
    ]
  }
];

const sampleDishes = [
  { id: '1', name: 'Classic Milk Tea' },
  { id: '2', name: 'Thai Tea' },
  { id: '3', name: 'Taro Milk Tea' }
];

const Addons = () => {
  const [addOns, setAddOns] = useState(sampleAddOnData);
  const [selectedAddOn, setSelectedAddOn] = useState(sampleAddOnData[0]);
  const [editMode, setEditMode] = useState(false);
  const [editAddOnMode, setEditAddOnMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({ name: '', chineseName: '', price: '' });
  const [currentAddOn, setCurrentAddOn] = useState(null);

  const handleAddOnSelect = (addOn) => {
    setSelectedAddOn(addOn);
  };

  const handleEditAddOn = (addOn) => {
    setCurrentAddOn({...addOn});
    setEditAddOnMode(true);
  };

  const handleSaveAddOn = () => {
    const updatedAddOns = addOns.map(addOn => 
      addOn.id === currentAddOn.id ? currentAddOn : addOn
    );
    setAddOns(updatedAddOns);
    setSelectedAddOn(currentAddOn);
    setEditAddOnMode(false);
  };

  const handleDishSelection = (selectedDishes) => {
    setCurrentAddOn({
      ...currentAddOn,
      connectedDishIds: selectedDishes.map(dish => dish.id)
    });
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setEditMode(true);
  };

  const handleSaveItem = () => {
    const updatedAddOns = addOns.map(addOn => {
      if (addOn.id === selectedAddOn.id) {
        const existingItemIndex = addOn.items.findIndex(item => item.id === currentItem.id);
        if (existingItemIndex >= 0) {
          const updatedItems = [...addOn.items];
          updatedItems[existingItemIndex] = currentItem;
          return { ...addOn, items: updatedItems };
        } else {
          const newItem = { ...currentItem, id: `${addOn.id}-${Date.now()}` };
          return { ...addOn, items: [...addOn.items, newItem] };
        }
      }
      return addOn;
    });
    
    setAddOns(updatedAddOns);
    setSelectedAddOn(updatedAddOns.find(a => a.id === selectedAddOn.id));
    setEditMode(false);
    setCurrentItem({ name: '', chineseName: '', price: '' });
  };

  const handleDeleteItem = (itemId) => {
    const updatedAddOns = addOns.map(addOn => {
      if (addOn.id === selectedAddOn.id) {
        return {
          ...addOn,
          items: addOn.items.filter(item => item.id !== itemId)
        };
      }
      return addOn;
    });
    setAddOns(updatedAddOns);
    setSelectedAddOn(updatedAddOns.find(a => a.id === selectedAddOn.id));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', p: 3 }}>
      {/* Left Panel - Add-on Categories */}
      <Paper sx={{ width: 250, mr: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
          Add-on Categories
        </Typography>
        <List>
          {addOns.map(addOn => (
            <React.Fragment key={addOn.id}>
              <ListItem 
                button
                selected={selectedAddOn?.id === addOn.id}
                onClick={() => handleAddOnSelect(addOn)}
              >
                <ListItemText 
                  primary={addOn.name}
                  secondary={`${addOn.items.length} options`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Right Panel - Add-on Options */}
      <Box sx={{ flex: 1 }}>
        {selectedAddOn && (
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5">
                {selectedAddOn.name} Options
              </Typography>
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => handleEditAddOn(selectedAddOn)}
                  sx={{ mr: 2 }}
                >
                  Edit Category
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => {
                    setCurrentItem({ name: '', chineseName: '', price: '' });
                    setEditMode(true);
                  }}
                >
                  Add Option
                </Button>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Connected Dishes:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selectedAddOn.connectedDishIds.map(dishId => {
                  const dish = sampleDishes.find(d => d.id === dishId);
                  return dish ? (
                    <Chip key={dishId} label={dish.name} size="small" />
                  ) : null;
                })}
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Chinese Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedAddOn.items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.chineseName}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEditItem(item)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteItem(item.id)}>
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>

      {/* Edit Add-on Dialog */}
      <Dialog open={editAddOnMode} onClose={() => setEditAddOnMode(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Edit {currentAddOn?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Add-on Name"
              value={currentAddOn?.name || ''}
              onChange={(e) => setCurrentAddOn({...currentAddOn, name: e.target.value})}
              fullWidth
              sx={{ mb: 3 }}
            />
            
            <Typography variant="subtitle1" gutterBottom>
              Connect to Dishes:
            </Typography>
            <Autocomplete
              multiple
              options={sampleDishes}
              getOptionLabel={(option) => option.name}
              value={sampleDishes.filter(dish => currentAddOn?.connectedDishIds.includes(dish.id))}
              onChange={(e, newValue) => handleDishSelection(newValue)}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select dishes" />
              )}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  {option.name}
                </li>
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditAddOnMode(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveAddOn}
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={editMode} onClose={() => setEditMode(false)}>
        <DialogTitle>
          {currentItem.id ? 'Edit Option' : 'Add New Option'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}>
            <TextField
              label="Name"
              value={currentItem.name}
              onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
              fullWidth
            />
            <TextField
              label="Chinese Name"
              value={currentItem.chineseName}
              onChange={(e) => setCurrentItem({...currentItem, chineseName: e.target.value})}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              value={currentItem.price}
              onChange={(e) => setCurrentItem({...currentItem, price: parseFloat(e.target.value) || 0})}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveItem}
            variant="contained"
            disabled={!currentItem.name || !currentItem.price}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Addons;