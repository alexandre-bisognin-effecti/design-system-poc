<template>
  <div class="demo">
    <!-- PREVIEW -->
    <div class="preview">
      <MeButton
        :variant="variant"
        :size="size"
        :disabled="disabled"
      >
        {{ label }}
      </MeButton>
    </div>

    <!-- CONTROLES -->
    <div class="controls">
      <label>
        Texto
        <input v-model="label" />
      </label>

      <label>
        Variante
        <select v-model="variant">
          <option value="primary">primary</option>
          <option value="secondary">secondary</option>
          <option value="outline">outline</option>
          <option value="danger">danger</option>
        </select>
      </label>

      <label>
        Tamanho
        <select v-model="size">
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
      </label>

      <label>
        <input type="checkbox" v-model="disabled" />
        Disabled
      </label>
    </div>

    <!-- CÓDIGO -->
    <pre class="code">
<code>{{ code }}</code>
    </pre>

    <button class="copy" @click="copy">
      Copiar código
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MeButton } from '@me/ui-vue3'

const label = ref('Click me')
const variant = ref('primary')
const size = ref('medium')
const disabled = ref(false)

const code = computed(() => {
  return `<MeButton
  variant="${variant.value}"
  size="${size.value}"
  ${disabled.value ? 'disabled' : ''}
>
  ${label.value}
</MeButton>`
})

function copy() {
  navigator.clipboard.writeText(code.value)
}
</script>
