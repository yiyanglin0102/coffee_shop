import React, { useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Alert
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { sampleMenuItems } from './sampleMenuData';

const CategoriesEditor = () => {
  // Derive categories from sample menu items
  const getUniqueCategories = () => {
    const categories = new Set(sampleMenuItems.map(item => item.category));
    return Array.from(categories).map((cat, index) => ({
      id: `mock-${index}`,
      name_en: cat.charAt(0).toUpperCase() + cat.slice(1),
      name_zh: getChineseName(cat), // Mock Chinese translation
      sortOrder: index + 1
    }));
  };

  // Mock translation function
  const getChineseName = (englishName) => {
    const translations = {
      coffee: '咖啡',
      tea: '茶',
      pastry: '糕点',
      breakfast: '早餐',
      sandwich: '三明治',
      smoothie: '冰沙'
    };
    return translations[englishName.toLowerCase()] || englishName;
  };

  // State
  const [categories, setCategories] = useState(getUniqueCategories());
  const [newCategory, setNewCategory] = useState({
    name_en: '',
    name_zh: '',
    sortOrder: categories.length + 1
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mockWarning, setMockWarning] = useState(true);

  // Mock create function
  const handleCreateCategory = () => {
    const newCat = {
      id: `mock-${Date.now()}`,
      ...newCategory,
      sortOrder: categories.length + 1
    };
    setCategories([...categories, newCat]);
    setIsDialogOpen(false);
    setNewCategory({ name_en: '', name_zh: '', sortOrder: categories.length + 2 });
  };

  // Mock delete function
  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      {mockWarning && (
        <Alert severity="warning" onClose={() => setMockWarning(false)} sx={{ mb: 3 }}>
          Using mock data - changes won't persist after refresh
        </Alert>
      )}

      {/* Header with Add button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Menu Categories</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Category
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Categories List */}
      <List sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
        {categories.length === 0 ? (
          <ListItem>
            <ListItemText primary="No categories found" />
          </ListItem>
        ) : (
          categories
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((category) => (
              <ListItem
                key={category.id}
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`${category.name_en} / ${category.name_zh}`}
                  secondary={`Sort Order: ${category.sortOrder} • ${sampleMenuItems
                    .filter(item => item.category.toLowerCase() === category.name_en.toLowerCase())
                    .length} items`}
                />
              </ListItem>
            ))
        )}
      </List>

      {/* Add Category Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="English Name"
              value={newCategory.name_en}
              onChange={(e) => setNewCategory({
                ...newCategory,
                name_en: e.target.value,
                name_zh: getChineseName(e.target.value) // Auto-translate
              })}
              fullWidth
            />
            <TextField
              label="Chinese Name"
              value={newCategory.name_zh}
              onChange={(e) => setNewCategory({
                ...newCategory,
                name_zh: e.target.value
              })}
              fullWidth
            />
            <TextField
              label="Sort Order"
              type="number"
              value={newCategory.sortOrder}
              onChange={(e) => setNewCategory({
                ...newCategory,
                sortOrder: parseInt(e.target.value) || categories.length + 1
              })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateCategory}
            variant="contained"
            disabled={!newCategory.name_en}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesEditor;