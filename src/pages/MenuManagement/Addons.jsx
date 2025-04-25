import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Autocomplete
} from '@mui/material';
import { Add, Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { sampleAddOnData, sampleDishes } from './sampleAddOnData';

const Addons = () => {
  const [addOns, setAddOns] = useState(sampleAddOnData);
  const [editingAddOnId, setEditingAddOnId] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', chineseName: '', price: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAddOn, setCurrentAddOn] = useState(null);

  const handleEditClick = (addOnId) => {
    setEditingAddOnId(addOnId);
    const addOn = addOns.find(a => a.id === addOnId);
    setCurrentAddOn({ ...addOn });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAddOnId(null);
    setCurrentAddOn(null);
    setNewItem({ name: '', chineseName: '', price: '' });
  };

  const handleSaveChanges = () => {
    const updatedAddOns = addOns.map(addOn => {
      if (addOn.id === editingAddOnId) {
        return currentAddOn;
      }
      return addOn;
    });
    setAddOns(updatedAddOns);
    handleCloseDialog();
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...currentAddOn.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setCurrentAddOn({
      ...currentAddOn,
      items: updatedItems
    });
  };

  const handleAddNewItem = () => {
    if (newItem.name && newItem.price) {
      const newItemWithId = {
        ...newItem,
        id: `${currentAddOn.id}-${Date.now()}`,
        price: parseFloat(newItem.price)
      };
      setCurrentAddOn({
        ...currentAddOn,
        items: [...currentAddOn.items, newItemWithId]
      });
      setNewItem({ name: '', chineseName: '', price: '' });
    }
  };

  const handleDeleteItem = (itemId) => {
    setCurrentAddOn({
      ...currentAddOn,
      items: currentAddOn.items.filter(item => item.id !== itemId)
    });
  };

  const handleDishesChange = (event, value) => {
    setCurrentAddOn({
      ...currentAddOn,
      connectedDishIds: value.map(dish => dish.id)
    });
  };

  const getConnectedDishNames = (dishIds) => {
    return dishIds.map(dishId => {
      const dish = sampleDishes.find(d => d.id === dishId);
      return dish ? dish.name : 'Unknown Dish';
    });
  };

  const getSelectedDishes = () => {
    return currentAddOn?.connectedDishIds
      ? sampleDishes.filter(dish => currentAddOn.connectedDishIds.includes(dish.id))
      : [];
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add-ons Management
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Add-on Name</TableCell>
              <TableCell>Connected Dishes</TableCell>
              <TableCell>Number of Options</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addOns.map((addOn) => (
              <TableRow key={addOn.id}>
                <TableCell>{addOn.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {getConnectedDishNames(addOn.connectedDishIds).map((name, index) => (
                      <Chip key={index} label={name} size="small" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{addOn.items.length}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditClick(addOn.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          Edit Add-on: {currentAddOn?.name}
        </DialogTitle>
        <DialogContent>
          {currentAddOn && (
            <Box sx={{ marginTop: 2 }}>
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <Autocomplete
                  multiple
                  options={sampleDishes}
                  getOptionLabel={(option) => option.name}
                  value={getSelectedDishes()}
                  onChange={handleDishesChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Connected Dishes"
                      placeholder="Select dishes"
                    />
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
              </FormControl>

              <Typography variant="h6" gutterBottom>
                Add-on Options
              </Typography>
              
              <TableContainer component={Paper}>
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
                    {currentAddOn.items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <TextField
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            fullWidth
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={item.chineseName}
                            onChange={(e) => handleItemChange(index, 'chineseName', e.target.value)}
                            fullWidth
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            type="number"
                            fullWidth
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleDeleteItem(item.id)}>
                            <Delete color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <TextField
                          value={newItem.name}
                          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                          placeholder="New item name"
                          fullWidth
                          variant="standard"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={newItem.chineseName}
                          onChange={(e) => setNewItem({...newItem, chineseName: e.target.value})}
                          placeholder="Chinese name"
                          fullWidth
                          variant="standard"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={newItem.price}
                          onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                          placeholder="Price"
                          type="number"
                          fullWidth
                          variant="standard"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={handleAddNewItem}
                          startIcon={<Add />}
                          disabled={!newItem.name || !newItem.price}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveChanges} 
            startIcon={<Save />}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Addons;