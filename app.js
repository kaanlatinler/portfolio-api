const express = require("express");
const cors = require("cors");
const sequelize = require("./src/utils/database");

const PORT = require("./src/cfg/cfg").port || 3000;
const version = require("./package.json").version;

const languageRoutes = require("./src/routes/languageRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const accountRoutes = require("./src/routes/accountRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.path}`);
  next();
});

app.use(`/${version}/languages`, languageRoutes);
app.use(`/${version}/projects`, projectRoutes);
app.use(`/${version}/contacts`, contactRoutes);
app.use(`/${version}/categories`, categoryRoutes);
app.use(`/${version}/accounts`, accountRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
