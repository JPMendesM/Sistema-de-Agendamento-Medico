const fs = require("fs");
const path = require("path");
const os = require("os");

const pastaLogs = path.join(__dirname, "../../data/logs");

if (!fs.existsSync(pastaLogs)) {
    fs.mkdirSync(pastaLogs, { recursive: true });
}

function gerarTimestamp() {
    return new Date().toLocaleString("pt-BR", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
}

function escreverLog(nivel, mensagem) {
    const dataArquivo = new Date().toISOString().split("T")[0];

    const caminhoLog = path.join(
        pastaLogs,
        `sistema-${dataArquivo}.log`
    );

    const linha = `[${gerarTimestamp()}] [${nivel}] [${os.platform()}] ${mensagem}\n`;

    fs.appendFileSync(caminhoLog, linha, "utf-8");
}

function info(mensagem) {
    escreverLog("INFO", mensagem);
}

function erro(mensagem) {
    escreverLog("ERROR", mensagem);
}

function debug(mensagem) {
    escreverLog("DEBUG", mensagem);
}

module.exports = {
    info,
    erro,
    debug
};