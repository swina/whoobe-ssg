import { createApp } from 'vue';
import App from './App.vue';
import '@purge-icons/generated';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia'
//import store  from '/@/stores'


import './styles/base.css';
import './styles/custom.css';

// Router
import { Router } from '/@/router';

// i18n
import messages from '@intlify/vite-plugin-vue-i18n/messages';

const i18n = createI18n({
  locale: 'en',
  messages,
});

// WindiCSS
import 'virtual:windi.css';
import 'virtual:windi-devtools';
//import './input.css'

const app = createApp(App);

app.use(i18n);

app.use(Router);

app.use(createPinia());

app.mount('#app');
