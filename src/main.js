import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import VeeValidatePlugin from './includes/validation.js';
import { auth } from './includes/firebase.js';
import './assets/tailwind.css'
import './assets/main.css';

let vueApp;
auth.onAuthStateChanged(() => {

	if (!vueApp) {
		vueApp = createApp(App);

		vueApp.use(store);
		vueApp.use(router);
		vueApp.use(VeeValidatePlugin);

		vueApp.mount('#app');
	}
});
