const {
    listarMedicos,
    cadastrarMedico,
    editarMedico,
    removerMedico
} = require("../services/medicoService");

function getMedicos(req, res) {
    res.json(listarMedicos());
}

function postMedico(req, res) {
    try {
        const { nome, especialidade } = req.body;

        if (!nome || !especialidade) {
            return res.status(400).json({
                mensagem: "Nome e especialidade são obrigatórios."
            });
        }

        const medico = cadastrarMedico({
            nome,
            especialidade
        });

        res.json({
            mensagem: "Médico cadastrado.",
            medico
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: erro.message
        });
    }
}

function putMedico(req, res) {
    try {
        const medico = editarMedico(req.params.id, req.body);

        res.json({
            mensagem: "Médico atualizado.",
            medico
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: erro.message
        });
    }
}

function deleteMedico(req, res) {
    try {
        const medico = removerMedico(req.params.id);

        res.json({
            mensagem: "Médico removido.",
            medico
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: erro.message
        });
    }
}

module.exports = {
    getMedicos,
    postMedico,
    putMedico,
    deleteMedico
};