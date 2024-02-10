import { ref } from 'vue';

const isShowNotes = ref(false);

function toggleShowNotes() {
	isShowNotes.value = !isShowNotes.value;
}

export function useNotesToggle() {
	return {
		isShowNotes,
		toggleShowNotes,
	}
}