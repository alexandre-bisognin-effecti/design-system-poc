<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold text-gray-900">
          UI Vue3 - Componentes
        </h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-12 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- MeButton Examples -->
        <section class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-bold mb-4">MeButton</h2>
          <div class="space-y-4">
            <MeButton>Default Button</MeButton>
            <MeButton>Primary Button</MeButton>
            <MeButton>Secondary Button</MeButton>
            <MeButton :disabled="true">Disabled Button</MeButton>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { MeButton } from './index'
</script>
