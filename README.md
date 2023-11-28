# Teddy Digital BackEnd Challenge

API que encurte as URLs.

Antes de utilizar a aplicação, certifique-se de ter os seguintes recursos instalados:

- Docker
- Docker Compose
- NodeJS
- TypeScript

### Endpoints

>Para cadastrar um usuário

```http
POST /signup HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

### Parâmetros

```json
{
  "name": "John",
  "email" : "john@mail.com",
  "password": "pass"
}
```
---
>Para autenticar um usuário

```http
POST /signin HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

### Parâmetros

```json
{
  "email" : "john@mail.com",
  "password": "pass"
}
```

### Retorno

```json
{
  "token" : "eyJhbGciOiJIUzI1NiJ9eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTIwMzAzOSwiaWF0IjoxNzAxMjAzMDM5fQ.z1ydLdRoH4xGAryrGusKwSYTOkZL25u7gkNQBcD2k8Y"
}
```
---
>Para encurtar uma URL

```http
POST /url/stats/<urlID> HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

### Parâmetros

```json
{
  "originUrl" : "https://example.com",
  "ownerId": "pass" | null
}
```

### Retorno

```json
{
  "urlId" : "NfgXc",
  "originUrl": "https://example.com"
}
```
---

>Para listar todas as URLs encurtadas de um usuário

```http
GET /urls HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

### Parâmetros

**Authorization**
>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwMTIwNDQ5OCwiZXhwIjoxNzAxMjA4MDk4fQ.2Kg5vwHXS2mcElZ7-YbA8ZJOfpYMi_Xh8ug0aQJjja0

```json
{
  "ownerId" : "156abb82-48a6-470e-b05b-8a5e9fa43f88"
}
```

### Retorno

```json
{
  "urls": [
    {
      "urlId" : "NfgXc",
      "originUrl": "https://example.com"
    }
  ]
}
```
---

>Para listar informações de uma URL
```http
GET /url/stats/<urlId> HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

### Parâmetros

```json
{
  "urlId" : "NfgXc"
}
```

### Retorno

```json
{
  "urlId" : "NfgXc",
  "originUrl":
}
```
---
>Para apagar uma URL
```http
DELETE /url/<urlId> HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

### Parâmetros

**Authorization**
>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwMTIwNDQ5OCwiZXhwIjoxNzAxMjA4MDk4fQ.2Kg5vwHXS2mcElZ7-YbA8ZJOfpYMi_Xh8ug0aQJjja0

```json
{
  "urlId" : "NfgXc",
}
```
---
---
>Para acessar uma url encurtada
```http
GET /url/redirect/<urlId> HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

### Parâmetros

```json
{
  "urlId" : "NfgXc", 
}
```

### Executando o projeto

Para subir o projeto via docker compose, certifique-se de preencher as variáveis nos arquivos **.env** e **.env.database**.

Após, execute na raiz do projeto:

```base
 docker compose up --build
```

ou com Make

```
make run-app
``````

### Executando os testes

Na raiz do projeto, execute:

```
npm run test
``````

----
## Sugestões de Possíveis melhorias

- Adicionar Cache na pesquisa de URLs
- Para escala horizontal, trabalhar na distribuição de carga entre instâncias da aplicação
- Implementar observabilidade no comportamento da aplicação
- Criar testes de integração e de ponta a ponta (E2E)
- Planejar testes de stress para ver o limite da aplicação e possíveis gargalos
