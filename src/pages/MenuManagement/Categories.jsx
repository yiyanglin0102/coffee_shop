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
  // Helper functions
  const getUniqueCategories = () => {
    const categories = new Set(sampleMenuItems.map(item => item.category));
    return Array.from(categories).map((cat, index) => ({
      id: `cat-${index}`,
      name_en: cat.charAt(0).toUpperCase() + cat.slice(1),
      name_zh: getChineseName(cat),
      sortOrder: index + 1
    }));
  };

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
  const [currentCategory, setCurrentCategory] = useState({
    id: '',
    name_en: '',
    name_zh: '',
    sortOrder: 0
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [mockWarning, setMockWarning] = useState(true);

  // Dialog handlers
  const handleOpenCreateDialog = () => {
    setCurrentCategory({
      id: '',
      name_en: '',
      name_zh: '',
      sortOrder: categories.length + 1
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (category) => {
    console.log("Edit clicked", category); // Add this
    setCurrentCategory(category);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // CRUD operations
  const handleCreateCategory = () => {
    const newCategory = {
      ...currentCategory,
      id: `cat-${Date.now()}`
    };
    setCategories([...categories, newCategory]);
    handleCloseDialog();
  };

  const handleUpdateCategory = () => {
    setCategories(categories.map(cat => 
      cat.id === currentCategory.id ? currentCategory : cat
    ));
    handleCloseDialog();
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      {mockWarning && (
        <Alert severity="warning" onClose={() => setMockWarning(false)} sx={{ mb: 3 }}>
          Using mock data - changes won't persist after refresh
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Menu Categories</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenCreateDialog}
        >
          Add Category
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

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
                    <IconButton 
                      edge="end" 
                      aria-label="edit"
                      onClick={() => handleOpenEditDialog(category)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDeleteCategory(category.id)}
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

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="English Name"
              value={currentCategory.name_en}
              onChange={(e) => setCurrentCategory({
                ...currentCategory,
                name_en: e.target.value,
                name_zh: e.target.value === currentCategory.name_en 
                  ? currentCategory.name_zh 
                  : getChineseName(e.target.value)
              })}
              fullWidth
              sx={{ mt: 1 }}
            />
            <TextField
              label="Chinese Name"
              value={currentCategory.name_zh}
              onChange={(e) => setCurrentCategory({
                ...currentCategory,
                name_zh: e.target.value
              })}
              fullWidth
            />
            <TextField
              label="Sort Order"
              type="number"
              value={currentCategory.sortOrder}
              onChange={(e) => setCurrentCategory({
                ...currentCategory,
                sortOrder: parseInt(e.target.value) || 0
              })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={isEditing ? handleUpdateCategory : handleCreateCategory}
            variant="contained"
            disabled={!currentCategory.name_en}
          >
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesEditor;