import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import PeopleGallery from './components/PeopleGallery.vue'
import FaithCatalogue from './components/FaithCatalogue.vue'
import PeopleHistoryReference from './components/PeopleHistoryReference.vue'
import PeopleCultureReference from './components/PeopleCultureReference.vue'
import EraFooter from './components/EraFooter.vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
      'doc-after': () => [h(PeopleHistoryReference), h(PeopleCultureReference), h(EraFooter)]
  }),
  enhanceApp({ app }) {
    app.component('PeopleGallery', PeopleGallery)
    app.component('FaithCatalogue', FaithCatalogue)
  }
}
