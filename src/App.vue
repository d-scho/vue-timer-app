<script setup lang="ts">
import TheHeader from '@/components/singletons/TheHeader.vue';
import NotesEditor from '@/components/NotesEditor.vue';
import Timers from '@/components/Timers.vue';
import { useNotesToggle } from '@/composables/useNotesToggle';

const { isShowNotes } = useNotesToggle();
</script>

<template>
    <TheHeader />
    <div class="wrapper" >
        <Timers />
        <NotesEditor v-show="isShowNotes" />
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: 1rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: calc(var(--header-height) + 2rem);
}
</style>