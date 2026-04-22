import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'
import HomeHero from './components/HomeHero.vue'
import ProductGallery from './components/ProductGallery.vue'
import ComponentDetail from './components/ComponentDetail.vue'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
    app.component('ProductGallery', ProductGallery)
    app.component('ComponentDetail', ComponentDetail)
  }
}
