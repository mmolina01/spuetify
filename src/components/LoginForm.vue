<template>
<div>
	<div class="text-white text-center font-bold p-4 mb-4" v-if="login_show_alert" :class="login_alert_variant">
		{{ login_alert_message }}
	</div>

	<vee-form :validation-schema="loginSchema" @submit="loginUser">
		<!-- Email -->
		<div class="mb-3">
			<label for="email" class="inline-block mb-2">Email</label>
			<vee-field name="email" type="email"
			class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
			placeholder="Enter Email" />
			<ErrorMessage class="text-red-600" name="email"></ErrorMessage>
		</div>
		<!-- Password -->
		<div class="mb-3">
			<label for="password" class="inline-block mb-2">Password</label>
			<vee-field name="password" type="password"
			class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
			placeholder="Password" />
			<ErrorMessage class="text-red-600" name="password"></ErrorMessage>
		</div>
		<!-- Submit button -->
		<button type="submit"
			:disabled="login_in_submission"
			class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
			hover:bg-purple-700">
			Submit
		</button>
	</vee-form>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			loginSchema: {
				email: 'required|email',
				password: 'required'
			},
			login_in_submission: false,
            login_show_alert: false,
            login_alert_variant: 'bg-blue-500',
            login_alert_message: 'Please wait, we are loging you in.',
		};
	},
	methods: {
		...mapActions(['login']),
		async loginUser(values) {
			if (!this.login_in_submission) {
				this.login_in_submission = true;
				this.login_show_alert = true;
				this.login_alert_variant = 'bg-blue-500';
				this.login_alert_message = 'Please wait, we are loging you in.'

				try {
					await this.login(values);
				} catch (e) {
					his.login_alert_variant = 'bg-red-500';
					this.login_alert_message = 'Invalid login'
					return;
				}

				this.login_alert_variant = 'bg-green-500';
				this.login_alert_message = 'Success! loged in';
				window.location.reload();
			}
		}
	}
};
</script>