import DefaultTheme from 'vitepress/theme'
import './style.css'
import PeopleGallery from './components/PeopleGallery.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PeopleGallery', PeopleGallery)
  }
}
