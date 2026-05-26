const {
    lerMedicos,
    salvarMedicos
} = require("../storage/medicoStorage");

const logger = require("../logs/logger");

function listarMedicos() {
    logger.info("Listagem de médicos realizada");
    return lerMedicos();
}

function cadastrarMedico(dados) {
    const medicos = lerMedicos();

    const novoMedico = {
        id: Date.now(),
        nome: dados.nome,
        especialidade: dados.especialidade,
        criadoEm: new Date().toISOString()
    };

    medicos.push(novoMedico);

    salvarMedicos(medicos);

    logger.info(`Médico cadastrado: ${dados.nome}`);

    return novoMedico;
}

function editarMedico(id, dados) {
    const medicos = lerMedicos();

    const medico = medicos.find(m => m.id == id);

    if (!medico) {
        throw new Error("Médico não encontrado.");
    }

    medico.nome = dados.nome;
    medico.especialidade = dados.especialidade;
    medico.atualizadoEm = new Date().toISOString();

    salvarMedicos(medicos);

    logger.info(`Médico editado: ${id}`);

    return medico;
}

function removerMedico(id) {
    const medicos = lerMedicos();

    const index = medicos.findIndex(m => m.id == id);

    if (index === -1) {
        throw new Error("Médico não encontrado.");
    }

    const removido = medicos.splice(index, 1)[0];

    salvarMedicos(medicos);

    logger.info(`Médico removido: ${id}`);

    return removido;
}

module.exports = {
    listarMedicos,
    cadastrarMedico,
    editarMedico,
    removerMedico
};