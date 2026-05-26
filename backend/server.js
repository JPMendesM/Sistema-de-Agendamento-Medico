const express = require("express");
const path = require("path");
const os = require("os");

const consultaRoutes = require("./routes/consultaRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");
const medicoRoutes = require("./routes/medicoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/api/medicos", medicoRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(express.static(
    path.join(__dirname, "../public")
));

app.get("/api/status", (req, res) => {

    res.json({
        status: "Sistema rodando",
        sistemaOperacional: os.platform(),
        arquitetura: os.arch(),
        memoriaLivre: os.freemem(),
        memoriaTotal: os.totalmem()
    });

});

app.use("/api/pacientes", pacienteRoutes);
app.use("/api/consultas", consultaRoutes);

app.listen(PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );

});