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

function obterPaciente(consulta) {
  const idPaciente =
    consulta.pacienteId ||
    consulta.idPaciente ||
    consulta.paciente_id ||
    consulta.paciente;

  const pacienteEncontrado = pacientes.find(
    (p) => String(p.id) === String(idPaciente),
  );

  if (pacienteEncontrado) {
    return pacienteEncontrado.nome;
  }

  return (
    consulta.nomePaciente || consulta.paciente || "Paciente não encontrado"
  );
}

function obterMedico(consulta) {
  const idMedico =
    consulta.medicoId ||
    consulta.idMedico ||
    consulta.medico_id ||
    consulta.medico;

  const medicoEncontrado = medicos.find(
    (m) => String(m.id) === String(idMedico),
  );

  if (medicoEncontrado) {
    return medicoEncontrado.nome;
  }

  return consulta.nomeMedico || consulta.medico || "Médico não encontrado";
}

function gerarCSV() {
  const nomeArquivo = `relatorio-consultas-${dataAtual}.csv`;
  const caminhoArquivo = path.join(pastaRelatorios, nomeArquivo);

  let conteudo = "ID,Paciente,Medico,Data,Horario,Status\n";

  consultas.forEach((consulta) => {
    const paciente = obterPaciente(consulta);
    const medico = obterMedico(consulta);

    conteudo += `${consulta.id},`;
    conteudo += `${paciente},`;
    conteudo += `${medico},`;
    conteudo += `${consulta.data || ""},`;
    conteudo += `${consulta.horario || ""},`;
    conteudo += `${consulta.status || "Agendada"}\n`;
  });

  fs.writeFileSync(caminhoArquivo, conteudo, "utf8");

  return {
    nomeArquivo,
    caminhoArquivo,
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
    const paciente = obterPaciente(consulta);
    const medico = obterMedico(consulta);

    doc.fontSize(13).text(`Consulta ${index + 1}`, { underline: true });
    doc.fontSize(11).text(`ID: ${consulta.id}`);
    doc.text(`Paciente: ${paciente}`);
    doc.text(`Médico: ${medico}`);
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
        caminhoArquivo,
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
      ...resultado,
    });
  } catch (erro) {
    parentPort.postMessage({
      sucesso: false,
      erro: erro.message,
    });
  }
}

executar();
