import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import PeopleGallery from './components/PeopleGallery.vue'
import FaithCatalogue from './components/FaithCatalogue.vue'
import PeopleHistoryReference from './components/PeopleHistoryReference.vue'
import PeopleCultureReference from './components/PeopleCultureReference.vue'
import StateRelations from './components/StateRelations.vue'
import CapitalLife from './components/CapitalLife.vue'
import EraFooter from './components/EraFooter.vue'
import AssetPathFixer from './components/AssetPathFixer.vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
      'doc-after': () => [h(AssetPathFixer), h(PeopleHistoryReference), h(PeopleCultureReference), h(StateRelations), h(CapitalLife), h(EraFooter)]
  }),
  enhanceApp({ app }) {
    app.component('PeopleGallery', PeopleGallery)
    app.component('FaithCatalogue', FaithCatalogue)
  }
}
