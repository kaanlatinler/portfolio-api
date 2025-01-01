const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  hardDeleteProject
} = require('../controllers/projectController');
const authenticateToken  = require('../middlewares/authMiddleware');
router.get('/get-all-projects', authenticateToken, getProjects);
router.get('/get-project-by-id/:id', authenticateToken, getProjectById);
router.post('/create-project', authenticateToken, createProject);
router.put('/update-project/:id', authenticateToken, updateProject);
router.delete('/delete-project/:id', authenticateToken, deleteProject);
router.delete('/hard-delete-project/:id', authenticateToken, hardDeleteProject);

module.exports = router; 