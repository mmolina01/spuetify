<template>
<!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-component :add-song="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
				v-for="(song, idx) in songs"
				:key="song.id" :song="song"
				:update-song="updateSong"
				:idx="idx"
				:remove-song="removeSong"
				:update-unsaved-flag="updateUnsavedFlag"
			/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UploadComponent from '@/components/UploadComponent.vue';
import { songsCollections, auth } from '@/includes/firebase';
import CompositionItem from '@/components/CompositionItem.vue';
// import store from '@/store/index';

export default {
	name: 'manageView',
	components: { UploadComponent, CompositionItem },
	data() {
		return {
			songs: [],
			unsavedFlag: false
		};
	},
	async created() {
		const snapshot = await songsCollections.where('uid', '==', auth.currentUser.uid ).get();

		snapshot.forEach(this.addSong);
	},
	methods: {
		updateSong(i, values) {
			this.songs[i].modified_name = values.modified_name;
			this.songs[i].genre = values.genre;
		},
		removeSong(idx) {
			this.songs.splice(idx, 1);
		},
		addSong(document) {

			const song = {
				...document.data(),
				docId: document.id
			};

			this.songs.push(song);
		},
		updateUnsavedFlag(value) {
			this.unsavedFlag = value;
		}
	},
	beforeRouteLeave(to, from, next) {

		if (!this.unsavedFlag) {
			next();
		} else {
			const leave = confirm('Leave?');
			next(leave)
		}
	}
}
</script>