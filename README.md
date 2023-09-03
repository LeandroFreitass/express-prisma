## Minha API de Autenticação e Gerenciamento de Usuários

Esta é uma API construída com Express, Prisma e JWT para autenticação de usuários e gerenciamento de contas.

### Tecnologias Utilizadas
- Express.js
- Prisma
- JSON Web Tokens (JWT)

### Instruções de Uso
1. Clone este repositório.
2. Configure as variáveis de ambiente.
3. Instale as dependências com `npm install`.
4. Inicie o servidor com `npm start`.

### Exemplos de Solicitações
#### Registro de Usuário, Login e logout 
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "mypassword"
}

POST /auth/login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "mypassword"
}

POST /auth/logout
Content-Type: application/json


