<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import NotesEditor from '@/components/NotesEditor.vue';
import Timers from '@/components/Timers.vue';
</script>

<template>
    <TheHeader />
    <div class="wrapper" >
        <Timers />
        <NotesEditor />
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: 1rem 6rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: calc(var(--header-height) + 2rem);
}
</style>