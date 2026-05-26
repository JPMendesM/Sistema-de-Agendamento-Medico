const fs = require("fs");
const path = require("path");
const { gerarBackup } = require("./backupManager");

const caminhoConsultas = path.join(__dirname, "../../data/consultas.json");

function lerConsultas() {
    try {
        const dados = fs.readFileSync(caminhoConsultas, "utf-8");
        return JSON.parse(dados);
    } catch (erro) {
        return [];
    }
}

function salvarConsultas(consultas) {
    fs.writeFileSync(
        caminhoConsultas,
        JSON.stringify(consultas, null, 2)
    );

    gerarBackup("consultas.json");
}

module.exports = {
    lerConsultas,
    salvarConsultas
};