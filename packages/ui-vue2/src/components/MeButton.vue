<template>
  <button class="me-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'MeButton'
}
</script>

<style>
.me-button {
  padding: 8px 12px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
