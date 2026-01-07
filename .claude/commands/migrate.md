# Migrar Componente Vue 2.7 para Vue 3

Argumento: $ARGUMENTS (nome do componente em PascalCase, ex: MeInput, MeModal)

## Objetivo

Migrar um componente Vue 2.7 (Options API) para Vue 3 (Composition API com `<script setup>`) seguindo os padrões do design system @me/ui-vue3.

## Instruções

1. O usuário irá colar o código do componente Vue 2.7
2. Analisar o componente e identificar todos os elementos a converter
3. Criar a versão Vue 3 seguindo o padrão do design system
4. Criar/atualizar os testes
5. Atualizar exports se necessário

## Mapeamento de Conversão Vue 2.7 → Vue 3

### 1. Script Setup

**Vue 2.7 (Options API):**
```vue
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MeInput',
  props: {
    value: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['input', 'focus'],
  data() {
    return { focused: false }
  },
  computed: {
    inputClasses() {
      return { 'is-focused': this.focused }
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  }
})
</script>
```

**Vue 3 (Composition API):**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

export interface MeInputProps {
  modelValue?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<MeInputProps>(), {
  modelValue: '',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
}>()

const focused = ref(false)

const inputClasses = computed(() => ({
  'is-focused': focused.value
}))

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
```

### 2. Breaking Changes Vue 2 → Vue 3

| Vue 2.7 | Vue 3 | Notas |
|---------|-------|-------|
| `v-model` / `value` + `@input` | `modelValue` + `@update:modelValue` | v-model mudou |
| `$emit('input', val)` | `emit('update:modelValue', val)` | Para v-model |
| `$listeners` | Removido (use `v-bind="$attrs"`) | Mesclado em $attrs |
| `$scopedSlots` | `$slots` (unificado) | Slots unificados |
| `.native` modifier | Removido | Eventos nativos automáticos |
| `::v-deep` | `:deep()` | Novo seletor |
| Filters `{{ val \| filter }}` | Computed ou método | Filters removidos |
| `$set` / `$delete` | Não necessário | Reatividade melhorada |
| `@hook:mounted` | `@vue:mounted` | Lifecycle hooks |
| `.sync` modifier | `v-model:prop` | Múltiplos v-model |

### 3. Conversão de Props

**Vue 2.7:**
```typescript
props: {
  value: {
    type: String as PropType<string>,
    default: ''
  },
  variant: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary',
    validator: (v) => ['primary', 'secondary'].includes(v)
  },
  items: {
    type: Array as PropType<Item[]>,
    required: true
  }
}
```

**Vue 3:**
```typescript
export interface MeComponentProps {
  /** Valor do campo (v-model) */
  modelValue?: string
  /** Variante visual */
  variant?: 'primary' | 'secondary'
  /** Lista de itens */
  items: Item[]
}

const props = withDefaults(defineProps<MeComponentProps>(), {
  modelValue: '',
  variant: 'primary'
})
```

### 4. Conversão de Emits

**Vue 2.7:**
```typescript
emits: ['input', 'change', 'focus', 'blur'],
methods: {
  handleChange(val) {
    this.$emit('input', val)
    this.$emit('change', val)
  }
}
```

**Vue 3:**
```typescript
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

function handleChange(val: string) {
  emit('update:modelValue', val)
  emit('change', val)
}
```

### 5. Conversão de Data/Refs

**Vue 2.7:**
```typescript
data() {
  return {
    isOpen: false,
    items: [],
    selectedItem: null
  }
}
```

**Vue 3:**
```typescript
const isOpen = ref(false)
const items = ref<Item[]>([])
const selectedItem = ref<Item | null>(null)
```

### 6. Conversão de Computed

**Vue 2.7:**
```typescript
computed: {
  fullName() {
    return `${this.firstName} ${this.lastName}`
  },
  isValid: {
    get() { return this.valid },
    set(val) { this.$emit('update:valid', val) }
  }
}
```

**Vue 3:**
```typescript
const fullName = computed(() => `${props.firstName} ${props.lastName}`)

const isValid = computed({
  get: () => props.valid,
  set: (val) => emit('update:valid', val)
})
```

### 7. Conversão de Watch

**Vue 2.7:**
```typescript
watch: {
  value: {
    handler(newVal, oldVal) {
      this.internalValue = newVal
    },
    immediate: true,
    deep: true
  }
}
```

**Vue 3:**
```typescript
watch(
  () => props.value,
  (newVal, oldVal) => {
    internalValue.value = newVal
  },
  { immediate: true, deep: true }
)
```

### 8. Conversão de Lifecycle Hooks

**Vue 2.7:**
```typescript
created() {
  this.init()
},
mounted() {
  this.setupListeners()
},
beforeDestroy() {
  this.cleanup()
}
```

**Vue 3:**
```typescript
// created -> código direto no setup
init()

onMounted(() => {
  setupListeners()
})

onBeforeUnmount(() => {
  cleanup()
})
```

### 9. Conversão de Slots

**Vue 2.7 Template:**
```vue
<template>
  <div>
    <slot name="header" :item="currentItem"></slot>
    <slot></slot>
    <template v-if="$scopedSlots.footer">
      <slot name="footer"></slot>
    </template>
  </div>
</template>
```

**Vue 3 Template:**
```vue
<template>
  <div>
    <slot name="header" :item="currentItem"></slot>
    <slot></slot>
    <template v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </div>
