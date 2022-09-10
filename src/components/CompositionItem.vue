<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
		<div v-show="!showForm">
			<h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
			<button
				class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
				@click.prevent="deleteSong"
			>
				<i class="fa fa-times"></i>
			</button>
			<button
				class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
				@click.prevent="showForm = !showForm"
			>
				<i class="fa fa-pencil-alt"></i>
			</button>
		</div>
		<div class="tex-white text-center font-bold p-4 mb-4" :class="alertVariant" v-if="showAlert">
			{{ alertMessage }}
		</div>
		<div v-show="showForm">
			<vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
				<div class="mb-3">
				<label class="inline-block mb-2">Song Title</label>
				<vee-field
					name="modified_name"
					type="text"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
					transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Enter Song Title"
					@input="updateUnsavedFlag(true)"
				/>
				<ErrorMessage class="text-red-600" name="modified_name" />
				</div>
				<div class="mb-3">
				<label class="inline-block mb-2">Genre</label>
				<vee-field
					name="genre"
					type="text"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
					transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Enter Genre"
					@input="updateUnsavedFlag(true)"
				/>
				<ErrorMessage class="text-red-600" name="genre" />
				</div>
				<button
					type="submit"
					class="py-1.5 px-3 rounded text-white bg-green-600"
					:disabled="inSubmission"
				>
					Submit
				</button>
				<button
					type="button"
					class="py-1.5 px-3 rounded text-white bg-gray-600"
					:disabled="inSubmission"
					@click.prevent="showForm = false; showAlert = false;"
				>
					Go Back
				</button>
			</vee-form>
		</div>
	</div>
</template>

<script>
import { songsCollections, storage } from '@/includes/firebase';

export default {
	name: 'CompositionItem',
	props: {
		song: { type: Object, required: true },
		updateSong: { type: Function, required: true },
		idx: { type: Number, required: true },
		removeSong: { type: Function, required: true },
		updateUnsavedFlag: { type: Function }
	},
	data() {
		return {
			showForm: false,
			schema: {
				modified_name: 'required',
				genre: 'alpha_spaces'
			},
			inSubmission: false,
			showAlert: false,
			alertVariant: 'bg-blue-500',
			alertMessage: 'Please wait updating song'

		};
	},
	methods: {
		async edit(values) {
			this.inSubmission = true;
			this.showAlert = true;
			this.alertVariant = 'bg-blue-500';
			this.alertMessage = 'Please wait updating song';

			try {
				await songsCollections.doc(this.song.docId).update(values);
			} catch(e) {
				this.alertVariant = 'bg-red-500';
				this.alertMessage = 'Error';
				this.inSubmission = false;
				this.showAlert = false;
				return;
			}

			this.alertVariant = 'bg-green-500';
			this.alertMessage = 'Success';
			this.inSubmission = false;
			this.updateSong(this.idx, values);
			this.updateUnsavedFlag(false);
		},
		async deleteSong() {
			const storageRef = storage.ref();
			const songRef = storageRef.child(`songs/songs/${this.song.original_name}`);

			try {
				await songRef.delete();
				await songsCollections.doc(this.song.docId).delete();
			} catch(e) {

			}

			this.removeSong(this.idx);
		}
	}
};
</script>

<style>

</style>