const express = require("express");

const router = express.Router();

const {
    getPacientes,
    postPaciente,
    putPaciente,
    deletePaciente
} = require("../controllers/pacienteController");

router.get("/", getPacientes);
router.post("/", postPaciente);
router.put("/:id", putPaciente);
router.delete("/:id", deletePaciente);

module.exports = router;