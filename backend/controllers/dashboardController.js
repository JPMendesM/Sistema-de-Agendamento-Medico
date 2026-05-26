const os = require("os");

const { lerPacientes } = require("../storage/pacienteStorage");
const { lerMedicos } = require("../storage/medicoStorage");
const { lerConsultas } = require("../storage/consultaStorage");

function getDashboard(req, res) {
    const pacientes = lerPacientes();
    const medicos = lerMedicos();
    const consultas = lerConsultas();

    const agendadas = consultas.filter(c => c.status === "AGENDADA").length;
    const canceladas = consultas.filter(c => c.status === "CANCELADA").length;

    res.json({
        pacientes: pacientes.length,
        medicos: medicos.length,
        consultas: consultas.length,
        consultasAgendadas: agendadas,
        consultasCanceladas: canceladas,
        sistemaOperacional: os.platform(),
        arquitetura: os.arch(),
        memoriaLivre: os.freemem(),
        memoriaTotal: os.totalmem()
    });
}

module.exports = {
    getDashboard
};