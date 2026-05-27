const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const { consultas, pacientes, medicos, tipo } = workerData;

const pastaRelatorios = path.join(__dirname, "..", "..", "data", "relatorios");

if (!fs.existsSync(pastaRelatorios)) {
  fs.mkdirSync(pastaRelatorios, { recursive: true });
}

const dataAtual = new Date().toISOString().replace(/[:.]/g, "-");

function buscarPaciente(id) {
  return pacientes.find((p) => String(p.id) === String(id));
}

function buscarMedico(id) {
  return medicos.find((m) => String(m.id) === String(id));
}

function gerarCSV() {
  const nomeArquivo = `relatorio-consultas-${dataAtual}.csv`;
  const caminhoArquivo = path.join(pastaRelatorios, nomeArquivo);

  let conteudo = "ID,Paciente,Medico,Data,Horario,Status\n";

  consultas.forEach((consulta) => {
    const paciente = buscarPaciente(consulta.pacienteId);
    const medico = buscarMedico(consulta.medicoId);

    conteudo += `${consulta.id},`;
    conteudo += `${paciente ? paciente.nome : "Paciente não encontrado"},`;
    conteudo += `${medico ? medico.nome : "Médico não encontrado"},`;
    conteudo += `${consulta.data || ""},`;
    conteudo += `${consulta.horario || ""},`;
    conteudo += `${consulta.status || "Agendada"}\n`;
  });

  fs.writeFileSync(caminhoArquivo, conteudo, "utf8");

  return {
    nomeArquivo,
    caminhoArquivo
  };
}

function gerarPDF() {
  const nomeArquivo = `relatorio-consultas-${dataAtual}.pdf`;
  const caminhoArquivo = path.join(pastaRelatorios, nomeArquivo);

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(caminhoArquivo);

  doc.pipe(stream);

  doc.fontSize(18).text("Relatório de Consultas", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`);
  doc.moveDown();

  consultas.forEach((consulta, index) => {
    const paciente = buscarPaciente(consulta.pacienteId);
    const medico = buscarMedico(consulta.medicoId);

    doc.fontSize(13).text(`Consulta ${index + 1}`, { underline: true });
    doc.fontSize(11).text(`ID: ${consulta.id}`);
    doc.text(`Paciente: ${paciente ? paciente.nome : "Paciente não encontrado"}`);
    doc.text(`Médico: ${medico ? medico.nome : "Médico não encontrado"}`);
    doc.text(`Data: ${consulta.data || ""}`);
    doc.text(`Horário: ${consulta.horario || ""}`);
    doc.text(`Status: ${consulta.status || "Agendada"}`);
    doc.moveDown();
  });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      resolve({
        nomeArquivo,
        caminhoArquivo
      });
    });

    stream.on("error", reject);
  });
}

async function executar() {
  try {
    let resultado;

    if (tipo === "pdf") {
      resultado = await gerarPDF();
    } else {
      resultado = gerarCSV();
    }

    parentPort.postMessage({
      sucesso: true,
      ...resultado
    });
  } catch (erro) {
    parentPort.postMessage({
      sucesso: false,
      erro: erro.message
    });
  }
}

executar();