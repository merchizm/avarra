import DefaultTheme from 'vitepress/theme'
import './style.css'
import PeopleGallery from './components/PeopleGallery.vue'
import FaithCatalogue from './components/FaithCatalogue.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PeopleGallery', PeopleGallery)
    app.component('FaithCatalogue', FaithCatalogue)
  }
}
