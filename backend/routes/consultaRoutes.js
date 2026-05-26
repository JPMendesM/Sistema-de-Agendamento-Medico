const express = require("express");

const router = express.Router();

const {
  getConsultas,
  postConsulta,
  deleteConsulta,
  putConsulta,
} = require("../controllers/consultaController");
router.get("/", getConsultas);
router.post("/", postConsulta);
router.delete("/:id", deleteConsulta);

router.put("/:id", putConsulta);

module.exports = router;
