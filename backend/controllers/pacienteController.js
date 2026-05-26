const {
    listarPacientes,
    cadastrarPaciente,
    editarPaciente,
    removerPaciente
} = require("../services/pacienteService");

function getPacientes(req, res) {
    const pacientes = listarPacientes();
    res.json(pacientes);
}

function postPaciente(req, res) {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({
            mensagem: "Nome obrigatório"
        });
    }

    const paciente = cadastrarPaciente(nome);

    res.json({
        mensagem: "Paciente cadastrado",
        paciente
    });
}

function putPaciente(req, res) {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: "Nome obrigatório"
            });
        }

        const paciente = editarPaciente(req.params.id, nome);

        res.json({
            mensagem: "Paciente atualizado",
            paciente
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: erro.message
        });
    }
}

function deletePaciente(req, res) {
    try {
        const paciente = removerPaciente(req.params.id);

        res.json({
            mensagem: "Paciente removido",
            paciente
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: erro.message
        });
    }
}

module.exports = {
    getPacientes,
    postPaciente,
    putPaciente,
    deletePaciente
};