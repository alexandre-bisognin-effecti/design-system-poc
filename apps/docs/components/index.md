# Biblioteca de Componentes

Uma coleção completa de componentes Vue reutilizáveis, acessíveis e customizáveis para construir interfaces consistentes.

## Componentes Disponíveis

### Básicos

Componentes fundamentais para construir interfaces.

- **[Button](./button)** - Botões para ações e navegação
- **Input** - Campos de entrada de texto
- **Checkbox** - Caixas de seleção
- **Radio** - Botões de opção
- **Select** - Seleção de opções

### Feedback

Componentes para fornecer feedback ao usuário.

- **Alert** - Mensagens de alerta e notificações
- **Toast** - Notificações temporárias
- **Modal** - Diálogos e janelas modais
- **Loading** - Indicadores de carregamento

### Navegação

Componentes para navegação e estrutura.

- **Menu** - Menus de navegação
- **Tabs** - Abas de conteúdo
- **Breadcrumb** - Navegação hierárquica
- **Pagination** - Paginação de conteúdo

### Display

Componentes para exibição de dados.

- **Card** - Cartões de conteúdo
- **Table** - Tabelas de dados
- **List** - Listas de itens
- **Badge** - Distintivos e contadores

## Como usar

Cada componente possui documentação detalhada com:

- ✅ Exemplos interativos
- ✅ Lista completa de props
- ✅ Eventos disponíveis
- ✅ Slots customizáveis
- ✅ Guias de acessibilidade
- ✅ Casos de uso avançados

## Instalação

Para começar a usar os componentes, instale o pacote correspondente à sua versão do Vue:

::: code-group
```bash [Vue 3]
npm install @my-org/ui-vue3

npm install @my-org/ui-vue2
```
:::

## Importação
::: code-group
```bash [Vue 3]
<script setup>
import { MeButton } from '@my-org/ui-vue3'
</script>

<template>
  <MeButton>Meu Botão</MeButton>
</template>
```
:::