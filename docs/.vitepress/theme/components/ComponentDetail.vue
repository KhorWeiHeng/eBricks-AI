<script setup>
import { ArrowLeft, Box, Zap, Info, Terminal, Code } from 'lucide-vue-next'
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  component: {
    type: Object,
    required: true
  }
})

const themes = {
  blue: { bg: 'bg-brick-blue', text: 'text-brick-blue', lightBg: 'bg-brick-blue/10', isLight: false },
  red: { bg: 'bg-brick-red', text: 'text-brick-red', lightBg: 'bg-brick-red/10', isLight: false },
  yellow: { bg: 'bg-brick-yellow', text: 'text-brick-yellow', lightBg: 'bg-brick-yellow/15', isLight: true },
  green: { bg: 'bg-brick-green', text: 'text-brick-green', lightBg: 'bg-brick-green/10', isLight: false },
  orange: { bg: 'bg-brick-orange', text: 'text-brick-orange', lightBg: 'bg-brick-orange/10', isLight: false },
  purple: { bg: 'bg-brick-purple', text: 'text-brick-purple', lightBg: 'bg-brick-purple/10', isLight: false },
  white: { bg: 'bg-white', text: 'text-black', lightBg: 'bg-zinc-100', isLight: true }
}

const theme = themes[props.component.color] || themes.white

const quickStartConnection = computed(() => {
  const connection = props.component?.quickStart?.connection
  return Array.isArray(connection) ? connection : []
})

const quickStartCode = computed(() => {
  const code = props.component?.quickStart?.code
  return typeof code === 'string' ? code : ''
})

const hasQuickStart = computed(() => {
  return quickStartConnection.value.length > 0 || Boolean(quickStartCode.value.trim())
})

const quickStartHasBoth = computed(() => {
  return quickStartConnection.value.length > 0 && Boolean(quickStartCode.value.trim())
})

const copyCode = () => {
  const code = quickStartCode.value
  if (!code.trim()) return
  navigator.clipboard.writeText(code)
  alert('Code copied to clipboard!')
}

const normalizeAddParagraphBlocks = value => {
  if (!value) return []

  if (typeof value === 'string') {
    return [{ after: 'schematic', text: value }]
  }

  if (Array.isArray(value)) {
    return value
      .map(item => {
        if (!item) return null
        if (typeof item === 'string') return { after: 'schematic', text: item }
        const after = typeof item.after === 'string' && item.after.trim() ? item.after.trim() : 'schematic'
        const text =
          typeof item.text === 'string'
            ? item.text
            : typeof item.content === 'string'
              ? item.content
              : ''
        if (!text.trim()) return null
        return { after, text }
      })
      .filter(Boolean)
  }

  if (typeof value === 'object') {
    if (typeof value.text === 'string' || typeof value.content === 'string') {
      const after = typeof value.after === 'string' && value.after.trim() ? value.after.trim() : 'schematic'
      const text = typeof value.text === 'string' ? value.text : value.content
      return text && text.trim() ? [{ after, text }] : []
    }

    return Object.entries(value)
      .map(([after, text]) => (typeof text === 'string' && text.trim() ? { after, text } : null))
      .filter(Boolean)
  }

  return []
}

const toSimpleBlock = (after, value) => {
  if (typeof value !== 'string') return null
  if (!value.trim()) return null
  return { after, text: value }
}

const addParagraphBlocks = computed(() => {
  const blocks = [...normalizeAddParagraphBlocks(props.component.add_paragraph)]

  const simpleSpotKeys = [
    ['breadcrumb', props.component.add_paragraph_breadcrumb],
    ['hero', props.component.add_paragraph_hero],
    ['specs', props.component.add_paragraph_specs],
    ['schematic', props.component.add_paragraph_schematic],
    ['quickstart', props.component.add_paragraph_quickstart],
    ['bottom', props.component.add_paragraph_bottom],
  ]

  for (const [after, value] of simpleSpotKeys) {
    const block = toSimpleBlock(after, value)
    if (block) blocks.push(block)
  }

  return blocks
})

const addParagraphBlocksAfter = after =>
  addParagraphBlocks.value.filter(block => block.after === after && typeof block.text === 'string' && block.text.trim())

