# 💰 Expense Tracker

Aplicação web para controle de despesas pessoais com autenticação de usuários, persistência em banco de dados e agregações dinâmicas.

---

## 🚀 Tecnologias Utilizadas

- React
- Vite
- Supabase (Auth + PostgreSQL)
- React Router
- CSS puro

---

## 🔐 Funcionalidades

- Autenticação com email e senha (Supabase Auth)
- Isolamento de dados por usuário utilizando Row Level Security (RLS)
- Cadastro de despesas
- Listagem ordenada por data
- Exclusão de despesas
- Filtro por categoria
- Cálculo de total geral
- Cálculo de subtotal por categoria filtrada
- Estados de loading e feedback visual

---

## 🗄️ Estrutura do Banco de Dados

Tabela `expenses`:

| Campo        | Tipo       |
|--------------|------------|
| id           | uuid       |
| description  | text       |
| amount       | numeric    |
| category     | text       |
| date         | date       |
| user_id      | uuid       |
| created_at   | timestamp  |

### 🔒 Segurança

RLS ativado com a seguinte policy:

```sql
create policy "Users can manage their expenses"
on expenses
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

Garantindo que cada usuário acesse apenas suas próprias despesas.

---


## 🧠 Decisões Técnicas

- Separação entre páginas, componentes e serviços para melhor organização.
- Supabase utilizado para simplificar backend e autenticação.
- Aplicação de Row Level Security (RLS) para garantir segurança por usuário.
- Cálculos de total e subtotal realizados no frontend via `Array.reduce`.
- Filtro de categorias gerado dinamicamente a partir dos dados cadastrados.

---

## 📁 Estrutura do Projeto

```
src/
 ├ pages/
 │   ├ Login.jsx
 │   └ Dashboard.jsx
 ├ components/
 │   ├ ExpenseForm.jsx
 │   ├ ExpenseList.jsx
 │   └ ExpenseItem.jsx
 ├ services/
 │   └ supabaseClient.js
 ├ App.jsx
 ├ main.jsx
 └ styles.css
```

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido para demonstrar:

- Integração com Supabase
- Implementação de autenticação
- Aplicação de Row Level Security
- Estruturação adequada de aplicação React
- Utilização de Git com commits semânticos