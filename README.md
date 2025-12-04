# IFRS Voluntariado API

API RESTful para gerenciar **voluntários** e **eventos sociais** do
IFRS, construída com **Node.js, TypeScript, Express e MySQL**,
utilizando modernas ferramentas como **Prisma ORM**, **Zod**, **JWT**,
**Winston**, **Jest**, e **Selenium** para testes E2E.

------------------------------------------------------------------------

## 🛠 Tecnologias Utilizadas

### **Backend**

-   Node.js + TypeScript\
-   Express\
-   Prisma ORM\
-   MySQL\
-   Zod (validação de dados)\
-   bcryptjs (hash de senhas)\
-   JSON Web Token (autenticação)\
-   Winston (logs estruturados + arquivos)\
-   Dotenv (configurações de ambiente)

### **Testes**

-   Jest (unitários)\
-   ts-jest\
-   Selenium (E2E automatizado)

### **Outros**

-   Swagger (documentação de API)\
-   ESLint + Prettier\
-   Nodemon (dev)

------------------------------------------------------------------------

## ⚙️ Instalação

1.  Clone o repositório:

``` bash
git clone https://github.com/mazuttidev/api-ifrs-volunteer.git
cd ifrs-voluntariado-api
```

2.  Instale as dependências:

``` bash
npm install
```

3.  Configure o banco de dados MySQL no arquivo `.env`.

4.  Execute as migrações:

``` bash
npx prisma migrate dev
```

5.  Inicie o servidor:

``` bash
npm run dev
```

------------------------------------------------------------------------

## 🔐 Autenticação

### **Endpoints**

-   `POST /auth/register` --- Cria um usuário e retorna JWT
-   `POST /auth/login` --- Login e geração de token JWT

O token deve ser enviado via header:

    Authorization: Bearer SEU_TOKEN

------------------------------------------------------------------------

## 📋 Endpoints Principais

### **Usuários**

  Método   Endpoint       Descrição
  -------- -------------- -----------------------
  POST     `/users`       Criar usuário
  GET      `/users`       Listar todos usuários
  GET      `/users/:id`   Buscar usuário por ID
  PUT      `/users/:id`   Atualizar usuário
  DELETE   `/users/:id`   Remover usuário

### **Eventos**

  Método   Endpoint        Descrição
  -------- --------------- ------------------
  POST     `/events`       Criar evento
  GET      `/events`       Listar eventos
  GET      `/events/:id`   Buscar evento
  PUT      `/events/:id`   Atualizar evento
  DELETE   `/events/:id`   Remover evento

### **Participantes de Evento**

  ---------------------------------------------------------------------------------
  Método   Endpoint                                   Descrição
  -------- ------------------------------------------ -----------------------------
  POST     `/event-participants`                      Registrar usuário em evento

  GET      `/event-participants/:event_id`            Listar participantes por
                                                      evento

  DELETE   `/event-participants/:event_id/:user_id`   Remover participante
  ---------------------------------------------------------------------------------

------------------------------------------------------------------------

## 🛡️ Validação de Dados

A API usa **Zod** para validar: - `birth_date` - `start_at`, `end_at` -
CPF\
- enums de `role`, `gender`, `blood_type`\
- schemas de criação e atualização de usuário e evento

O sistema também inclui validação automática de CPF e conversão
(normalização) do tipo sanguíneo para o enum do Prisma.

------------------------------------------------------------------------

## 🧪 Testes

### **Unitários (Jest)**

Testes implementados: - Auth Service\
- User Service\
- Event Service

Executar:

``` bash
npm run test
```

### **E2E (Selenium)**

Testes incluem cenários: - Login com sucesso - Login com erro -
Verificação de redirecionamento

Executar:

``` bash
npm run test:e2e
```

------------------------------------------------------------------------

## 📝 Logs Estruturados (Winston)

A API registra logs em:

    /logs/combined.log
    /logs/error.log

Formatos: - JSON estruturado\
- Timestamps\
- Labels (service/module)

------------------------------------------------------------------------

## 🌐 Documentação via Swagger

A documentação está disponível em:

    GET /docs

------------------------------------------------------------------------

## 📌 Banco de Dados

Você pode visualizar o diagrama completo aqui:

👉
https://dbdocs.io/victor.mazuttidev/api-ifrs-volunteer?view=relationships

------------------------------------------------------------------------

## 📦 Scripts importantes

``` bash
npm run dev        # Inicia servidor
npm run test       # Testes unitários
npm run test:e2e   # Testes end-to-end com Selenium
npm run build      # Compila TypeScript
```

