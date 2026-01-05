# 🔲 Button

Componente de botão altamente customizável para ações e navegação.

<!-- ## Playground

<ClientOnly>
  <ButtonPlayground />
</ClientOnly> -->

## Demo
<div class="demo">
  <MeButton>Click me</MeButton>
</div>

## Importação

::: code-group
```vue [Vue 3]
<script setup>
import { MeButton } from '@your-org/ui-vue3'
</script>
```

```vue [Vue 2]
<script>
import { MeButton } from '@your-org/ui-vue2'

export default {
  components: { MeButton }
}
</script>
```
:::

## Uso Básico

Use o componente `MeButton` para renderizar um botão clicável:

```vue
<template>
  <MeButton>Click me</MeButton>
</template>
```

## Variantes

O botão possui diferentes variantes visuais para diferentes contextos:

### Primary

Usado para ações principais e mais importantes.

```vue
<MeButton variant="primary">
  Primary Button
</MeButton>
```

### Secondary

Para ações secundárias ou menos enfatizadas.

```vue
<MeButton variant="secondary">
  Secondary Button
</MeButton>
```

### Outline

Versão com borda, útil para ações terciárias.

```vue
<MeButton variant="outline">
  Outline Button
</MeButton>
```

### Danger

Para ações destrutivas ou perigosas.

```vue
<MeButton variant="danger">
  Delete
</MeButton>
```

::: warning Atenção
Use a variante `danger` apenas para ações irreversíveis ou destrutivas.
:::

## Tamanhos

Três tamanhos disponíveis para diferentes contextos:

```vue
<MeButton size="small">Small</MeButton>
<MeButton size="medium">Medium</MeButton>
<MeButton size="large">Large</MeButton>
```

## Estados

### Disabled

Desabilita a interação com o botão:

```vue
<MeButton disabled>
  Disabled Button
</MeButton>
```

### Loading

Mostra um indicador de carregamento:

```vue
<template>
  <MeButton :loading="isLoading" @click="handleSubmit">
    Submit
  </MeButton>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  await someAsyncOperation()
  isLoading.value = false
}
</script>
```

## Block

Botão ocupando toda a largura do container:

```vue
<MeButton block>
  Full Width Button
</MeButton>
```

## Com Ícones

Adicione ícones através do slot `icon`:

```vue
<template>
  <MeButton>
    <template #icon>
      <IconSearch />
    </template>
    Search
  </MeButton>
</template>
```

Ou apenas ícone:

```vue
<MeButton>
  <IconPlus />
</MeButton>
```

## API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'danger'` | `'primary'` | Variante visual do botão |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamanho do botão |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `loading` | `boolean` | `false` | Mostra estado de carregamento |
| `block` | `boolean` | `false` | Faz o botão ocupar toda a largura |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML do botão |
| `href` | `string` | - | Se fornecido, renderiza como link `<a>` |
| `target` | `string` | - | Target do link (quando `href` é usado) |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `click` | `MouseEvent` | Emitido quando o botão é clicado (não emite se `disabled` ou `loading`) |
| `focus` | `FocusEvent` | Emitido quando o botão recebe foco |
| `blur` | `FocusEvent` | Emitido quando o botão perde o foco |

### Slots

| Nome | Descrição |
|------|-----------|
| `default` | Conteúdo principal do botão |
| `icon` | Slot para ícone (posicionado à esquerda do texto) |
| `loading` | Slot customizado para o indicador de loading |

## Acessibilidade

O componente `MeButton` segue as melhores práticas de acessibilidade:

- ✅ Suporta navegação por teclado (Tab, Enter, Space)
- ✅ Estados `:focus-visible` para indicação visual
- ✅ Atributo `aria-disabled` quando desabilitado
- ✅ Atributo `aria-busy` quando em loading
- ✅ Contraste adequado para WCAG 2.1 AA

::: tip Dica
Use sempre um texto descritivo no botão. Evite textos genéricos como "Clique aqui".
:::

## Exemplos Avançados

### Formulário de Login

```vue
<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Senha" />
    
    <MeButton 
      type="submit" 
      :loading="isLoading"
      block
    >
      Entrar
    </MeButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { MeButton } from '@your-org/ui-vue3'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  try {
    await login(email.value, password.value)
  } finally {
    isLoading.value = false
  }
}
</script>
```

### Grupo de Ações

```vue
<template>
  <div class="button-group">
    <MeButton variant="outline" @click="handleCancel">
      Cancelar
    </MeButton>
    <MeButton variant="primary" @click="handleSave">
      <template #icon>
        <IconCheck />
      </template>
      Salvar
    </MeButton>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
```

### Botão como Link

```vue
<MeButton 
  href="https://example.com" 
  target="_blank"
  variant="outline"
>
  Saiba Mais
  <template #icon>
    <IconExternalLink />
  </template>
</MeButton>
```

## Customização

Você pode customizar as cores e estilos usando CSS variables:

```css
:root {
  --button-primary-bg: #007bff;
  --button-primary-color: #ffffff;
  --button-border-radius: 8px;
  --button-font-weight: 600;
}
```

## Componentes Relacionados

- [ButtonGroup](/components/button-group) - Agrupe múltiplos botões
- [IconButton](/components/icon-button) - Botão somente com ícone
- [Link](/components/link) - Links estilizados