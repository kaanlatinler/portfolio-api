const { Projects, Categories, Languages } = require("../models");

// Get all projects with their relations
const getProjects = async (req, res) => {
  try {
    const projects = await Projects.findAll({
      where: { is_active: true },
      include: [
        { model: Categories, attributes: ["name"] },
        { model: Languages, attributes: ["name"] },
      ],
      order: [["project_date", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

// Get single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findByPk(req.params.id, {
      include: [
        { model: Categories, attributes: ["name"] },
        { model: Languages, attributes: ["name"] },
      ],
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
};

// Create new project
const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      url,
      client,
      project_date,
      image_url,
      category_id,
      tech_id,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "name",
      "description",
      "url",
      "client",
      "project_date",
      "image_url",
      "category_id",
      "tech_id",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate foreign keys
    const category = await Categories.findByPk(category_id);
    const language = await Languages.findByPk(tech_id);

    if (!category || !language) {
      return res.status(400).json({
        success: false,
        message: "Invalid category_id or tech_id",
      });
    }

    const project = await Projects.create({
      name,
      description,
      url,
      client,
      project_date,
      image_url,
      category_id,
      language_id: tech_id,
      is_active: true,
    });

    // Fetch the created project with its relations
    const projectWithRelations = await Projects.findByPk(project.id, {
      include: [
        { model: Categories, attributes: ["name"] },
        { model: Languages, attributes: ["name"] },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: projectWithRelations,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      url,
      client,
      project_date,
      image_url,
      category_id,
      language_id,
      is_active,
    } = req.body;

    const project = await Projects.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Validate foreign keys if provided
    if (category_id) {
      const category = await Categories.findByPk(category_id);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Invalid category_id",
        });
      }
    }

    if (language_id) {
      const language = await Languages.findByPk(language_id);
      if (!language) {
        return res.status(400).json({
          success: false,
          message: "Invalid language_id",
        });
      }
    }

    await project.update({
      name: name || project.name,
      description: description || project.description,
      url: url || project.url,
      client: client || project.client,
      project_date: project_date || project.project_date,
      image_url: image_url || project.image_url,
      category_id: category_id || project.category_id,
      language_id: language_id || project.language_id,
      is_active: is_active !== undefined ? is_active : project.is_active,
    });

    // Fetch updated project with relations
    const updatedProject = await Projects.findByPk(id, {
      include: [
        { model: Categories, attributes: ["name"] },
        { model: Languages, attributes: ["name"] },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// Delete project (soft delete)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Soft delete
    await project.update({ is_active: false });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

const hardDeleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Permanently delete the project
    await project.destroy();

    res.status(200).json({
      success: true,
      message: "Project permanently deleted",
    });
  } catch (error) {
    console.error("Error permanently deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to permanently delete project",
      error: error.message,
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  hardDeleteProject,
};
