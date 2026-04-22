<script setup>
import { Sparkles, Search } from 'lucide-vue-next'
import { useData, useRouter, withBase } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  setCode: {
    type: String,
    default: '',
  },
})

const { frontmatter } = useData()
const router = useRouter()

const setCode = computed(() => props.setCode)
const isSetPage = computed(() => Boolean(setCode.value))

const legoPalette = ['#d70015', '#0071e3', '#f5c518', '#248a3d', '#f38016', '#8e44ad']

const buildLegoTitleParts = titleText => {
  if (typeof titleText !== 'string') return []
  const tokens = titleText.trim().split(/\s+/).filter(Boolean)
  return tokens.map((text, idx) => ({
    text,
    color: legoPalette[idx % legoPalette.length],
  }))
}

const setIndex = [
  { code: 'eB803', name: 'eBricks-AI Kit Set' },
  { code: 'eB804', name: 'Nano Basic Set' },
  { code: 'eB805', name: '45 Sensor Set' },
]

const searchQuery = ref('')

const normalizeSetCode = code => code.trim().toLowerCase().replace(/[^a-z0-9]/g, '')

const toSetPath = code => {
  const normalized = normalizeSetCode(code)
  if (!normalized) return '/'
  return `/sets/${normalized}.html`
}

const matchingSets = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return setIndex.filter(s => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
})

const showResults = computed(() => matchingSets.value.length > 0)

const goToSet = code => {
  router.go(withBase(toSetPath(code)))
}

const goHome = () => {
  router.go(withBase('/'))
}

const selectSet = code => {
  goToSet(code)
  searchQuery.value = ''
}

const selectFirstMatch = () => {
  const q = searchQuery.value.trim()
  if (!q) return
  if (matchingSets.value.length > 0) {
    selectSet(matchingSets.value[0].code)
    return
  }
  selectSet(q)
}

const activeSet = computed(() => {
  if (!isSetPage.value) return null
  const found = setIndex.find(s => normalizeSetCode(s.code) === normalizeSetCode(setCode.value))
  return {
    code: setCode.value,
    name: found?.name || '',
    badgeText: `Set code: ${setCode.value}`,
    badgeTextHex: '#09090b',
    badgeAccentHex: '#0071e3',
    badgeCase: 'normal-case',
    badgeTracking: 'tracking-[0.15em]',
    badgeSize: 'text-lg',
    titleText: `${setCode.value} Set`,
    titleStyle: 'lego',
    titleParts: [],
    titleSize: 'text-[clamp(1.5rem,4vw,6rem)]',
    titleHex: '#09090b',
    titleFont: 'font-sans font-extrabold tracking-tight leading-[1.05] whitespace-nowrap antialiased',
    introText: 'Set page coming soon.',
    introTextHex: '#3f3f46',
    introTextSize: 'text-lg md:text-xl',
    introFont: 'font-sans leading-relaxed',
    posterSrc: '',
    posterAlt: '',
    posterFrameHex: '#06b6d4',
    posterGlowHex: 'rgba(6, 182, 212, 0.2)',
    posterMaxWidth: 'max-w-xl',
    posterBorderWidth: 'border-[14px]',
    posterPadding: 'p-3',
    posterRadius: 'rounded-[2.75rem]',
    posterInnerRadius: 'rounded-[2rem]',
  }
})

const heroTitleOverride = computed(() => {
  const t = frontmatter.value?.heroTitle
  return typeof t === 'string' && t.trim() ? t.trim() : ''
})

const heroIntroOverride = computed(() => {
  const i = frontmatter.value?.heroIntro
  return typeof i === 'string' && i.trim() ? i : ''
})

const heroNameOverride = computed(() => {
  const n = frontmatter.value?.setName
  return typeof n === 'string' && n.trim() ? n.trim() : ''
})

const badgeTextOverride = computed(() => {
  const b = frontmatter.value?.badgeText
  return typeof b === 'string' && b.trim() ? b.trim() : ''
})

