<script setup lang="ts">
import { ref } from 'vue';
import { getStoredNotes, setStoredNotes } from '@/methods/localStorageHandling';
import { useLabels } from '@/composables/useLabels';

const { Labels } = useLabels();
const notes = ref(getStoredNotes());
</script>

<template>
	<textarea
		rows="20"
		:placeholder="Labels.NOTES_EDITOR_PLACEHOLDER"
		v-model="notes"
		@focusout="setStoredNotes(notes)"
	></textarea>
</template>