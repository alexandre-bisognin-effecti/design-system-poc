import MeButton from './components/MeButton.vue'

export { MeButton }

export default {
  install(Vue: any) {
    Vue.component('MeButton', MeButton)
  }
}