const normalizeImages = value => {
  if (!value) return []

  if (typeof value === 'string') {
    const src = value.trim()
    return src ? [{ src, alt: '' }] : []
  }

  if (Array.isArray(value)) {
    return value
      .map(item => {
        if (!item) return null
        if (typeof item === 'string') {
          const src = item.trim()
          return src ? { src, alt: '' } : null
        }
        if (typeof item === 'object') {
          const src = typeof item.src === 'string' ? item.src.trim() : ''
          const alt = typeof item.alt === 'string' ? item.alt : ''
          return src ? { src, alt } : null
        }
        return null
      })
      .filter(Boolean)
  }

  if (typeof value === 'object') {
    const src = typeof value.src === 'string' ? value.src.trim() : ''
    const alt = typeof value.alt === 'string' ? value.alt : ''
    return src ? [{ src, alt }] : []
  }

  return []
}

const imagesByAfter = computed(() => {
  const map = new Map()

  const pushImages = (after, value) => {
    const items = normalizeImages(value)
    if (!items.length) return
    const prev = map.get(after) || []
    map.set(after, prev.concat(items))
  }

  pushImages('schematic', props.component.add_images)
  pushImages('breadcrumb', props.component.add_images_breadcrumb)
  pushImages('hero', props.component.add_images_hero)
  pushImages('specs', props.component.add_images_specs)
  pushImages('schematic', props.component.add_images_schematic)
  pushImages('quickstart', props.component.add_images_quickstart)
  pushImages('bottom', props.component.add_images_bottom)

  return map
})

const imagesAfter = after => imagesByAfter.value.get(after) || []

const backHref = computed(() => withBase('/sets/eb803.html'))
</script>

