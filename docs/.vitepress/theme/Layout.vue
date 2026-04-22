<script setup>
import { useData } from 'vitepress'
import BasePlate from './components/BasePlate.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <BasePlate>
    <main class="pt-20">
      <div v-if="frontmatter.layout === 'home'">
        <Content />
      </div>
      <div v-else-if="page.relativePath.includes('sets/')">
        <Content />
      </div>
      <div v-else-if="page.relativePath.includes('products/')">
        <ComponentDetail :component="frontmatter" />
      </div>
      <div v-else class="max-w-7xl mx-auto px-6 py-20 prose prose-zinc lg:prose-xl">
        <Content />
      </div>
    </main>
  </BasePlate>
</template>
