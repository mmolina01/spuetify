import { createStore } from 'vuex';
import { auth, userCollections } from '@/includes/firebase';

const store = createStore({
	state: {
		authModalShow: false,
		userLoggedIn: false,
	},

	mutations: {

		toggleAuthModalShow: (state) => {
			state.authModalShow = !state.authModalShow;
		},
		toggleAuth: (state) => {
			state.userLoggedIn = !state.userLoggedIn;
		},
	},

	getters: {
		/*getAuthModalShow: (state) => {
			return state.authModalShow;
		}*/
	},

	actions: {
		async register({ commit }, payload) {

			const userCred = await auth.createUserWithEmailAndPassword(
				payload.email,
				payload.password
			);

			await userCollections.doc(userCred.user.uid).set({
				name: payload.name,
				email: payload.email,
				country: payload.country,
				age: payload.age,

			});

			await userCred.user.updateProfile({
				displayName: payload.name,
			});

			commit('toggleAuth');
		},
		init_login({ commit }) {
			const user = auth.currentUser;

			if (user) {
				commit('toggleAuth');
			}
		},
		async login({ commit }, payload) {
			await auth.signInWithEmailAndPassword(payload.email, payload.password);
			commit('toggleAuth');
			console.log('login')
		},
		async signOut({ commit }) {
			await auth.signOut();
			commit('toggleAuth');
		}
	}
});

export default store;