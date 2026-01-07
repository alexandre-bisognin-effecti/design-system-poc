# Criar/Refatorar Componente

Argumento: $ARGUMENTS (nome do componente em PascalCase, ex: MeInput, MeModal, MeCard)

## Objetivo

Criar ou refatorar um componente Vue 3 seguindo os padrões do design system @me/ui-vue3.

## Estrutura de Arquivos

Cada componente deve estar em:
```
packages/ui-vue3/src/components/{nome-kebab-case}/
├── {NomeComponente}.vue      # Single File Component
├── {NomeComponente}.spec.ts  # Testes Vitest
└── {NomeComponente}.scss     # Estilos SCSS (opcional, para estilos complexos)
```

## Padrão do Componente Vue (SFC com Composition API)

```vue
<script setup lang="ts">
/**
 * @component {NomeComponente}
 * @description Breve descrição do componente
 */

// Imports
import { computed, ref, type PropType } from 'vue'

// Types
export interface {NomeComponente}Props {
  // Definir interface das props
}

// Props com valores default
const props = withDefaults(defineProps<{NomeComponente}Props>(), {
  // defaults aqui
})

// Emits tipados
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: string): void
}>()

// Estado interno (quando necessário)
const internalState = ref<string>('')

// Computed properties
const computedClasses = computed(() => ({
  'classe-base': true,
  [`classe-${props.variant}`]: !!props.variant,
}))

// Methods
function handleClick(event: MouseEvent) {
  emit('click', event)
}

// Expose (quando necessário expor métodos/refs para o pai)
defineExpose({
  // métodos públicos aqui
})
</script>

<template>
  <div :class="computedClasses">
    <!-- Template aqui -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/imports/tokens' as *;

.classe-base {
  // Estilos usando design tokens
}
</style>
```

## Regras Obrigatórias

### 1. Props Tipadas
- SEMPRE usar `defineProps<Interface>()` com interface TypeScript
- Usar `withDefaults()` para valores default
- Documentar props complexas com JSDoc

```typescript
export interface MeInputProps {
  /** Valor do input (v-model) */
  modelValue?: string
  /** Variante visual do componente */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Tamanho do componente */
  size?: 'sm' | 'md' | 'lg'
  /** Estado desabilitado */
  disabled?: boolean
  /** Placeholder do input */
  placeholder?: string
}
```

### 2. Emits Tipados
- SEMPRE usar `defineEmits<>()` com tipos explícitos
- Seguir convenção `update:modelValue` para v-model

```typescript
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()
```

### 3. Design Tokens

#### SCSS - Importar tokens no style:
```scss
@use '../../assets/scss/imports/tokens' as *;
```

Tokens disponíveis:
- **Cores**: `$blue-primary`, `$neutral-dark`, `$red-primary`, etc.
- **Espaçamentos**: `$tiny` (4px), `$mini` (8px), `$xxs` (16px), `$xs` (24px), `$sm` (32px), etc.
- **Texto**: `$text-sm` (12px), `$text-base` (14px), `$text-md` (16px), etc.
- **Border**: `$border-radius-base` (4px), `$border-radius-md` (8px), etc.
- **Mixins**: `@include transition-effect`, `@include drop-shadow-soft`, etc.

#### CSS Variables (para uso em estilos dinâmicos ou Tailwind):
```css
var(--blue-primary)
var(--neutral-dark)
var(--text-primary)
```

### 4. Acessibilidade (a11y)
- Usar elementos semânticos (`<button>`, `<input>`, `<label>`)
- Incluir `aria-*` attributes quando necessário
- Suportar navegação por teclado
- Manter contraste adequado

### 5. Slots
- Usar slots nomeados para flexibilidade
- Documentar slots disponíveis
- Fornecer slot default quando fizer sentido

```vue
<template>
  <div class="me-card">
    <header v-if="$slots.header" class="me-card__header">
      <slot name="header" />
    </header>
    <div class="me-card__body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="me-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
```

