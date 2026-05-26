const fs = require("fs");
const path = require("path");
const logger = require("../logs/logger");

const pastaBackups = path.join(__dirname, "../../data/backups");

if (!fs.existsSync(pastaBackups)) {
    fs.mkdirSync(pastaBackups, { recursive: true });
}

function gerarBackup(nomeArquivoOriginal) {
    try {
        const caminhoOriginal = path.join(
            __dirname,
            "../../data",
            nomeArquivoOriginal
        );

        if (!fs.existsSync(caminhoOriginal)) {
            logger.erro(`Arquivo não encontrado para backup: ${nomeArquivoOriginal}`);
            return;
        }

        const data = new Date()
            .toISOString()
            .replace(/[:.]/g, "-");

        const caminhoBackup = path.join(
            pastaBackups,
            `${nomeArquivoOriginal.replace(".json", "")}_backup_${data}.json`
        );

        fs.copyFileSync(caminhoOriginal, caminhoBackup);

        logger.info(`Backup gerado: ${path.basename(caminhoBackup)}`);

    } catch (erro) {
        logger.erro(`Erro ao gerar backup: ${erro.message}`);
    }
}

module.exports = {
    gerarBackup
};