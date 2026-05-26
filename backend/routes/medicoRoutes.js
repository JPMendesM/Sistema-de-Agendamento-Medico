const express = require("express");

const router = express.Router();

const {
    getMedicos,
    postMedico,
    putMedico,
    deleteMedico
} = require("../controllers/medicoController");

router.get("/", getMedicos);
router.post("/", postMedico);
router.put("/:id", putMedico);
router.delete("/:id", deleteMedico);

module.exports = router;