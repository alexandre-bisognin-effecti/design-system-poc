# Design System - Effecti

Base unificada de design, código e padrões para construir interfaces consistentes e escaláveis.

## 🎯 Visão Geral

Este é um Design System que oferece componentes Vue reutilizáveis e tokens de design padronizados.

## 🏗️ Estrutura do Projeto

Este é um monorepo gerenciado com **npm workspaces**, organizado da seguinte forma:

design-system-poc/
├── packages/
│ ├── ui-vue2/ # Biblioteca de componentes para Vue 2
│ └── ui-vue3/ # Biblioteca de componentes para Vue 3
└── apps/
└── docs/ # Documentação interativa (V


## 📦 Pacotes

### @me/ui-vue3
Biblioteca de componentes compatível com **Vue 3.x**
- ✨ Componentes prontos para uso
- 🎨 Tokens de design consistentes
- 📦 Distribuído em ESM e UMD
- 💅 Estilos CSS exportados separadamente

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm 8+

### Instalação

Clone o repositório e instale as dependências:

    git clone <repository-url>
    npm install

### Desenvolvimento

Inicia a documentação em modo de desenvolvimento:

    npm run dev:docs

Inicia todos os workspaces em modo de desenvolvimento:

    npm run dev

Build de todos os pacotes:

    npm run build

## 📚 Documentação

A documentação interativa está disponível no diretório `apps/docs` e é construída com VitePress.

Para acessar a documentação localmente:

    npm run dev:docs

## 🎨 Características

- **🎨 Design Consistente**: Tokens de design unificados garantem consistência visual em toda a aplicação
- **⚡ Vue 3**: Bibliotecas separadas para máxima de componentes
- **🔧 Developer Experience**: Documentação viva e exemplos interativos
- **📐 Padrões e Boas Práticas**: Diretrizes claras de uso e composição

## 🔧 Uso

### Instalando em seu projeto Vue 3

    npm install @me/ui-vue3

Exemplo de uso:

    import { MeButton } from '@me/ui-vue3'
    import '@me/ui-vue3/dist/style.css'

## 🛠️ Scripts Disponíveis

- `npm run dev:docs` - Inicia o servidor de documentação