const { Categories } = require('../models');

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({ 
      where: { is_active: true },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

// Get single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
      error: error.message
    });
  }
};

// Create new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    const category = await Categories.create({
      name,
      is_active: true
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create category',
      error: error.message
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, is_active } = req.body;

    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    await category.update({
      name: name || category.name,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update category',
      error: error.message
    });
  }
};

// Delete category (soft delete)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Soft delete by setting is_active to false
    await category.update({ is_active: false });

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category',
      error: error.message
    });
  }
};

// Hard delete category (optional)
const hardDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    await category.destroy();

    res.status(200).json({
      success: true,
      message: 'Category permanently deleted'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category',
      error: error.message
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  hardDeleteCategory
};