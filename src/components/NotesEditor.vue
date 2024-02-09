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

<style scoped lang="scss">
  textarea {
	width: 100%;
	border-radius: 10px;
	padding: 6px 10px;
	resize: none;
	color: var(--textarea_color);
	background-color: var(--textarea_bg-color);

	&::placeholder {
		color: var(--textarea_placeholder-color);
	}
  }
</style>