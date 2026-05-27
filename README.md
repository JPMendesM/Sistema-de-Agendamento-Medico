# Sistema de Agendamento Médico

Sistema web completo de agendamento de consultas médicas desenvolvido com Node.js, Express e JavaScript, aplicando conceitos fundamentais de Sistemas Operacionais.

---

# 📋 Sobre o Projeto

O projeto foi desenvolvido com o objetivo de simular um ambiente real de agendamento médico, permitindo o gerenciamento completo de:

- Pacientes
- Médicos
- Consultas
- Relatórios
- Logs
- Backups automáticos

Além das funcionalidades CRUD tradicionais, o sistema também implementa conceitos importantes de Sistemas Operacionais para garantir integridade, desempenho e controle de concorrência.

---

# 👨‍💻 Integrantes

- João Pedro

---

# 🚀 Tecnologias Utilizadas

## Backend

- Node.js
- Express.js

## Frontend

- HTML5
- CSS3
- JavaScript

## Persistência de Dados

- JSON

## Recursos do Sistema Operacional

- Worker Threads
- File System (fs)
- path
- os

---

# 📌 Funcionalidades

## 👤 Pacientes

- Cadastrar paciente
- Listar pacientes
- Editar paciente
- Remover paciente

---

## 👨‍⚕️ Médicos

- Cadastrar médico
- Listar médicos
- Editar médico
- Remover médico

---

## 📅 Consultas

- Agendar consulta
- Editar consulta
- Cancelar consulta
- Verificação de conflito de horário
- Validação de pacientes e médicos cadastrados

---

## 📊 Dashboard

- Quantidade de pacientes
- Quantidade de médicos
- Quantidade de consultas
- Consultas agendadas
- Consultas canceladas
- Informações do sistema operacional
- Monitoramento de memória RAM

---

# 🧠 Conceitos de Sistemas Operacionais Aplicados

## 🔒 Concorrência

O sistema utiliza mecanismos de lock para evitar conflitos durante agendamentos simultâneos.

### Exemplo:

Evita que duas consultas sejam marcadas para o mesmo médico no mesmo horário.

---

## 🧵 Threads

Worker Threads são utilizadas para geração de relatórios CSV em segundo plano sem bloquear o servidor principal.

---

## 💾 Sistema de Arquivos

Manipulação de arquivos JSON para persistência de dados, logs e backups automáticos.

---

## 🧠 Gerência de Memória

Uso de cache em memória para otimização das leituras de consultas.

---

## 🔄 Entrada e Saída (I/O)

Leitura e escrita de arquivos utilizando o módulo `fs` do Node.js.

---

## ⚙️ Chamadas de Sistema

Uso dos módulos:

- `fs`
- `os`
- `path`

para interação com o sistema operacional.

---

# 📂 Estrutura do Projeto

```bash
sistema-agendamento/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── workers/
│   └── utils/
│
├── data/
│   ├── backups/
│   ├── logs/
│   ├── relatorios/
│   ├── pacientes.json
│   ├── medicos.json
│   └── consultas.json
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── package.json
└── README.md
```

---

# ▶️ Como Executar

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-repositorio/sistema-agendamento.git
```

---

## 2️⃣ Entrar na pasta do projeto

```bash
cd sistema-agendamento
```

---

## 3️⃣ Instalar as dependências

```bash
npm install
```

---

## 4️⃣ Iniciar o servidor

```bash
npm start
```

---

## 5️⃣ Acessar o sistema

```bash
http://localhost:3000
```

---

# 📋 Requisitos

- Node.js 18+
- Google Chrome
- Microsoft Edge

---

# 🔐 Funcionalidades de Segurança e Integridade

- Controle de conflitos de consultas
- Verificação de pacientes e médicos cadastrados
- Logs automáticos
- Backups automáticos
- Controle concorrente de agendamentos

---

# 📝 Logs

O sistema registra automaticamente:

- Operações de cadastro
- Atualizações
- Exclusões
- Conflitos
- Erros
- Geração de relatórios
- Execução de backups

---

# 💾 Backups

Backups automáticos dos arquivos JSON são gerados após alterações nos dados do sistema.

---

# 📈 Relatórios

O sistema gera automaticamente relatórios CSV das consultas utilizando Worker Threads.

## Benefícios

- Processamento assíncrono
- Não bloqueia o servidor principal
- Melhor desempenho

---

# 🎨 Interface

O sistema possui:

- Dashboard em tempo real
- Interface responsiva
- Atualização dinâmica dos dados
- Gerenciamento completo via navegador

---

# 🖥️ Monitoramento do Sistema

O dashboard apresenta informações relacionadas ao sistema operacional:

- Uso de memória RAM
- Informações do sistema operacional
- Estatísticas do servidor

---

# 📚 Objetivo Acadêmico

O projeto foi desenvolvido com foco acadêmico para demonstrar a aplicação prática de conceitos de Sistemas Operacionais em um sistema web completo.

---

# ✅ Considerações Finais

O Sistema de Agendamento Médico demonstra na prática a utilização de:

- Concorrência
- Threads
- Gerência de memória
- Sistema de arquivos
- Entrada e saída
- Processamento assíncrono
- Persistência de dados
- Interação com o sistema operacional

Tudo isso integrado em uma aplicação web funcional e organizada.

---

# 📄 Licença

Projeto desenvolvido para fins acadêmicos.
