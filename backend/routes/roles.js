const express = require("express");
const router = express.Router();
const Role = require("../models/role.model");
const defaultRoles = [
  { name: "Master Source", code: "MASTER", level: 999 },
  { name: "OWN Source", code: "OWNER", level: 700 },
  { name: "Source", code: "SOURCE", level: 400 },
  { name: "Panel", code: "PANEL", level: 100 }
];
router.get("/init/reset", async (req, res) =
  try {
    await Role.deleteMany({});
    await Role.insertMany(defaultRoles);
    return res.json({ success: true, message: "Roles reset and initialized." });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});
module.exports = router;
