# IFRS Voluntariado API

API RESTful para gerenciar **voluntários** e **eventos sociais** do IFRS, construída com **Node.js, TypeScript, Express e MySQL**, utilizando **Zod** para validação de dados e **JWT** para autenticação.

---

## 🛠 Tecnologias Utilizadas

- Node.js + TypeScript  
- Express  
- MySQL (com `mysql2/promise`)  
- Zod (validação de schemas)  
- bcryptjs (hash de senhas)  
- JSON Web Token (autenticação)  
- Postman para testes de API  

---

## ⚙️ Instalação

1. Clone o repositório:  

```bash
git clone https://github.com/seu-usuario/ifrs-voluntariado-api.git
cd ifrs-voluntariado-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados MySQL no arquivo .env.

4. Crie as tabelas usando o SQL fornecido no diretório schema e acompanhe a documentação [aqui](https://dbdocs.io/victor.mazuttidev/api-ifrs-volunteer?view=relationships)

5. Rode o projeto

```bash
npm run dev
```

## 🔑 Autenticação

Login: /auth/login → Retorna um JWT

Register (usuário): /auth/register

## 📋 Endpoints Principais (Disponível via swagger)

| Método | Endpoint          | Descrição                |
| ------ | ----------------- | ------------------------ |
| POST   | `/auth/register`  | Registrar usuário        |
| POST   | `/auth/login`     | Login de usuário         |
| POST   | `/users`          | Cria usuário             |
| GET    | `/users`          | Listar todos os usuários |
| GET    | `/users/:id`      | Buscar usuário por ID    |
| PUT    | `/users/:id`      | Atualizar usuário        |
| DELETE | `/users/:id`      | Remover usuário          |

| Método | Endpoint      | Descrição               |
| ------ | ------------- | ----------------------- |
| POST   | `/events`     | Criar evento            |
| GET    | `/events`     | Listar todos os eventos |
| GET    | `/events/:id` | Buscar evento por ID    |
| PUT    | `/events/:id` | Atualizar evento        |
| DELETE | `/events/:id` | Remover evento          |

| Método | Endpoint                                 | Descrição                                             |
| ------ | ---------------------------------------- | ----------------------------------------------------- |
| POST   | `/event-participants`                    | Registrar um usuário em um evento                     |
| GET    | `/event-participants/:event_id`          | Listar todos os participantes de um evento específico |
| DELETE | `/event-participants/:event_id/:user_id` | Remover um participante de um evento                  |


## 🛡 Validação de Dados

Utilizamos Zod para validar dados de entrada nos endpoints.

Exemplo: registerParticipantSchema valida event_id, user_id e role_in_event.

Para birth_date, start_at e end_at, a validação garante que o formato ISO ou Date seja aceito antes de salvar no banco.
