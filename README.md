# 🔐 Authentication API

API REST de autenticação desenvolvida com Node.js e Fastify, com senhas criptografadas e autenticação via JWT.

## 🚀 Tecnologias

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![bcrypt](https://img.shields.io/badge/bcrypt-338?style=for-the-badge)

## 📋 Funcionalidades

- [x] Cadastro de usuário com senha criptografada (bcrypt)
- [x] Login com validação de senha
- [x] Geração de token JWT
- [x] Rota de perfil autenticada por token

## 📡 Rotas

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | /register | Cadastro de usuário | ❌ |
| POST | /login | Login e geração de token JWT | ❌ |
| GET | /usuarios | Lista todos os usuários | ❌ |
| GET | /perfil | Dados do perfil via token | ✅ |

## 🔧 Como rodar localmente

### Pré-requisitos
- Node.js v18+
- PostgreSQL

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/thaisjunges/authentication-api-node.git
cd authentication-api-node
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Preencha o `.env` com seus dados:
```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
```

**4. Rode o servidor**
```bash
node src/server.js
```

Servidor rodando em `http://localhost:3333`

## 🧪 Testando as rotas

Use o [Thunder Client](https://www.thunderclient.com/) ou [Insomnia](https://insomnia.rest/).

**Cadastro:**
```json
POST /register
{
  "nome": "Thais",
  "email": "thais@email.com",
  "senha": "123456"
}
```

**Login:**
```json
POST /login
{
  "email": "thais@email.com",
  "senha": "123456"
}
```

**Perfil autenticado:**
```
GET /perfil
Authorization: Bearer seu_token_aqui
```

## 👩‍💻 Autora

**Thais Ferreira Junges**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thais-ferreira-junges-78b74b50)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/thaisjunges)