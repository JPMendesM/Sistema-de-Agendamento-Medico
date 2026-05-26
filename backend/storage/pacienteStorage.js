const fs = require("fs");
const path = require("path");
const { gerarBackup } = require("./backupManager");

const caminhoPacientes = path.join(
    __dirname,
    "../../data/pacientes.json"
);

function lerPacientes() {
    try {
        const dados = fs.readFileSync(caminhoPacientes, "utf-8");
        return JSON.parse(dados);
    } catch (erro) {
        return [];
    }
}

function salvarPacientes(pacientes) {
    fs.writeFileSync(
        caminhoPacientes,
        JSON.stringify(pacientes, null, 2)
    );

    gerarBackup("pacientes.json");
}

module.exports = {
    lerPacientes,
    salvarPacientes
};