const heroPosterSrcOverride = computed(() => {
  const s = frontmatter.value?.heroPosterSrc
  return typeof s === 'string' && s.trim() ? s.trim() : ''
})

const heroPosterAltOverride = computed(() => {
  const a = frontmatter.value?.heroPosterAlt
  return typeof a === 'string' && a.trim() ? a.trim() : ''
})

const resolvedActiveSet = computed(() => {
  if (!activeSet.value) return null
  const titleText = heroTitleOverride.value || activeSet.value.titleText
  const introText = heroIntroOverride.value || activeSet.value.introText
  const titleParts = activeSet.value.titleStyle === 'lego' ? buildLegoTitleParts(titleText) : []
  return {
    ...activeSet.value,
    name: heroNameOverride.value || activeSet.value.name,
    badgeText: badgeTextOverride.value || activeSet.value.badgeText,
    posterSrc: heroPosterSrcOverride.value || activeSet.value.posterSrc,
    posterAlt: heroPosterAltOverride.value || activeSet.value.posterAlt,
    titleText,
    titleParts,
    introText,
  }
})

const applySetSelection = code => {
  if (typeof window === 'undefined') return
  window.__EBRICKS_ACTIVE_SET__ = code
  window.dispatchEvent(new CustomEvent('ebricks:set-change', { detail: { code } }))
}

onMounted(() => {
  applySetSelection(setCode.value || '')
})

watch(setCode, () => {
  applySetSelection(setCode.value || '')
})

</script>

