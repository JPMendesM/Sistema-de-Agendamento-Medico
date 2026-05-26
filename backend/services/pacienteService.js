const {
    lerPacientes,
    salvarPacientes
} = require("../storage/pacienteStorage");

const logger = require("../logs/logger");

function listarPacientes() {
    logger.info("Listagem de pacientes realizada");
    return lerPacientes();
}

function cadastrarPaciente(nome) {
    const pacientes = lerPacientes();

    const novoPaciente = {
        id: Date.now(),
        nome,
        criadoEm: new Date().toISOString()
    };

    pacientes.push(novoPaciente);

    salvarPacientes(pacientes);

    logger.info(`Paciente cadastrado: ${nome}`);

    return novoPaciente;
}

function editarPaciente(id, nome) {
    const pacientes = lerPacientes();

    const paciente = pacientes.find(p => p.id == id);

    if (!paciente) {
        throw new Error("Paciente não encontrado.");
    }

    paciente.nome = nome;
    paciente.atualizadoEm = new Date().toISOString();

    salvarPacientes(pacientes);

    logger.info(`Paciente editado: ${id}`);

    return paciente;
}

function removerPaciente(id) {
    const pacientes = lerPacientes();

    const index = pacientes.findIndex(p => p.id == id);

    if (index === -1) {
        throw new Error("Paciente não encontrado.");
    }

    const removido = pacientes.splice(index, 1)[0];

    salvarPacientes(pacientes);

    logger.info(`Paciente removido: ${id}`);

    return removido;
}

module.exports = {
    listarPacientes,
    cadastrarPaciente,
    editarPaciente,
    removerPaciente
};