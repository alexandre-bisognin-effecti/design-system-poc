<template>
  <button
    class="me-button"
    :class="[
      `me-button--${variant}`,
      `me-button--${size}`,
      { 'is-block': block, 'is-loading': loading }
    ]"
    :disabled="disabled || loading"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}>()
</script>

<style>
.me-button {
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.me-button--primary { background: #22c55e; color: white; }
.me-button--secondary { background: #64748b; color: white; }
.me-button--outline { background: transparent; border: 1px solid #cbd5e1; }
.me-button--danger { background: #ef4444; color: white; }

.me-button--small { font-size: 12px; }
.me-button--medium { font-size: 14px; }
.me-button--large { font-size: 16px; }

.is-block { width: 100%; }
.is-loading { opacity: 0.6; pointer-events: none; }
</style>
