const { lerPacientes } = require("../storage/pacienteStorage");
const { lerMedicos } = require("../storage/medicoStorage");

const path = require("path");
const { Worker } = require("worker_threads");

const { lerConsultas, salvarConsultas } = require("../storage/consultaStorage");

const logger = require("../logs/logger");
const lock = require("../concurrent/agendamentoLock");
const cache = require("../cache/consultaCache");

function listarConsultas() {
  const cacheConsultas = cache.buscar("consultas");

  if (cacheConsultas) {
    logger.debug("Consultas carregadas do cache");
    return cacheConsultas.valor;
  }

  const consultas = lerConsultas();
  const pacientes = lerPacientes();
  const medicos = lerMedicos();

  const pacienteExiste = pacientes.some(
    (paciente) => paciente.nome === dados.paciente,
  );

  const medicoExiste = medicos.some((medico) => medico.nome === dados.medico);

  if (!pacienteExiste) {
    throw new Error("Paciente não cadastrado no sistema.");
  }

  if (!medicoExiste) {
    throw new Error("Médico não cadastrado no sistema.");
  }

  cache.salvar("consultas", consultas);

  logger.info("Consultas carregadas do arquivo");

  return consultas;
}

function gerarRelatorioEmThread(consultas) {
  const worker = new Worker(
    path.join(__dirname, "../workers/relatorioWorker.js"),
    {
      workerData: consultas,
    },
  );

  worker.on("message", (resultado) => {
    if (resultado.sucesso) {
      logger.info(`Relatório gerado em Worker Thread: ${resultado.arquivo}`);
    } else {
      logger.erro(`Erro no Worker de relatório: ${resultado.erro}`);
    }
  });

  worker.on("error", (erro) => {
    logger.erro(`Falha na Worker Thread: ${erro.message}`);
  });
}

function agendarConsulta(dados) {
  if (!lock.adquirir()) {
    logger.erro("Tentativa de agendamento bloqueada por concorrência");

    throw new Error(
      "Sistema ocupado processando outro agendamento. Tente novamente.",
    );
  }

  try {
    const consultas = lerConsultas();

    const conflito = consultas.find(
      (consulta) =>
        consulta.medico === dados.medico &&
        consulta.data === dados.data &&
        consulta.horario === dados.horario &&
        consulta.status !== "CANCELADA",
    );

    if (conflito) {
      logger.erro(
        `Conflito de horário: ${dados.medico} em ${dados.data} às ${dados.horario}`,
      );

      throw new Error(
        "Já existe uma consulta marcada para esse médico nesse horário.",
      );
    }

    const novaConsulta = {
      id: Date.now(),
      paciente: dados.paciente,
      medico: dados.medico,
      data: dados.data,
      horario: dados.horario,
      status: "AGENDADA",
      criadoEm: new Date().toISOString(),
    };

    consultas.push(novaConsulta);

    salvarConsultas(consultas);

    cache.salvar("consultas", consultas);

    logger.info(`Consulta agendada: ${dados.paciente} com ${dados.medico}`);

    gerarRelatorioEmThread(consultas);

    return novaConsulta;
  } finally {
    lock.liberar();
  }
}

function cancelarConsulta(id) {
  const consultas = lerConsultas();

  const consulta = consultas.find((c) => c.id == id);

  if (!consulta) {
    throw new Error("Consulta não encontrada.");
  }

  consulta.status = "CANCELADA";
  consulta.canceladoEm = new Date().toISOString();

  salvarConsultas(consultas);

  cache.salvar("consultas", consultas);

  logger.info(`Consulta cancelada: ${id}`);

  gerarRelatorioEmThread(consultas);

  return consulta;
}

function editarConsulta(id, novosDados) {
  const consultas = lerConsultas();

  const consulta = consultas.find((c) => c.id == id);

  if (!consulta) {
    throw new Error("Consulta não encontrada.");
  }

  const conflito = consultas.find(
    (c) =>
      c.id != id &&
      c.medico === novosDados.medico &&
      c.data === novosDados.data &&
      c.horario === novosDados.horario &&
      c.status !== "CANCELADA",
  );

  if (conflito) {
    logger.erro(
      `Conflito ao editar consulta: ${novosDados.medico} em ${novosDados.data} às ${novosDados.horario}`,
    );

    throw new Error("Conflito de horário.");
  }

  consulta.paciente = novosDados.paciente;
  consulta.medico = novosDados.medico;
  consulta.data = novosDados.data;
  consulta.horario = novosDados.horario;
  consulta.atualizadoEm = new Date().toISOString();

  salvarConsultas(consultas);

  cache.salvar("consultas", consultas);

  logger.info(`Consulta editada: ${id}`);

  gerarRelatorioEmThread(consultas);

  return consulta;
}

module.exports = {
  listarConsultas,
  agendarConsulta,
  cancelarConsulta,
  editarConsulta,
};
