function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");

  toast.textContent = mensagem;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

async function atualizarTudo() {
  await carregarPacientes();
  await carregarMedicos();
  await carregarConsultas();
  await carregarDashboard();
}

async function cadastrarPaciente() {
  const nome = document.getElementById("nomePaciente").value.trim();

  if (!nome) {
    mostrarToast("Digite o nome do paciente.");
    return;
  }

  const resposta = await fetch("/api/pacientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome }),
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  document.getElementById("nomePaciente").value = "";

  await atualizarTudo();
}

async function carregarPacientes() {
  const resposta = await fetch("/api/pacientes");
  const pacientes = await resposta.json();

  const lista = document.getElementById("listaPacientes");

  const selectPaciente = document.getElementById("consultaPaciente");

  selectPaciente.innerHTML = "<option value=''>Selecione um paciente</option>";

  lista.innerHTML = "";

  if (pacientes.length === 0) {
    lista.innerHTML = "<li>Nenhum paciente cadastrado.</li>";
    return;
  }

  pacientes.forEach((paciente) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <span>${paciente.nome}</span>

            <div class="actions">
                <button class="btn-warning" onclick='editarPaciente(${paciente.id}, ${JSON.stringify(paciente.nome)})'>
    Editar
</button>

                <button class="btn-danger" onclick="removerPaciente(${paciente.id})">
                    Remover
                </button>
            </div>
        `;

    lista.appendChild(li);
    selectPaciente.innerHTML += `<option value="${paciente.nome}">${paciente.nome}</option>`;
  });
}

async function editarPaciente(id, nomeAtual) {
  const novoNome = prompt("Novo nome do paciente:", nomeAtual);

  if (!novoNome || !novoNome.trim()) {
    return;
  }

  const resposta = await fetch(`/api/pacientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: novoNome.trim(),
    }),
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  await atualizarTudo();
}

