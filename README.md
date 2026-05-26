stema web completo de agendamento de consultas médicas desenvolvido com Node.js, Express e JavaScript, aplicando conceitos fundamentais de Sistemas Operacionais.

# Sistema de Agendamento Médico

Sistema web completo de agendamento de consultas médicas desenvolvido com Node.js, Express e JavaScript, aplicando conceitos fundamentais de Sistemas Operacionais.

---

## Integrantes

- João Pedro

## Tecnologias Utilizadas

- Node.js
- Express
- HTML5
- CSS3
- JavaScript
- JSON para persistência de dados

---

## Funcionalidades

### Pacientes

- Cadastrar paciente
- Listar pacientes
- Editar paciente
- Remover paciente

### Médicos

- Cadastrar médico
- Listar médicos
- Editar médico
- Remover médico

### Consultas

- Agendar consulta
- Editar consulta
- Cancelar consulta
- Verificação de conflito de horário
- Apenas pacientes e médicos cadastrados podem ser utilizados

### Dashboard

- Quantidade de pacientes
- Quantidade de médicos
- Quantidade de consultas
- Consultas agendadas
- Consultas canceladas
- Informações do sistema operacional
- Monitoramento de memória RAM

---

## Conceitos de Sistemas Operacionais Aplicados

### Concorrência

O sistema utiliza mecanismos de lock para evitar conflitos durante agendamentos simultâneos.

### Threads

Worker Threads são utilizadas para geração de relatórios CSV em segundo plano sem bloquear o servidor principal.

### Sistema de Arquivos

Manipulação de arquivos JSON para persistência de dados, logs e backups automáticos.

### Gerência de Memória

Uso de cache em memória para otimização das leituras de consultas.

### Entrada e Saída (I/O)

Leitura e escrita de arquivos utilizando o módulo `fs` do Node.js.

### Chamadas de Sistema

Uso dos módulos `os`, `path` e `fs` para interação com o sistema operacional.

---

## Estrutura do Projeto

```txt
sistema-agendamento/
├── backend/
├── data/
│   ├── backups/
│   ├── logs/
│   ├── relatorios/
│   ├── pacientes.json
│   ├── medicos.json
│   └── consultas.json
├── public/
├── package.json
```

---

## Como Executar

### Instalar dependências

```bash
npm install
```

### Iniciar servidor

```bash
npm start
```

### Acessar sistema

```txt
http://localhost:3000
```

---

## Requisitos

- Node.js 18+
- Navegador Google Chrome ou Microsoft Edge

---

## Funcionalidades de Segurança e Integridade

- Controle de conflitos de consultas
- Verificação de pacientes e médicos cadastrados
- Logs de operações
- Backups automáticos
- Controle concorrente de agendamentos

---

## Relatórios

O sistema gera automaticamente relatórios CSV das consultas utilizando processamento em Worker Threads.

---

## Logs

O sistema registra:

- operações de cadastro
- exclusões
- atualizações
- conflitos
- erros
- geração de relatórios

---

## Backups

Backups automáticos dos arquivos JSON são gerados após alterações nos dados do sistema.

---

## Interface

O sistema possui:

- dashboard em tempo real
- interface responsiva
- gerenciamento completo via navegador
- atualização dinâmica dos dados

---

## Considerações Finais

O projeto demonstra de forma prática a aplicação de conceitos de Sistemas Operacionais em um sistema web completo, integrando concorrência, threads, gerenciamento de memória, sistema de arquivos e interação com o sistema operacional.

---

## Integrantes

- João Pedro

---

## Tecnologias Utilizadas

- Node.js
- Express
- HTML5
- CSS3
- JavaScript
- JSON para persistência de dados

---

## Funcionalidades

### Pacientes

- Cadastrar paciente
- Listar pacientes
- Editar paciente
- Remover paciente

### Médicos

- Cadastrar médico
- Listar médicos
- Editar médico
- Remover médico

### Consultas

- Agendar consulta
- Editar consulta
- Cancelar consulta
- Verificação de conflito de horário
- Apenas pacientes e médicos cadastrados podem ser utilizados

### Dashboard

- Quantidade de pacientes
- Quantidade de médicos
- Quantidade de consultas
- Consultas agendadas
- Consultas canceladas
- Informações do sistema operacional
- Monitoramento de memória RAM

---

## Conceitos de Sistemas Operacionais Aplicados

### Concorrência

O sistema utiliza mecanismos de lock para evitar conflitos durante agendamentos simultâneos.

### Threads

Worker Threads são utilizadas para geração de relatórios CSV em segundo plano sem bloquear o servidor principal.

### Sistema de Arquivos

Manipulação de arquivos JSON para persistência de dados, logs e backups automáticos.

### Gerência de Memória

Uso de cache em memória para otimização das leituras de consultas.

### Entrada e Saída (I/O)

Leitura e escrita de arquivos utilizando o módulo `fs` do Node.js.

### Chamadas de Sistema

Uso dos módulos `os`, `path` e `fs` para interação com o sistema operacional.

---

## Estrutura do Projeto

```txt
sistema-agendamento/
├── backend/
├── data/
│   ├── backups/
│   ├── logs/
│   ├── relatorios/
│   ├── pacientes.json
│   ├── medicos.json
│   └── consultas.json
├── public/
├── package.json
```

---

## Como Executar

### Instalar dependências

```bash
npm install
```

### Iniciar servidor

```bash
npm start
```

### Acessar sistema

```txt
http://localhost:3000
```

---

## Requisitos

- Node.js 18+
- Navegador Google Chrome ou Microsoft Edge

---

## Funcionalidades de Segurança e Integridade

- Controle de conflitos de consultas
- Verificação de pacientes e médicos cadastrados
- Logs de operações
- Backups automáticos
- Controle concorrente de agendamentos

---

## Relatórios

O sistema gera automaticamente relatórios CSV das consultas utilizando processamento em Worker Threads.

---

## Logs

O sistema registra:

- operações de cadastro
- exclusões
- atualizações
- conflitos
- erros
- geração de relatórios

---

## Backups

Backups automáticos dos arquivos JSON são gerados após alterações nos dados do sistema.

---

## Interface

O sistema possui:

- dashboard em tempo real
- interface responsiva
- gerenciamento completo via navegador
- atualização dinâmica dos dados

---

## Considerações Finais

O projeto demonstra de forma prática a aplicação de conceitos de Sistemas Operacionais em um sistema web completo, integrando concorrência, threads, gerenciamento de memória, sistema de arquivos e interação com o sistema operacional.co.nome} - ${medico.especialidade} </option>`;