### 6. Nomenclatura CSS (BEM)
- Bloco: `.me-{componente}`
- Elemento: `.me-{componente}__{elemento}`
- Modificador: `.me-{componente}--{modificador}`

```scss
.me-button {
  // bloco base

  &__icon {
    // elemento
  }

  &__label {
    // elemento
  }

  &--primary {
    // modificador
  }

  &--disabled {
    // modificador
  }
}
```

## Padrão de Testes (Vitest)

```typescript
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import {NomeComponente} from './{NomeComponente}.vue'

describe('{NomeComponente}', () => {
  describe('Renderização', () => {
    it('deve renderizar corretamente', () => {
      const wrapper = mount({NomeComponente})
      expect(wrapper.exists()).toBe(true)
    })

    it('deve renderizar com props padrão', () => {
      const wrapper = mount({NomeComponente})
      // assertions para estado default
    })

    it('deve renderizar slot default', () => {
      const wrapper = mount({NomeComponente}, {
        slots: { default: 'Conteúdo' }
      })
      expect(wrapper.text()).toContain('Conteúdo')
    })
  })

  describe('Props', () => {
    it('deve aplicar variante corretamente', () => {
      const wrapper = mount({NomeComponente}, {
        props: { variant: 'primary' }
      })
      expect(wrapper.classes()).toContain('me-{componente}--primary')
    })

    it('deve respeitar estado disabled', () => {
      const wrapper = mount({NomeComponente}, {
        props: { disabled: true }
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })
  })

  describe('Eventos', () => {
    it('deve emitir click ao clicar', async () => {
      const wrapper = mount({NomeComponente})
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('deve emitir update:modelValue', async () => {
      const wrapper = mount({NomeComponente}, {
        props: { modelValue: '' }
      })
      // simular input
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter role apropriado', () => {
      const wrapper = mount({NomeComponente})
      // verificar aria attributes
    })
  })
})
```

## Checklist de Criação

Ao criar um novo componente:

1. [ ] Criar pasta `packages/ui-vue3/src/components/{nome-kebab-case}/`
2. [ ] Criar `{NomeComponente}.vue` seguindo o padrão SFC
3. [ ] Criar `{NomeComponente}.spec.ts` com testes
4. [ ] Adicionar export em `packages/ui-vue3/src/index.ts`:
   ```typescript
   import {NomeComponente} from './components/{nome-kebab-case}/{NomeComponente}.vue'
   export { {NomeComponente} }
   ```
5. [ ] Criar enum em `packages/ui-vue3/src/utils/enums/Enums.ts` se houver variantes:
   ```typescript
   export enum {NomeComponente}Variant {
     PRIMARY = 'primary',
     SECONDARY = 'secondary',
   }
   ```
6. [ ] Rodar testes: `cd packages/ui-vue3 && npm run test`

## Checklist de Refatoração

Ao refatorar um componente existente:

1. [ ] Migrar de Options API para Composition API com `<script setup>`
2. [ ] Converter props para interface TypeScript com `defineProps<>`
3. [ ] Tipar emits com `defineEmits<>`
4. [ ] Atualizar imports de SCSS para `@use`
5. [ ] Aplicar nomenclatura BEM nos estilos
6. [ ] Garantir que testes existentes continuem passando
7. [ ] Adicionar testes faltantes

## Melhores Práticas de Bibliotecas de Componentes

1. **Composables reutilizáveis**: Extrair lógica comum em composables
   ```typescript
   // composables/useFormField.ts
   export function useFormField(props: FormFieldProps) {
     const hasError = computed(() => !!props.error)
     // ...
   }
   ```

2. **Prop forwarding**: Usar `v-bind="$attrs"` para passar attrs ao elemento raiz

3. **CSS Logical Properties**: Preferir `margin-inline`, `padding-block` para i18n

4. **Transições**: Usar `<Transition>` para animações suaves

5. **Teleport**: Usar para modais e dropdowns que precisam escapar do contexto

6. **Provide/Inject**: Para comunicação em componentes compostos (Tabs, Accordion)