async function removerPaciente(id) {
  if (!confirm("Deseja remover este paciente?")) {
    return;
  }

  const resposta = await fetch(`/api/pacientes/${id}`, {
    method: "DELETE",
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  await atualizarTudo();
}

async function cadastrarMedico() {
  const nome = document.getElementById("nomeMedico").value.trim();
  const especialidade = document
    .getElementById("especialidadeMedico")
    .value.trim();

  if (!nome || !especialidade) {
    mostrarToast("Nome e especialidade são obrigatórios.");
    return;
  }

  const resposta = await fetch("/api/medicos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      especialidade,
    }),
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  document.getElementById("nomeMedico").value = "";
  document.getElementById("especialidadeMedico").value = "";

  await atualizarTudo();
}

async function carregarMedicos() {
  const resposta = await fetch("/api/medicos");
  const medicos = await resposta.json();

  const tabela = document.getElementById("listaMedicos");
  const selectMedico = document.getElementById("consultaMedico");

  selectMedico.innerHTML = "<option value=''>Selecione um médico</option>";

  tabela.innerHTML = "";

  if (medicos.length === 0) {
    tabela.innerHTML = `
            <tr>
                <td colspan="3">Nenhum médico cadastrado.</td>
            </tr>
        `;
    return;
  }

  medicos.forEach((medico) => {
    tabela.innerHTML += `
            <tr>
                <td>${medico.nome}</td>
                <td>${medico.especialidade}</td>
                <td>
                    <div class="actions">
<button class="btn-warning" onclick='editarMedico(${medico.id}, ${JSON.stringify(medico.nome)}, ${JSON.stringify(medico.especialidade)})'>
    Editar
</button>

                        <button class="btn-danger" onclick="removerMedico(${medico.id})">
                            Remover
                        </button>
                    </div>
                </td>
            </tr>
        `;
    selectMedico.innerHTML += `<option value="${medico.nome}">${medico.nome}</option>`;
  });
}

async function editarMedico(id, nomeAtual, especialidadeAtual) {
  const novoNome = prompt("Novo nome do médico:", nomeAtual);

  if (!novoNome || !novoNome.trim()) {
    return;
  }

  const novaEspecialidade = prompt("Nova especialidade:", especialidadeAtual);

  if (!novaEspecialidade || !novaEspecialidade.trim()) {
    return;
  }

  const resposta = await fetch(`/api/medicos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: novoNome.trim(),
      especialidade: novaEspecialidade.trim(),
    }),
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  await atualizarTudo();
}

async function removerMedico(id) {
  if (!confirm("Deseja remover este médico?")) {
    return;
  }

  const resposta = await fetch(`/api/medicos/${id}`, {
    method: "DELETE",
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  await atualizarTudo();
}

async function agendarConsulta() {
  const paciente = document.getElementById("consultaPaciente").value.trim();
  const medico = document.getElementById("consultaMedico").value.trim();
  const data = document.getElementById("consultaData").value;
  const horario = document.getElementById("consultaHorario").value;

  if (!paciente || !medico || !data || !horario) {
    mostrarToast("Preencha todos os campos da consulta.");
    return;
  }

  const resposta = await fetch("/api/consultas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paciente,
      medico,
      data,
      horario,
    }),
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  if (resposta.ok) {
    document.getElementById("consultaPaciente").value = "";
    document.getElementById("consultaMedico").value = "";
    document.getElementById("consultaData").value = "";
    document.getElementById("consultaHorario").value = "";
  }

  await atualizarTudo();
}

async function carregarConsultas() {
  const resposta = await fetch("/api/consultas");
  const consultas = await resposta.json();

  const tabela = document.getElementById("listaConsultas");

  tabela.innerHTML = "";

  if (consultas.length === 0) {
    tabela.innerHTML = `
            <tr>
                <td colspan="6">Nenhuma consulta cadastrada.</td>
            </tr>
        `;
    return;
  }

  consultas.forEach((consulta) => {
    const statusClasse =
      consulta.status === "CANCELADA" ? "status-cancelada" : "status-agendada";

    tabela.innerHTML += `
            <tr>
                <td>${consulta.paciente}</td>
                <td>${consulta.medico}</td>
                <td>${consulta.data}</td>
                <td>${consulta.horario}</td>
                <td>
                    <span class="status ${statusClasse}">
                        ${consulta.status}
                    </span>
                </td>
                <td>
                    <div class="actions">
                        ${
                          consulta.status !== "CANCELADA"
                            ? `
<button class="btn-warning" onclick='editarConsulta(${consulta.id}, ${JSON.stringify(consulta.paciente)}, ${JSON.stringify(consulta.medico)}, ${JSON.stringify(consulta.data)}, ${JSON.stringify(consulta.horario)})'>
    Editar
</button>

                                    <button class="btn-danger" onclick="cancelarConsulta(${consulta.id})">
                                        Cancelar
                                    </button>
                                `
                            : `<button class="btn-secondary" disabled>Cancelada</button>`
                        }
                    </div>
                </td>
            </tr>
        `;
  });
}

async function editarConsulta(
  id,
  pacienteAtual,
  medicoAtual,
  dataAtual,
  horarioAtual,
) {
  const paciente = prompt("Paciente:", pacienteAtual);

  if (!paciente || !paciente.trim()) {
    return;
  }

  const medico = prompt("Médico:", medicoAtual);

  if (!medico || !medico.trim()) {
    return;
  }

  const data = prompt("Data da consulta:", dataAtual);

  if (!data || !data.trim()) {
    return;
  }

  const horario = prompt("Horário da consulta:", horarioAtual);

  if (!horario || !horario.trim()) {
    return;
  }

  const resposta = await fetch(`/api/consultas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paciente: paciente.trim(),
      medico: medico.trim(),
      data: data.trim(),
      horario: horario.trim(),
    }),
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  await atualizarTudo();
}

async function cancelarConsulta(id) {
  if (!confirm("Deseja cancelar esta consulta?")) {
    return;
  }

  const resposta = await fetch(`/api/consultas/${id}`, {
    method: "DELETE",
  });

  const dados = await resposta.json();

  mostrarToast(dados.mensagem);

  await atualizarTudo();
}

async function carregarDashboard() {
  const resposta = await fetch("/api/dashboard");
  const dados = await resposta.json();

  document.getElementById("dashPacientes").textContent = dados.pacientes;
  document.getElementById("dashMedicos").textContent = dados.medicos;
  document.getElementById("dashConsultas").textContent = dados.consultas;
  document.getElementById("dashAgendadas").textContent =
    dados.consultasAgendadas;
  document.getElementById("dashCanceladas").textContent =
    dados.consultasCanceladas;

  document.getElementById("dashSO").textContent = dados.sistemaOperacional;
  document.getElementById("dashArquitetura").textContent = dados.arquitetura;

  document.getElementById("dashMemoriaLivre").textContent =
    (dados.memoriaLivre / 1024 / 1024 / 1024).toFixed(2) + " GB";

  document.getElementById("dashMemoriaTotal").textContent =
    (dados.memoriaTotal / 1024 / 1024 / 1024).toFixed(2) + " GB";
}

atualizarTudo();
