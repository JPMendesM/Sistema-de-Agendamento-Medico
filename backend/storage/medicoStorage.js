const fs = require("fs");
const path = require("path");
const { gerarBackup } = require("./backupManager");

const caminhoMedicos = path.join(__dirname, "../../data/medicos.json");

function lerMedicos() {
    try {
        const dados = fs.readFileSync(caminhoMedicos, "utf-8");
        return JSON.parse(dados);
    } catch (erro) {
        return [];
    }
}

function salvarMedicos(medicos) {
    fs.writeFileSync(
        caminhoMedicos,
        JSON.stringify(medicos, null, 2)
    );

    gerarBackup("medicos.json");
}

module.exports = {
    lerMedicos,
    salvarMedicos
};