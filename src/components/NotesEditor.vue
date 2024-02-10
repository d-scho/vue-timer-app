<script setup lang="ts">
import { ref } from 'vue';
import { getStoredNotes, setStoredNotes } from '@/methods/localStorageHandling';
import { useLabels } from '@/composables/useLabels';

const { Labels } = useLabels();
const notes = ref(getStoredNotes());
</script>

<template>
	<div class="notes-wrapper">
		<textarea
			rows="20"
			:placeholder="Labels.NOTES_EDITOR_PLACEHOLDER"
			v-model="notes"
			@focusout="setStoredNotes(notes)"
		></textarea>
	</div>
</template>

<style scoped lang="scss">
.notes-wrapper {
	position: absolute;
	display: grid;
	place-items: center;
	background-color: var(--quarternary-color);
	inset: 0;
	z-index: 100;
	padding: calc(var(--header-height) + 2rem) 6rem 2rem;
	transition: all 256ms ease-in-out;

	textarea {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		padding: 6px 10px;
		resize: none;
		color: var(--primary-color);
		background-color: var(--secondary-color);

		&::placeholder {
			color: var(--tertiary-color);
		}
	}
}
</style>