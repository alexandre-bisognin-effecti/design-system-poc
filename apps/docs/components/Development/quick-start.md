# Quick Start

Guia rápido para começar a usar os componentes do Design System em poucos minutos.

## Instalação

Escolha o pacote de acordo com sua versão do Vue:

::: code-group
```bash [Vue 3]
npm install @my-org/ui-vue3

npm install @my-org/ui-vue2
```
:::

## Configuração

1. Importar os estilos
No arquivo principal da sua aplicação (main.ts ou main.js):

::: code-group
```bash [Vue 3]
import '@my-org/ui-vue3/dist/style.css'
```
:::

2. Usar os componentes
Você pode importar componentes de duas formas:

Importação individual (Recomendado)

::: code-group
```bash [Vue 3]
<script setup>
import { MeButton } from '@my-org/ui-vue3'
</script>

<template>
  <MeButton variant="primary">Meu Botão</MeButton>
</template>
```
:::