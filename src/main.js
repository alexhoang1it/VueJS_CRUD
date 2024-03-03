import './assets/main.css'
import './index.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, { ripple: true })

app.mount('#app')
