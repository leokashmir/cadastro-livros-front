# Cadastro de Livros - Frontend

Sistema de cadastro e gerenciamento de livros desenvolvido em Angular com ng-zorro-antd (Ant Design).

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes](#componentes)
- [Serviços](#serviços)
- [Modelos de Dados](#modelos-de-dados)
- [API Backend](#api-backend)

## 🎯 Sobre o Projeto

Sistema web para gerenciamento de livros, autores e assuntos, com funcionalidades de CRUD completo e geração de relatórios. O sistema permite cadastrar livros com seus respectivos autores e assuntos, além de gerar relatórios filtrados em formato de grid ou PDF.

## 🚀 Tecnologias Utilizadas

- **Angular** - Framework principal
- **TypeScript** - Linguagem de programação
- **ng-zorro-antd** - Biblioteca de componentes UI (Ant Design)
- **RxJS** - Programação reativa
- **HttpClient** - Comunicação com API REST

## ✨ Funcionalidades

### Dashboard
- Página inicial com cards de navegação para:
  - Cadastro de Assuntos
  - Cadastro de Livros
  - Cadastro de Autores
  - Relatórios

### Cadastro de Assuntos
- ✅ Pesquisa por descrição
- ✅ Listagem com paginação (10 registros por página)
- ✅ Criação de novos assuntos
- ✅ Edição de assuntos existentes
- ✅ Exclusão com confirmação
- ✅ Validação: máximo 20 caracteres

### Cadastro de Autores
- ✅ Pesquisa por nome
- ✅ Listagem com paginação (10 registros por página)
- ✅ Criação de novos autores
- ✅ Edição de autores existentes
- ✅ Exclusão com confirmação
- ✅ Validação: máximo 40 caracteres

### Cadastro de Livros
- ✅ Pesquisa por título
- ✅ Listagem com paginação (10 registros por página)
- ✅ Criação de novos livros
- ✅ Edição de livros existentes
- ✅ Exclusão com confirmação
- ✅ Campos do formulário:
  - Título (máx. 40 caracteres)
  - Editora (máx. 40 caracteres)
  - Edição (número, mínimo 1)
  - Ano de Publicação (1000-9999)
  - Valor (moeda BRL com máscara R$)
  - Autores (seleção múltipla)
  - Assuntos (seleção múltipla)
- ✅ Validações:
  - Pelo menos 1 autor obrigatório
  - Pelo menos 1 assunto obrigatório

### Relatórios
- ✅ Filtros opcionais:
  - Título
  - Autor
  - Assunto
  - Valor Mínimo
  - Valor Máximo
- ✅ Duas opções de visualização:
  - Grid com paginação
  - Download em PDF

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd cadastro-livros-front
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Executando o Projeto

### Modo de Desenvolvimento

```bash
ng serve
```

Acesse `http://localhost:4200/` no navegador.

### Build para Produção

```bash
ng build --configuration production
```

Os arquivos de build serão gerados no diretório `dist/`.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Página inicial
│   │   ├── assunto/            # CRUD de Assuntos
│   │   ├── autor/              # CRUD de Autores
│   │   ├── livro/              # CRUD de Livros
│   │   └── relatorio/          # Relatórios
│   ├── services/
│   │   ├── assunto.ts          # Serviço de Assuntos
│   │   ├── autor.ts            # Serviço de Autores
│   │   ├── livro.ts            # Serviço de Livros
│   │   └── relatorio.ts        # Serviço de Relatórios
│   ├── model/
│   │   ├── assunto.model.ts    # Interface Assunto
│   │   ├── autor.model.ts      # Interface Autor
│   │   ├── livro.model.ts      # Interface Livro
│   │   └── report.model.ts     # Interface Report
│   ├── app.config.ts           # Configuração da aplicação
│   ├── app.routes.ts           # Rotas da aplicação
│   └── app.html                # Template principal
├── environments/
│   ├── environment.ts          # Configuração de desenvolvimento
│   └── environment.prod.ts     # Configuração de produção
└── styles.css                  # Estilos globais
```

## 🧩 Componentes

### Dashboard
- **Rota:** `/dashboard`
- **Descrição:** Página inicial com cards de navegação

### Assunto
- **Rota:** `/assunto`
- **Descrição:** Gerenciamento de assuntos de livros

### Autor
- **Rota:** `/autor`
- **Descrição:** Gerenciamento de autores

### Livro
- **Rota:** `/livro`
- **Descrição:** Gerenciamento de livros com relacionamentos

### Relatório
- **Rota:** `/relatorio`
- **Descrição:** Geração de relatórios com filtros

## 🔌 Serviços

### AssuntoService
```typescript
findAll(): Observable<Assunto[]>
findById(id: number): Observable<Assunto>
findByDescricao(descricao: string): Observable<Assunto[]>
create(assunto: Assunto): Observable<Assunto>
partialUpdate(id: number, assunto: Partial<Assunto>): Observable<Assunto>
delete(id: number): Observable<void>
```

### AutorService
```typescript
findAll(): Observable<Autor[]>
findById(id: number): Observable<Autor>
findByNome(nome: string): Observable<Autor[]>
create(autor: Autor): Observable<Autor>
partialUpdate(id: number, autor: Partial<Autor>): Observable<Autor>
delete(id: number): Observable<void>
```

### LivroService
```typescript
findAll(): Observable<Livro[]>
findById(id: number): Observable<Livro>
save(livro: Livro): Observable<Livro>
partialUpdate(id: number, livro: Partial<Livro>): Observable<Livro>
delete(id: number): Observable<void>
```

### RelatorioService
```typescript
getReport(): Observable<Report[]>
getReportByLivroId(livroId: number): Observable<Report>
getReportPdf(titulo?, autor?, assunto?, valorMin?, valorMax?): Observable<Blob>
downloadReportPdf(blob: Blob, filename: string): void
```

## 📊 Modelos de Dados

### Assunto
```typescript
interface Assunto {
  id: number;
  descricao: string;
}
```

### Autor
```typescript
interface Autor {
  id: number;
  nome: string;
}
```

### Livro
```typescript
interface Livro {
  id: number | null;
  titulo: string;
  edicao: number;
  valor: number;
  editora: string;
  anoPublicacao: number;
  autores: Autor[];
  assuntos: Assunto[];
}
```

### Report
```typescript
interface Report {
  livroId: number;
  titulo: string;
  autores: string;
  assuntos: string;
  valor: number;
}
```

## 🌐 API Backend

### URL Base
- **Desenvolvimento:** `http://localhost:8080/api`
- **Produção:** Configurar em `environment.prod.ts`

### Endpoints

#### Assuntos
- `GET /assuntos` - Lista todos os assuntos
- `GET /assuntos/{id}` - Busca assunto por ID
- `GET /assuntos/search?descricao={descricao}` - Busca por descrição
- `POST /assuntos` - Cria novo assunto
- `PATCH /assuntos/{id}` - Atualiza assunto
- `DELETE /assuntos/{id}` - Remove assunto

#### Autores
- `GET /autores` - Lista todos os autores
- `GET /autores/{id}` - Busca autor por ID
- `GET /autores/search?nome={nome}` - Busca por nome
- `POST /autores` - Cria novo autor
- `PATCH /autores/{id}` - Atualiza autor
- `DELETE /autores/{id}` - Remove autor

#### Livros
- `GET /livros` - Lista todos os livros
- `GET /livros/{id}` - Busca livro por ID
- `POST /livros` - Cria novo livro
- `PATCH /livros/{id}` - Atualiza livro
- `DELETE /livros/{id}` - Remove livro

#### Relatórios
- `GET /relatorios` - Lista todos os relatórios
- `GET /relatorios/{livroId}` - Busca relatório por ID do livro
- `GET /relatorios/pdf?titulo={titulo}&autor={autor}&assunto={assunto}&valorMin={valorMin}&valorMax={valorMax}` - Gera PDF com filtros

## 🎨 Padrões de UI

### Cores e Temas
- Utiliza o tema padrão do Ant Design
- Botões de ação primária: azul
- Botões de exclusão: vermelho (danger)
- Botões de cancelar: padrão (default)

### Ícones Utilizados
- `search` - Pesquisa
- `plus` - Adicionar
- `edit` - Editar
- `delete` - Excluir
- `clear` - Limpar
- `arrow-left` - Voltar
- `book` - Livros
- `user` - Autores
- `tags` - Assuntos
- `bar-chart` - Relatórios
- `download` - Download

### Paginação
- Padrão: 10 registros por página
- Opções: 10, 20, 30, 50 registros

## 🌍 Internacionalização

O sistema está configurado para **Português Brasileiro (pt-BR)**, incluindo:
- Mensagens do ng-zorro
- Formatação de datas
- Formatação de moeda (R$)
- Textos de confirmação

## 📝 Validações

### Assunto
- Descrição: obrigatória, máximo 20 caracteres

### Autor
- Nome: obrigatório, máximo 40 caracteres

### Livro
- Título: obrigatório, máximo 40 caracteres
- Editora: obrigatória, máximo 40 caracteres
- Edição: obrigatória, número inteiro, mínimo 1
- Ano de Publicação: obrigatório, entre 1000 e 9999
- Valor: obrigatório, número decimal positivo
- Autores: pelo menos 1 autor obrigatório
- Assuntos: pelo menos 1 assunto obrigatório

## 🐛 Tratamento de Erros

- Mensagens de erro exibidas via `NzMessageService`
- Logs de erro no console para debug
- Confirmações antes de exclusões
- Validações de formulário em tempo real

## 📄 Licença

Este projeto é de uso educacional/comercial.

## 👥 Autor

Desenvolvido como sistema de gerenciamento de biblioteca.

---

**Versão:** 1.0.0
**Última atualização:** 2024