<template>
  <section class="relative pt-16 pb-10 px-6 overflow-visible">
    <div class="mx-auto max-w-6xl space-y-10">
      <div v-if="!isSetPage" class="flex flex-col items-center text-center pt-12 pb-6 space-y-10">
        <h1 class="text-[clamp(3rem,8vw,6rem)] font-extrabold tracking-tight leading-[1.05] text-zinc-950">
          eBricks-AI
        </h1>

        <div class="w-full max-w-md relative">
          <div class="flex items-center gap-3 bg-white border-2 border-zinc-200 rounded-2xl px-4 py-3 shadow-sm">
            <Search class="w-5 h-5 text-zinc-500" />
            <input
              v-model="searchQuery"
              type="text"
              class="w-full bg-transparent outline-none font-bold text-zinc-900 placeholder:text-zinc-400"
              placeholder="Search set code..."
              @keydown.enter.prevent="selectFirstMatch"
            />
          </div>

          <div
            v-if="showResults"
            class="absolute top-full mt-2 w-full bg-white border-2 border-zinc-200 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            <button
              v-for="set in matchingSets"
              :key="set.code"
              type="button"
              class="w-full text-left px-4 py-3 hover:bg-zinc-50 transition-colors"
              @click="selectSet(set.code)"
            >
              <div class="font-black text-zinc-950">
                {{ set.code }}
                <span class="font-bold text-zinc-600">— {{ set.name }}</span>
              </div>
            </button>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            v-for="set in setIndex"
            :key="set.code"
            :href="withBase(toSetPath(set.code))"
            class="px-5 py-3 rounded-2xl border-2 font-black tracking-tight transition-colors bg-white text-black border-zinc-200 hover:border-zinc-400"
          >
            {{ set.code }}
            <span class="font-bold text-zinc-600">— {{ set.name }}</span>
          </a>
        </div>
      </div>

      <div v-else class="space-y-10">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="px-4 py-2 rounded-2xl border-2 font-black tracking-tight transition-colors bg-white text-black border-zinc-200 hover:border-zinc-400"
              @click="goHome"
            >
              Home
            </button>
            <button
              v-for="set in setIndex"
              :key="set.code"
              type="button"
              class="px-4 py-2 rounded-2xl border-2 font-black tracking-tight transition-colors"
              :class="
                normalizeSetCode(setCode) === normalizeSetCode(set.code)
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-zinc-200 hover:border-zinc-400'
              "
              @click="goToSet(set.code)"
            >
              {{ set.code }}
            </button>
          </div>

          <div class="w-full lg:w-[420px] relative">
            <div class="flex items-center gap-3 bg-white border-2 border-zinc-200 rounded-2xl px-4 py-3 shadow-sm">
              <Search class="w-5 h-5 text-zinc-500" />
              <input
                v-model="searchQuery"
                type="text"
                class="w-full bg-transparent outline-none font-bold text-zinc-900 placeholder:text-zinc-400"
                placeholder="Search sets by code or name..."
                @keydown.enter.prevent="selectFirstMatch"
              />
            </div>

            <div
              v-if="showResults"
              class="absolute top-full mt-2 w-full bg-white border-2 border-zinc-200 rounded-2xl shadow-xl overflow-hidden z-50"
            >
              <button
                v-for="set in matchingSets"
                :key="set.code"
                type="button"
                class="w-full text-left px-4 py-3 hover:bg-zinc-50 transition-colors"
                @click="selectSet(set.code)"
              >
                <div class="font-black text-zinc-950">
                  {{ set.code }}
                  <span class="font-bold text-zinc-600">— {{ set.name }}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <h1 :class="[resolvedActiveSet.titleSize, resolvedActiveSet.titleFont]" class="text-center" :style="{ color: resolvedActiveSet.titleHex }">
          <span v-if="resolvedActiveSet.titleStyle === 'lego'" class="inline-flex items-baseline justify-center gap-x-4">
            <span
              v-for="(part, idx) in resolvedActiveSet.titleParts"
              :key="`${part.text}-${idx}`"
              class="lego-outline"
              :style="{ color: part.color }"
            >
              {{ part.text }}
            </span>
          </span>
          <span v-else>
            {{ resolvedActiveSet.titleText }}
          </span>
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10">
          <div v-if="resolvedActiveSet.posterSrc" :class="['w-full mx-auto lg:mx-0 relative z-10', resolvedActiveSet.posterMaxWidth]">
            <div
              :class="[
                'relative overflow-hidden shadow-[0_60px_120px_-45px_rgba(0,0,0,0.35)]',
                resolvedActiveSet.posterRadius,
                resolvedActiveSet.posterBorderWidth,
                resolvedActiveSet.posterPadding,
              ]"
              :style="{ backgroundColor: resolvedActiveSet.posterFrameHex, borderColor: resolvedActiveSet.posterFrameHex }"
            >
              <img
                :src="resolvedActiveSet.posterSrc"
                :alt="resolvedActiveSet.posterAlt"
                :class="['w-full h-auto object-contain', resolvedActiveSet.posterInnerRadius]"
              />
            </div>

            <div class="absolute -inset-20 blur-[150px] -z-10 rounded-full" :style="{ backgroundColor: resolvedActiveSet.posterGlowHex }" />
          </div>

          <div class="w-full max-w-2xl mx-auto lg:mx-0 space-y-8 lg:space-y-10 z-20 text-left">
            <div
              :class="[
                'inline-flex items-center space-x-3 px-6 py-3 rounded-3xl bg-white border-4 border-zinc-200 font-black shadow-xl',
                resolvedActiveSet.badgeCase,
                resolvedActiveSet.badgeTracking,
                resolvedActiveSet.badgeSize,
              ]"
              :style="{ color: resolvedActiveSet.badgeAccentHex }"
            >
              <Sparkles class="w-5 h-5" />
              <span :style="{ color: resolvedActiveSet.badgeTextHex }">{{ resolvedActiveSet.badgeText }}</span>
            </div>

            <p
              :class="[resolvedActiveSet.introTextSize, resolvedActiveSet.introFont]"
              class="whitespace-pre-line"
              :style="{ color: resolvedActiveSet.introTextHex }"
            >
              {{ resolvedActiveSet.introText }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
