import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcon from './fontAwesomeIcon'
import store from './store/store'

createApp(App).use(store).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
