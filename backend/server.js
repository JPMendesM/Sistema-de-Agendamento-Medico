const express = require("express");
const path = require("path");
const os = require("os");
const { Worker } = require("worker_threads");

const consultaRoutes = require("./routes/consultaRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");
const medicoRoutes = require("./routes/medicoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const fs = require("fs");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/api/medicos", medicoRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/status", (req, res) => {
  res.json({
    status: "Sistema rodando",
    sistemaOperacional: os.platform(),
    arquitetura: os.arch(),
    memoriaLivre: os.freemem(),
    memoriaTotal: os.totalmem(),
  });
});

app.use("/api/pacientes", pacienteRoutes);
app.use("/api/consultas", consultaRoutes);

app.get("/api/relatorios/:tipo", (req, res) => {
  const tipo = req.params.tipo;

  if (tipo !== "csv" && tipo !== "pdf") {
    return res.status(400).json({
      erro: "Tipo de relatório inválido. Use csv ou pdf.",
    });
  }

  const pacientes = lerArquivo("pacientes.json");
  const medicos = lerArquivo("medicos.json");
  const consultas = lerArquivo("consultas.json");

  const worker = new Worker(
    path.join(__dirname, "workers", "relatorioWorker.js"),
    {
      workerData: {
        pacientes,
        medicos,
        consultas,
        tipo,
      },
    },
  );

  worker.on("message", (resultado) => {
    if (!resultado.sucesso) {
      return res.status(500).json({
        erro: resultado.erro,
      });
    }

    res.json({
      mensagem: "Relatório gerado com sucesso!",
      arquivo: resultado.nomeArquivo,
      download: `/api/relatorios/download/${resultado.nomeArquivo}`,
    });
  });

  worker.on("error", (erro) => {
    res.status(500).json({
      erro: erro.message,
    });
  });
});

function lerArquivo(nomeArquivo) {
  const caminhoArquivo = path.join(__dirname, "..", "data", nomeArquivo);

  if (!fs.existsSync(caminhoArquivo)) {
    return [];
  }

  const conteudo = fs.readFileSync(caminhoArquivo, "utf8");

  if (!conteudo.trim()) {
    return [];
  }

  return JSON.parse(conteudo);
}
app.get("/api/relatorios/download/:arquivo", (req, res) => {
  const nomeArquivo = req.params.arquivo;

  const caminhoArquivo = path.join(
    __dirname,
    "..",
    "data",
    "relatorios",
    nomeArquivo,
  );

  if (!fs.existsSync(caminhoArquivo)) {
    return res.status(404).json({
      erro: "Relatório não encontrado.",
    });
  }

  res.download(caminhoArquivo);
});

app.get("/api/relatorios/download/:arquivo", (req, res) => {
  const nomeArquivo = req.params.arquivo;

  const caminhoArquivo = path.join(
    __dirname,
    "..",
    "data",
    "relatorios",
    nomeArquivo,
  );

  if (!fs.existsSync(caminhoArquivo)) {
    return res.status(404).json({
      erro: "Relatório não encontrado.",
    });
  }

  res.download(caminhoArquivo);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
