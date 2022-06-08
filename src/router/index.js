import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ManageView from '@/views/ManageView.vue';
import View404 from '@/views/404View.vue';
import store from '@/store';

const routes = [
	{
		name: 'home',
		path: '/',
		component: HomeView,
	},
	{
		name: 'manage',
		path: '/manage-music',
		component: ManageView,
		meta: {
			requiresAuth: true,
		},
		/* beforeEnter: (to, from, next) => {

			next();
		}, */
		// alias: '/manage',
	},
	{
		path: '/manage',
		redirect: { name: 'manage' },
	},
	{
		path: '/:catchAll(.*)*',
		component: View404
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
	if (!to.matched.some(match => match.meta.requiresAuth)) {
		next();
		return;
	}

	if (store.state.userLoggedIn) {
		next();
	} else {
		next({
			name: 'home',
		})
	}
});

export default router;
