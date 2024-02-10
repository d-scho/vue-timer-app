<script setup lang="ts">
import GenericButton from '../generics/GenericButton.vue';
import { useNotesToggle } from '@/composables/useNotesToggle';
import { useLabels } from '@/composables/useLabels';

const { toggleShowNotes, isShowNotes } = useNotesToggle();
const { Labels } = useLabels();
</script>

<template>
	<GenericButton @click="toggleShowNotes">{{ isShowNotes ? Labels.HIDE_NOTES : Labels.SHOW_NOTES }}</GenericButton>
</template>

<style scoped lang="scss">
button {
	height: 30px;
	width: 100px;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
	color: var(--primary-color);
	background-color: var(--secondary-color);
}
</style>