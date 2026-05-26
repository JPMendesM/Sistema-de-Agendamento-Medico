const { parentPort, workerData } = require("worker_threads");

const fs = require("fs");
const path = require("path");

try {

    const pastaRelatorios = path.join(
        __dirname,
        "../../data/relatorios"
    );

    if (!fs.existsSync(pastaRelatorios)) {
        fs.mkdirSync(pastaRelatorios, {
            recursive: true
        });
    }

    const consultas = workerData;

    let csv = "ID,Paciente,Médico,Data,Horário\n";

    consultas.forEach(consulta => {

        csv += `${consulta.id},${consulta.paciente},${consulta.medico},${consulta.data},${consulta.horario}\n`;

    });

    const caminhoArquivo = path.join(
        pastaRelatorios,
        `relatorio-${Date.now()}.csv`
    );

    fs.writeFileSync(caminhoArquivo, csv);

    parentPort.postMessage({
        sucesso: true,
        arquivo: caminhoArquivo
    });

} catch (erro) {

    parentPort.postMessage({
        sucesso: false,
        erro: erro.message
    });

}