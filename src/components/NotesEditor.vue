<script setup lang="ts">
import { ref } from 'vue'
import { getStoredNotes, setStoredNotes } from '@/methods/localStorageHandling'
import { useLabels } from '@/composables/useLabels'

const { Labels } = useLabels()
const notes = ref(getStoredNotes())
</script>

<template>
    <Transition name="fade">
        <div class="notes-wrapper">
            <textarea
                rows="20"
                :placeholder="Labels.NOTES_EDITOR_PLACEHOLDER"
                v-model="notes"
                @focusout="setStoredNotes(notes)"
            ></textarea>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
.notes-wrapper {
    position: fixed;
    display: grid;
    place-items: center;
    background-color: var(--bg-color);
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    padding: calc(var(--header-height) + 2rem) 6rem 2rem;

    textarea {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        padding: 6px 10px;
        resize: none;
        color: var(--text-color);
        background-color: var(--element-bg-color);

        &::placeholder {
            color: var(--text-color-placeholder);
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 256ms ease-in-out;
}

.fade-enter-from {
    opacity: 0;
    transform: scale(50%) translate(-500px, 200px);
}
.fade-leave-to {
    opacity: 0;
    transform: scale(50%) translate(500px, 200px);
}
</style>
