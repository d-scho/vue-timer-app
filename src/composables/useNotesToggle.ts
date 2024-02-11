import { ref, nextTick } from 'vue';

const isShowNotes = ref(false);

async function toggleShowNotes() {
    isShowNotes.value = !isShowNotes.value;
    await nextTick();
}

export function useNotesToggle() {
    return {
        isShowNotes,
        toggleShowNotes,
    };
}