</template>
```

### 10. Conversão de Estilos

**Vue 2.7:**
```scss
<style lang="scss" scoped>
@import '../../assets/scss/variables';

.me-input {
  color: $blue-primary;

  /deep/ .inner-element {
    // deep selector antigo
  }

  ::v-deep .another-element {
    // deep selector
  }
}
</style>
```

**Vue 3:**
```scss
<style lang="scss" scoped>
@use '../../assets/scss/imports/tokens' as *;

.me-input {
  color: $blue-primary;

  :deep(.inner-element) {
    // novo deep selector
  }

  :deep(.another-element) {
    // novo deep selector
  }
}
</style>
```

## Checklist de Migração

Ao migrar um componente:

1. [ ] **Estrutura**: Criar pasta `packages/ui-vue3/src/components/{nome-kebab-case}/`
2. [ ] **Script**: Converter para `<script setup lang="ts">`
3. [ ] **Props**: Criar interface TypeScript e usar `defineProps<>()`
4. [ ] **v-model**: Converter `value`/`@input` para `modelValue`/`@update:modelValue`
5. [ ] **Emits**: Tipar com `defineEmits<>()`
6. [ ] **Data**: Converter para `ref()` ou `reactive()`
7. [ ] **Computed**: Converter para `computed()`
8. [ ] **Watch**: Converter para `watch()` ou `watchEffect()`
9. [ ] **Methods**: Converter para funções normais
10. [ ] **Lifecycle**: Converter hooks (`mounted` → `onMounted`, etc.)
11. [ ] **Slots**: Atualizar `$scopedSlots` para `$slots`
12. [ ] **Estilos**: Atualizar `::v-deep` para `:deep()`, imports para `@use`
13. [ ] **Testes**: Criar/atualizar testes Vitest
14. [ ] **Export**: Adicionar em `packages/ui-vue3/src/index.ts`
15. [ ] **Rodar testes**: `cd packages/ui-vue3 && npm run test`

## Exemplo Completo de Migração

### Antes (Vue 2.7)

```vue
<template>
  <div :class="['me-input', inputClasses]">
    <label v-if="label" class="me-input__label">{{ label }}</label>
    <input
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span v-if="error" class="me-input__error">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MeInput',

  props: {
    value: {
      type: String,
      default: ''
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
    error: String,
    variant: {
      type: String as PropType<'default' | 'outlined'>,
      default: 'default'
    }
  },

  emits: ['input', 'focus', 'blur'],

  data() {
    return {
      focused: false
    }
  },

  computed: {
    inputClasses(): Record<string, boolean> {
      return {
        'me-input--focused': this.focused,
        'me-input--error': !!this.error,
        'me-input--disabled': this.disabled,
        [`me-input--${this.variant}`]: true
      }
    }
  },

  methods: {
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement
      this.$emit('input', target.value)
    },
    handleFocus(e: FocusEvent) {
      this.focused = true
      this.$emit('focus', e)
    },
    handleBlur(e: FocusEvent) {
      this.focused = false
      this.$emit('blur', e)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.me-input {
  // estilos
}
</style>
```

### Depois (Vue 3)

```vue
<script setup lang="ts">
/**
 * @component MeInput
 * @description Campo de entrada de texto
 */
import { ref, computed } from 'vue'

// Types
export interface MeInputProps {
  /** Valor do input (v-model) */
  modelValue?: string
  /** Label do campo */
  label?: string
  /** Placeholder */
  placeholder?: string
  /** Estado desabilitado */
  disabled?: boolean
  /** Mensagem de erro */
  error?: string
  /** Variante visual */
  variant?: 'default' | 'outlined'
}

// Props
const props = withDefaults(defineProps<MeInputProps>(), {
  modelValue: '',
  variant: 'default'
})

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

// State
const focused = ref(false)

// Computed
const inputClasses = computed(() => ({
  'me-input--focused': focused.value,
  'me-input--error': !!props.error,
  'me-input--disabled': props.disabled,
  [`me-input--${props.variant}`]: true
}))

// Methods
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleFocus(e: FocusEvent) {
  focused.value = true
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  focused.value = false
  emit('blur', e)
}
</script>

<template>
  <div :class="['me-input', inputClasses]">
    <label v-if="label" class="me-input__label">{{ label }}</label>
    <input
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span v-if="error" class="me-input__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/imports/tokens' as *;

.me-input {
  display: flex;
  flex-direction: column;
  gap: $mini;

  &__label {
    font-size: $text-sm;
    color: $text-secondary;
  }

  input {
    padding: $mini $xxs;
    border: $border-base solid $neutral-light;
    border-radius: $border-radius-base;
    font-size: $text-base;
    @include transition-effect;

    &:focus {
      outline: none;
      border-color: $blue-primary;
    }

    &::placeholder {
      color: $neutral-default;
    }
  }

  &__error {
    font-size: $text-sm;
    color: $red-primary;
  }

  &--focused {
    input {
      border-color: $blue-primary;
    }
  }

  &--error {
    input {
      border-color: $red-primary;
    }
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
```

## Fluxo de Uso

1. Execute `/migrate MeComponentName`
2. Cole o código Vue 2.7 do componente
3. O assistente irá:
   - Analisar o componente
   - Identificar todas as conversões necessárias
   - Criar a versão Vue 3 completa
   - Criar os testes
   - Mostrar as diferenças principais
