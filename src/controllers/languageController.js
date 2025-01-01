const { Languages } = require("../models");
const { Projects } = require("../models");

// Get all languages
const getLanguages = async (req, res) => {
  try {
    const languages = await Languages.findAll({
      where: { is_active: true },
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: languages,
    });
  } catch (error) {
    console.error("Error fetching Techs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Techs",
      error: error.message,
    });
  }
};

// Get single language by ID
const getLanguageById = async (req, res) => {
  try {
    const language = await Languages.findByPk(req.params.id);

    if (!language) {
      return res.status(404).json({
        success: false,
        message: "Tech not found",
      });
    }

    res.status(200).json({
      success: true,
      data: language,
    });
  } catch (error) {
    console.error("Error fetching Tech:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Tech",
      error: error.message,
    });
  }
};

// Create new language
const createLanguage = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Tech name is required",
      });
    }

    // Check if language already exists
    const existingLanguage = await Languages.findOne({
      where: { name },
    });

    if (existingLanguage) {
      return res.status(400).json({
        success: false,
        message: "Tech already exists",
      });
    }

    const language = await Languages.create({
      name,
      is_active: true,
    });

    res.status(201).json({
      success: true,
      message: "Tech created successfully",
      data: language,
    });
  } catch (error) {
    console.error("Error creating Tech:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Tech",
      error: error.message,
    });
  }
};

// Update language
const updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, is_active } = req.body;

    const language = await Languages.findByPk(id);

    if (!language) {
      return res.status(404).json({
        success: false,
        message: "Tech not found",
      });
    }

    // If updating name, check if it already exists
    if (name && name !== language.name) {
      const existingLanguage = await Languages.findOne({
        where: { name },
      });

      if (existingLanguage) {
        return res.status(400).json({
          success: false,
          message: "Tech name already exists",
        });
      }
    }

    await language.update({
      name: name || language.name,
      is_active: is_active !== undefined ? is_active : language.is_active,
    });

    res.status(200).json({
      success: true,
      message: "Tech updated successfully",
      data: language,
    });
  } catch (error) {
    console.error("Error updating Tech:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Tech",
      error: error.message,
    });
  }
};

// Delete language (soft delete)
const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Languages.findByPk(id);

    if (!language) {
      return res.status(404).json({
        success: false,
        message: "Tech not found",
      });
    }

    // Soft delete
    await language.update({ is_active: false });

    res.status(200).json({
      success: true,
      message: "Tech deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Tech:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Tech",
      error: error.message,
    });
  }
};

// Hard delete language
const hardDeleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Languages.findByPk(id);

    if (!language) {
      return res.status(404).json({
        success: false,
        message: "Tech not found",
      });
    }

    // Check if language is being used by any projects
    const projectCount = await Projects.count({
      where: { language_id: id },
    });

    if (projectCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete Tech as it is being used by projects",
      });
    }

    // Permanently delete the language
    await language.destroy();

    res.status(200).json({
      success: true,
      message: "Tech permanently deleted",
    });
  } catch (error) {
    console.error("Error permanently deleting Tech:", error);
    res.status(500).json({
      success: false,
      message: "Failed to permanently delete Tech",
      error: error.message,
    });
  }
};

module.exports = {
  getLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  hardDeleteLanguage,
};
