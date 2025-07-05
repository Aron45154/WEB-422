/********************************************************************************
*  WEB422 – Assignment 1
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Moe Thet Paing   Student ID: 128784238   Date: May 20, 2025
*
*  Published URL on Vercel:
*
********************************************************************************/

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const SitesDB = require('./modules/sitesDB.js');
const db = new SitesDB();

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "API Listening",
    term: "Summer 2025",
    student: "Moe Thet Paing"
  });
});

// POST /api/sites
app.post("/api/sites", async (req, res) => {
  try {
    const site = await db.addNewSite(req.body);
    res.status(201).json(site);
  } catch (err) {
    res.status(500).json({ error: "Failed to create site" });
  }
});

// GET /api/sites
app.get("/api/sites", async (req, res) => {
  const { page, perPage, name, region, provinceOrTerritoryName } = req.query;
  try {
    const sites = await db.getAllSites(
      parseInt(page), 
      parseInt(perPage), 
      name, 
      region, 
      provinceOrTerritoryName
    );
    res.json(sites);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to fetch sites" });
  }
});

// GET /api/sites/:id
app.get("/api/sites/:id", async (req, res) => {
  try {
    const site = await db.getSiteById(req.params.id);
    if (!site) {
      res.status(404).json({ error: "Site not found" });
    } else {
      res.json(site);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch site" });
  }
});

// PUT /api/sites/:id
app.put("/api/sites/:id", async (req, res) => {
  try {
    const updated = await db.updateSiteById(req.body, req.params.id);
    if (updated.modifiedCount === 0) {
      res.status(404).json({ error: "Site not found or no changes made" });
    } else {
      res.json({ message: "Site updated successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update site" });
  }
});

// DELETE /api/sites/:id
app.delete("/api/sites/:id", async (req, res) => {
  try {
    const deleted = await db.deleteSiteById(req.params.id);
    if (deleted.deletedCount === 0) {
      res.status(404).json({ error: "Site not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete site" });
  }
});

// Start server only after DB initialized
db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
  });
}).catch(err => {
  console.error(err);
});