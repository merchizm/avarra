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
import StateFlagLinks from './components/StateFlagLinks.vue'
import StateIdentity from './components/StateIdentity.vue'
import WikiReferenceLinks from './components/WikiReferenceLinks.vue'
import SettlementDirectory from './components/SettlementDirectory.vue'
import AvarraAtlas from './components/AvarraAtlas.vue'
import EraPopulationDossier from './components/EraPopulationDossier.vue'
import PeoplePortraits from './components/PeoplePortraits.vue'
import Backlinks from './components/Backlinks.vue'
import Timeline from './components/Timeline.vue'
import Figures from './components/Figures.vue'
import FigurePage from './components/FigurePage.vue'
import HomeFigures from './components/HomeFigures.vue'
import themeLayout from './components/ThemeLayout.js'
import ThemeToggle from './components/ThemeToggle.vue'
import StatesIndex from './components/StatesIndex.vue'
import HomeMapInk from './components/HomeMapInk.vue'
import PeopleAside from './components/PeopleAside.vue'
import NavBrand from './components/NavBrand.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomeRandomRecord from './components/HomeRandomRecord.vue'

export default {
  extends: DefaultTheme,
  Layout: themeLayout({
      'nav-bar-content-after': () => h(ThemeToggle),
      'nav-bar-title-before': () => h(NavBrand),
      'layout-bottom': () => h(SiteFooter),
      'doc-before': () => [h(StateIdentity), h(PeopleAside)],
      'doc-after': () => [h(PeoplePortraits), h(WikiReferenceLinks), h(AssetPathFixer), h(StateFlagLinks), h(PeopleHistoryReference), h(PeopleCultureReference), h(StateRelations), h(CapitalLife), h(EraPopulationDossier), h(Backlinks), h(EraFooter)]
  }),
    enhanceApp({ app }) {
      app.component('Backlinks', Backlinks)
      app.component('Timeline', Timeline)
      app.component('Figures', Figures)
      app.component('FigurePage', FigurePage)
      app.component('HomeFigures', HomeFigures)
      app.component('HomeMapInk', HomeMapInk)
      app.component('StatesIndex', StatesIndex)
      app.component('HomeRandomRecord', HomeRandomRecord)
      app.component('SettlementDirectory', SettlementDirectory)
    app.component('PeopleGallery', PeopleGallery)
    app.component('FaithCatalogue', FaithCatalogue)
    app.component('AvarraAtlas', AvarraAtlas)
  }
}
