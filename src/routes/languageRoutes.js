const express = require('express');
const router = express.Router();
const {
    getLanguages,
    getLanguageById,
    createLanguage,
    updateLanguage,
    deleteLanguage,
    hardDeleteLanguage
} = require('../controllers/languageController');
const authenticateToken  = require('../middlewares/authMiddleware');
router.get('/get-all-languages', authenticateToken, getLanguages);
router.get('/get-language-by-id/:id', authenticateToken, getLanguageById);
router.post('/create-language', authenticateToken, createLanguage);
router.put('/update-language/:id', authenticateToken, updateLanguage);
router.delete('/delete-language/:id', authenticateToken, deleteLanguage);
router.delete('/hard-delete-language/:id', authenticateToken, hardDeleteLanguage);

module.exports = router; 