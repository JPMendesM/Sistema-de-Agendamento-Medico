const {
    listarConsultas,
    agendarConsulta,
    cancelarConsulta,
    editarConsulta
} = require("../services/consultaService");

function getConsultas(req, res) {
    const consultas = listarConsultas();
    res.json(consultas);
}

function postConsulta(req, res) {
    try {
        const { paciente, medico, data, horario } = req.body;

        if (!paciente || !medico || !data || !horario) {
            return res.status(400).json({
                mensagem: "Paciente, médico, data e horário são obrigatórios."
            });
        }

        const consulta = agendarConsulta({
            paciente,
            medico,
            data,
            horario
        });

        res.json({
            mensagem: "Consulta agendada com sucesso.",
            consulta
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: erro.message
        });
    }
}
function deleteConsulta(req, res) {

    try {

        const consulta = cancelarConsulta(
            req.params.id
        );

        res.json({
            mensagem: "Consulta cancelada.",
            consulta
        });

    } catch (erro) {

        res.status(400).json({
            mensagem: erro.message
        });
    }
}

function putConsulta(req, res) {

    try {

        const consulta = editarConsulta(
            req.params.id,
            req.body
        );

        res.json({
            mensagem: "Consulta atualizada.",
            consulta
        });

    } catch (erro) {

        res.status(400).json({
            mensagem: erro.message
        });
    }
}

module.exports = {
    getConsultas,
    postConsulta,
    deleteConsulta,
    putConsulta
};