const os = require("os");
const path = require("path");

function obterDiretorioBase() {

    const plataforma = os.platform();

    if (plataforma === "win32") {

        return path.join(
            process.env.USERPROFILE,
            "SistemaAgendamento"
        );
    }

    return path.join(
        process.env.HOME,
        "SistemaAgendamento"
    );
}

module.exports = {
    obterDiretorioBase
};