<template>
  <div class="min-h-screen pt-12 pb-48 px-6">
    <div class="max-w-7xl mx-auto space-y-32">
      <!-- Breadcrumb -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <a :href="backHref" class="inline-flex items-center space-x-3 text-black hover:text-brick-blue transition-colors group font-black uppercase tracking-[0.2em] text-xs">
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
          <span>Back to Baseplate</span>
        </a>
        <div class="flex items-center space-x-4">
          <span class="text-[10px] font-black uppercase tracking-widest text-black bg-zinc-100 px-3 py-1 rounded-full">
            Series: 803 Edge AI
          </span>
        </div>
      </div>

      <div v-for="(block, idx) in addParagraphBlocksAfter('breadcrumb')" :key="`ap-breadcrumb-${idx}`" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot space-y-6 shadow-sm">
        <p class="text-lg md:text-xl text-zinc-800 font-bold leading-relaxed whitespace-pre-line">{{ block.text }}</p>
      </div>
      <div v-if="imagesAfter('breadcrumb').length" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <img
            v-for="(img, idx) in imagesAfter('breadcrumb')"
            :key="`img-breadcrumb-${idx}`"
            :src="img.src"
            :alt="img.alt || component.name"
            class="w-full h-auto object-contain rounded-3xl border-2 border-zinc-100 bg-white"
          />
        </div>
      </div>

      <!-- Hero Section -->
      <section class="flex flex-col lg:flex-row items-center gap-24">
        <div class="flex-1 space-y-12">
          <div :class="['inline-flex items-center space-x-3 px-6 py-3 rounded-2xl border-2 border-current text-xs font-black uppercase tracking-[0.4em]', theme.lightBg, theme.text]">
            <Zap :size="16" fill="currentColor" />
            <span class="text-black">Active Module</span>
          </div>
          
          <div class="space-y-8">
            <h1 class="text-5xl md:text-7xl font-black tracking-tightest leading-[0.85] text-black">
              {{ component.name }}
            </h1>
            <p class="text-2xl md:text-3xl text-zinc-800 font-bold leading-relaxed max-w-2xl">
              {{ component.description }}
            </p>
          </div>
        </div>

        <div class="flex-1 w-full max-w-xl relative group">
          <div :class="['relative rounded-[4rem] p-12 polished-plastic shadow-brick transition-all duration-500 group-hover:-translate-y-4', theme.bg]">
            <div class="absolute top-8 left-8 w-10 h-10 rounded-full brick-stud" />
            <div class="absolute top-8 right-8 w-10 h-10 rounded-full brick-stud" />
            <div class="absolute bottom-8 left-8 w-10 h-10 rounded-full brick-stud" />
            <div class="absolute bottom-8 right-8 w-10 h-10 rounded-full brick-stud" />

            <div class="relative z-10 space-y-10">
              <div class="aspect-square rounded-[3.5rem] border-8 border-black/10 shadow-2xl bg-white/40 backdrop-blur-md p-8 flex items-center justify-center">
                <img :src="component.image" :alt="component.name" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-between font-black uppercase tracking-[0.2em] text-xs text-black opacity-60">
                <span>{{ component.id.toUpperCase() }} MODULE</span>
                <Box :size="16" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div v-for="(block, idx) in addParagraphBlocksAfter('hero')" :key="`ap-hero-${idx}`" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot space-y-6 shadow-sm">
        <p class="text-lg md:text-xl text-zinc-800 font-bold leading-relaxed whitespace-pre-line">{{ block.text }}</p>
      </div>
      <div v-if="imagesAfter('hero').length" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <img
            v-for="(img, idx) in imagesAfter('hero')"
            :key="`img-hero-${idx}`"
            :src="img.src"
            :alt="img.alt || component.name"
            class="w-full h-auto object-contain rounded-3xl border-2 border-zinc-100 bg-white"
          />
        </div>
      </div>

      <!-- Technical Specifications -->
      <section class="space-y-16">
        <div class="flex items-center justify-between border-b-4 border-grid-dot pb-8">
          <div class="flex items-center space-x-4">
            <div :class="['p-3 rounded-2xl', theme.bg, theme.isLight ? 'text-black' : 'text-white']">
              <Info :size="24" />
            </div>
            <h2 class="text-4xl font-black tracking-tightest text-black uppercase">Technical Specifications</h2>
          </div>
        </div>

        <div class="w-full">
          <div v-if="component.detailedSpecs" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="section in component.detailedSpecs" :key="section.title" class="bg-white p-10 rounded-[3rem] border-2 border-grid-dot space-y-8 shadow-sm">
              <h3 :class="['text-2xl font-black tracking-tightest uppercase', theme.text]">{{ section.title }}</h3>
              <div class="space-y-4">
                <div v-for="(value, key) in section.items" :key="key" class="flex justify-between items-center border-b border-grid-dot pb-4 group">
                  <span class="text-zinc-500 font-bold uppercase text-xs tracking-widest">{{ key }}</span>
                  <span class="text-black font-black text-lg group-hover:scale-105 transition-transform origin-right">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="(value, key) in component.specs" :key="key" class="bg-white p-12 rounded-4xl border-2 border-grid-dot space-y-4 hover:border-black/20 transition-all shadow-sm group">
              <span :class="['text-xs font-black uppercase tracking-[0.2em]', theme.text]">{{ key }}</span>
              <p class="text-3xl font-black text-black group-hover:scale-105 transition-transform origin-left">{{ value }}</p>
            </div>
          </div>
        </div>
      </section>

      <div v-for="(block, idx) in addParagraphBlocksAfter('specs')" :key="`ap-specs-${idx}`" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot space-y-6 shadow-sm">
        <p class="text-lg md:text-xl text-zinc-800 font-bold leading-relaxed whitespace-pre-line">{{ block.text }}</p>
      </div>
      <div v-if="imagesAfter('specs').length" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <img
            v-for="(img, idx) in imagesAfter('specs')"
            :key="`img-specs-${idx}`"
            :src="img.src"
            :alt="img.alt || component.name"
            class="w-full h-auto object-contain rounded-3xl border-2 border-zinc-100 bg-white"
          />
        </div>
      </div>

      <!-- Schematic Diagram -->
      <section v-if="component.schematic" class="space-y-16">
        <div class="flex items-center justify-between border-b-4 border-grid-dot pb-8">
          <div class="flex items-center space-x-4">
            <div :class="['p-3 rounded-2xl', theme.bg, theme.isLight ? 'text-black' : 'text-white']">
              <Box :size="24" />
            </div>
            <h2 class="text-4xl font-black tracking-tightest text-black uppercase">Schematic Diagram</h2>
          </div>
        </div>

        <div class="bg-white p-12 md:p-16 rounded-[5rem] border-4 border-grid-dot shadow-inner overflow-hidden">
          <div class="w-full flex flex-col items-center space-y-12">
            <div class="w-full max-w-2xl aspect-auto rounded-[4rem] border-8 border-zinc-50 bg-white p-8 shadow-2xl">
              <img :src="component.schematic" :alt="`${component.name} Schematic`" class="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      <div v-for="(block, idx) in addParagraphBlocksAfter('schematic')" :key="`ap-schematic-${idx}`" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot space-y-6 shadow-sm">
        <p class="text-lg md:text-xl text-zinc-800 font-bold leading-relaxed whitespace-pre-line">{{ block.text }}</p>
      </div>
      <div v-if="imagesAfter('schematic').length" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <img
            v-for="(img, idx) in imagesAfter('schematic')"
            :key="`img-schematic-${idx}`"
            :src="img.src"
            :alt="img.alt || component.name"
            class="w-full h-auto object-contain rounded-3xl border-2 border-zinc-100 bg-white"
          />
        </div>
      </div>

      <!-- Quick Start -->
      <section v-if="hasQuickStart" :class="['grid gap-16', quickStartHasBoth ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1']">
        <div v-if="quickStartConnection.length" class="bg-white p-16 rounded-[4rem] border-2 border-grid-dot space-y-12 shadow-sm">
          <div class="flex items-center space-x-6">
            <div :class="['w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg', theme.bg]">
              <Zap :class="['w-8 h-8 fill-current', theme.isLight ? 'text-black' : 'text-white']" />
            </div>
            <h3 class="text-5xl font-black tracking-tightest text-black">Wire Connection</h3>
          </div>
          <div class="space-y-6">
            <div v-for="(step, idx) in quickStartConnection" :key="idx" class="flex items-center space-x-6 group">
              <div :class="['w-12 h-12 rounded-full flex items-center justify-center text-sm font-black border-4 border-black/5 shadow-md', theme.bg, theme.isLight ? 'text-black' : 'text-white']">
                {{ idx + 1 }}
              </div>
              <span class="text-black text-xl font-bold tracking-tight group-hover:translate-x-3 transition-transform">{{ step }}</span>
            </div>
          </div>
        </div>

        <div v-if="quickStartCode.trim()" class="bg-zinc-900 p-16 rounded-[4rem] space-y-12 shadow-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <div class="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                <Terminal class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-5xl font-black tracking-tightest text-white">Copy Code</h3>
            </div>
            <button @click="copyCode" class="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10">
              <Code :size="24" />
            </button>
          </div>
          <div class="bg-black/40 rounded-3xl p-10 border border-white/5 overflow-hidden">
            <pre class="text-lg font-mono leading-relaxed overflow-x-auto custom-scrollbar text-white/90">
              <code>{{ quickStartCode }}</code>
            </pre>
          </div>
        </div>
      </section>

      <div v-for="(block, idx) in addParagraphBlocksAfter('quickstart')" :key="`ap-quickstart-${idx}`" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot space-y-6 shadow-sm">
        <p class="text-lg md:text-xl text-zinc-800 font-bold leading-relaxed whitespace-pre-line">{{ block.text }}</p>
      </div>
      <div v-if="imagesAfter('quickstart').length" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <img
            v-for="(img, idx) in imagesAfter('quickstart')"
            :key="`img-quickstart-${idx}`"
            :src="img.src"
            :alt="img.alt || component.name"
            class="w-full h-auto object-contain rounded-3xl border-2 border-zinc-100 bg-white"
          />
        </div>
      </div>

      <div v-for="(block, idx) in addParagraphBlocksAfter('bottom')" :key="`ap-bottom-${idx}`" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot space-y-6 shadow-sm">
        <p class="text-lg md:text-xl text-zinc-800 font-bold leading-relaxed whitespace-pre-line">{{ block.text }}</p>
      </div>
      <div v-if="imagesAfter('bottom').length" class="bg-white p-12 rounded-[4rem] border-2 border-grid-dot shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <img
            v-for="(img, idx) in imagesAfter('bottom')"
            :key="`img-bottom-${idx}`"
            :src="img.src"
            :alt="img.alt || component.name"
            class="w-full h-auto object-contain rounded-3xl border-2 border-zinc-100 bg-white"
          />
        </div>
      </div>
    </div>
  </div>
</template>
