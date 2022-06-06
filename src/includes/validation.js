import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from 'vee-validate';
import { required, min, max, alpha_spaces, email, min_value, max_value, confirmed, not_one_of } from '@vee-validate/rules';

export default {
	install(app) {
		app.component('VeeForm', VeeForm);
		app.component('VeeField', VeeField);
		app.component('ErrorMessage', ErrorMessage);

		defineRule('required', required);
		defineRule('tos_required', required);
		defineRule('min', min);
		defineRule('max', max);
		defineRule('alpha_spaces', alpha_spaces);
		defineRule('email', email);
		defineRule('min_value', min_value);
		defineRule('max_value', max_value);
		defineRule('confirmed', confirmed);
		defineRule('confirmed_missmatch', confirmed);
		defineRule('not_one_of', not_one_of);

		configure({
			generateMessage: (context) => {
				const messages = {
					required: `The field ${context.field} is required.`,
					tos_required: 'You must accept the terms of services.',
					min: `The field ${context.field} is too short.`,
					max: `The field ${context.field} is too long.`,
					alpha_spaces: `The field ${context.field} may only contain alphabetic characters and spaces.`,
					email: `The field ${context.field} must be a valid email.`,
					min_value: `The value of ${context.field} is too low.`,
					max_value: `The value of ${context.field} is too high.`,
					confirmed: `The field ${context.field} must be confirmed.`,
					not_one_of: `You are not to use this value for the field ${context.field}.`,
					confirmed_missmatch: 'The passwords don\'t match.'
				};

				const message = messages[context.rule.name] ?
					messages[context.rule.name]
					: `The field ${context.field} is invalid`;

				return message;
			}
		})
	},
};