<script setup>
import { BoxSelect } from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { data as products } from '../../../products.data.js'
import ProductCard from './ProductCard.vue'

const collectionAccentHex = '#0071e3'
const collectionLabel = 'The Collection'
const collectionTitleLine1 = 'Components List'
const collectionTitleLine2 = ''
const collectionDescription = `Every component is a solid eBrick.
Color-coded for function,
built for performance.`

const activeSetCode = ref('')

const onSetChange = (event) => {
  const next = event?.detail?.code
  if (typeof next === 'string') activeSetCode.value = next
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    activeSetCode.value = window.__EBRICKS_ACTIVE_SET__ || ''
    window.addEventListener('ebricks:set-change', onSetChange)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('ebricks:set-change', onSetChange)
  }
})

const filteredProducts = computed(() => {
  if (!activeSetCode.value) return products
  return products.filter(p => !p.setCode || p.setCode === activeSetCode.value)
})
</script>

<template>
  <div>
    <!-- Collection Section -->
    <section id="edge-ai" class="py-32 px-6">
      <div class="max-w-7xl mx-auto space-y-32">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-8 border-zinc-200 pb-16">
          <div class="space-y-8">
            <div class="flex items-center space-x-3 font-black tracking-[0.4em] text-sm uppercase" :style="{ color: collectionAccentHex }">
              <BoxSelect class="w-5 h-5" />
              <span class="text-black">{{ collectionLabel }}</span>
            </div>
            <h2 class="text-6xl md:text-8xl font-black tracking-tightest leading-[0.9] text-black">
              {{ collectionTitleLine1 }} <br />
              <span class="text-black">{{ collectionTitleLine2 }}</span>
            </h2>
          </div>
          <p class="text-zinc-900 max-w-md text-2xl leading-relaxed font-black italic">
            {{ collectionDescription }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <ProductCard 
            v-for="(product, index) in filteredProducts" 
            :key="product.id" 
            :product="product" 
            :index="index"
          />
        </div>
      </div>
    </section>
  </div>
</template>
