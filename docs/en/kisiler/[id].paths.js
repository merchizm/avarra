import { figures } from '../../.vitepress/theme/data/figures.js'

export default { paths: () => figures.map((f) => ({ params: { id: f.id, title: f.en.name } })) }
