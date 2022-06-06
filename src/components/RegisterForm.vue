<template>
<div>
	<div class="text-white text-center font-bold p-4 mb-4" v-if="reg_show_alert" :class="reg_alert_variant">
		{{ reg_alert_message }}
	</div>

	<vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
		<!-- Name -->
		<div class="mb-3">
			<label for="name" class="inline-block mb-2">Name</label>
			<vee-field name="name" type="text"
			class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
			placeholder="Enter Name" />
			<ErrorMessage class="text-red-600" name="name"></ErrorMessage>
		</div>
		<!-- Email -->
		<div class="mb-3">
			<label for="email" name="email" class="inline-block mb-2">Email</label>
			<vee-field name="email" type="email"
			class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
			placeholder="Enter Email" />
			<ErrorMessage class="text-red-600" name="email"></ErrorMessage>
		</div>
		<!-- Age -->
		<div class="mb-3">
			<label for="age" class="inline-block mb-2">Age</label>
			<vee-field name="age" type="number"
			class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded" />
			<ErrorMessage class="text-red-600" name="age"></ErrorMessage>
		</div>
		<!-- Password -->
		<div class="mb-3">
			<label for="password" class="inline-block mb-2">Password</label>
			<vee-field name="password" :bails="false" v-slot="{ field, errors }">
				<input
				v-bind="field"
				type="password"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Password"/>
				<div class="text-red-600" v-for="error in errors" :key="error">
					{{error}}
				</div>
			</vee-field>
			<!--<ErrorMessage class="text-red-600" name="password"></ErrorMessage>-->
		</div>
		<!-- Confirm Password -->
		<div class="mb-3">
			<label for="confirm_password" class="inline-block mb-2">
				Confirm Password
			</label>
			<vee-field
				name="confirm_password"
				type="password"
				placeholder="Confirm Password"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
					duration-500 focus:outline-none focus:border-black rounded"
			/>
			<ErrorMessage class="text-red-600" name="confirm_password"></ErrorMessage>
		</div>
		<!-- Country -->
		<div class="mb-3">
			<label for="country" class="inline-block mb-2">Country</label>
			<vee-field as="select"
				name="country"
			class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded">
			<option selected disabled value="select">--Select--</option>
			<option value="USA">USA</option>
			<option value="Mexico">Mexico</option>
			<option value="Germany">Germany</option>
			</vee-field>
			<ErrorMessage class="text-red-600" name="country"></ErrorMessage>
		</div>
		<!-- TOS -->
		<div class="mb-3 pl-6">
			<vee-field name="tos" type="checkbox" value="1" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
			<label for="tos" class="inline-block">Accept terms of service</label>
			<ErrorMessage class="text-red-600" name="tos"></ErrorMessage>
		</div>
		<button type="submit"
			class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
			hover:bg-purple-700" :disabled="reg_in_submission">
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
			schema: {
                name: 'required|min:3|max:100|alpha_spaces',
                email: 'required|min:5|max:100|email',
                age: 'required|min_value:18|max_value:120',
                password: 'required|min:6|max:20',
                confirm_password: 'confirmed_missmatch:@password',
                country: 'required|not_one_of:select',
                tos: 'tos_required'
            },
            userData: {
                country: 'select'
            },
            reg_in_submission: false,
            reg_show_alert: false,
            reg_alert_variant: 'bg-blue-500',
            reg_alert_message: 'Please wait, your request is in progress',
		};
	},
	methods: {
		...mapActions(['register']),
		async register(values) {
            if (!this.reg_in_submission) {
              this.reg_in_submission = true;
              this.reg_show_alert = true;
              this.reg_alert_variant = 'bg-blue-500';
              this.reg_alert_message = 'Please wait! your account is being created.'

			  try {
				await this.register(values);
			  } catch(error) {
				  this.reg_in_submission = false;
				  this.reg_alert_variant = 'bg-red-500';
				  this.reg_alert_message = 'Error! try later.';
				  return;
			  }

              this.reg_alert_variant = 'bg-green-500';
              this.reg_alert_message = 'Success! your account was created';
			  window.location.reload();
            }
        },
	}
};

</script>