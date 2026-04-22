<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const namedColorHexMap = {
  blue: '#0071e3',
  red: '#d70015',
  yellow: '#f5c518',
  green: '#248a3d',
  orange: '#f38016',
  purple: '#8e44ad',
  white: '#ffffff',
}

const normalizeHexColor = (value) => {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return ''
  if (trimmed.length === 4) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toLowerCase()
  }
  return trimmed.toLowerCase()
}

const toRgbCsv = (hex) => {
  const safeHex = normalizeHexColor(hex) || namedColorHexMap.white
  const r = Number.parseInt(safeHex.slice(1, 3), 16)
  const g = Number.parseInt(safeHex.slice(3, 5), 16)
  const b = Number.parseInt(safeHex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

const resolvedHexColor = computed(() => {
  const raw = props.product?.color
  const hex = normalizeHexColor(raw)
  if (hex) return hex
  const named = typeof raw === 'string' ? raw.trim().toLowerCase() : ''
  return namedColorHexMap[named] || namedColorHexMap.white
})

const accentClasses = computed(() => {
  if (resolvedHexColor.value === namedColorHexMap.white) {
    return 'text-black border-4 border-zinc-200'
  }
  return 'text-black'
})

const accentStyle = computed(() => ({
  backgroundColor: resolvedHexColor.value,
  '--brick-glow-rgb': toRgbCsv(resolvedHexColor.value),
}))
</script>

<template>
  <a :href="product.url" class="glow-on-hover block group">
    <div :class="[
      'relative h-96 w-full rounded-4xl shadow-brick hover:shadow-brick-hover polished-plastic glow-dynamic transition-all duration-300 hover:-translate-y-3',
      accentClasses
    ]" :style="accentStyle">
      <!-- LEGO Studs - Corner placement -->
      <div class="absolute top-6 left-6 w-6 h-6 rounded-full brick-stud" />
      <div class="absolute top-6 right-6 w-6 h-6 rounded-full brick-stud" />
      <div class="absolute bottom-6 left-6 w-6 h-6 rounded-full brick-stud" />
      <div class="absolute bottom-6 right-6 w-6 h-6 rounded-full brick-stud" />

      <!-- Main Content -->
      <div class="h-full w-full p-10 flex flex-col items-center justify-center text-center space-y-6">
        <div class="w-32 h-32 rounded-3xl bg-white/40 backdrop-blur-md shadow-inner border-2 border-black/10 flex items-center justify-center p-2">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div class="space-y-2">
          <h3 class="text-2xl font-black tracking-tightest leading-tight text-black">
            {{ product.name }}
          </h3>
          <p class="text-sm font-black leading-relaxed line-clamp-2 text-black">
            {{ product.description }}
          </p>
        </div>

        <div class="inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-black/10 text-black">
          <span>View Specs</span>
          <ArrowRight class="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </a>
</template>
