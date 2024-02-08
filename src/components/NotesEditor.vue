<script setup lang="ts">
import { ref } from 'vue';
import { getStoredNotes, setStoredNotes } from '../methods/localStorageHandling';

const notes = ref(getStoredNotes());
</script>

<template>
	<textarea
		rows="20"
		placeholder="Make your notes here."
		v-model="notes"
		@focusout="setStoredNotes(notes)"
	></textarea>
</template>