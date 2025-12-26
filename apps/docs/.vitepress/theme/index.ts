import DefaultTheme from 'vitepress/theme'
import { MeButton } from '@me/ui-vue3'
import ButtonPlayground from '../../components/MeButton/ButtonPlayground.vue'
import '@me/ui-vue3/dist/style.css'
import './custom.css' 

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MeButton', MeButton)
    app.component('ButtonPlayground', ButtonPlayground)
  }
}