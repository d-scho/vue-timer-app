<script setup lang="ts">
import ThemeSelector from '@/components/ThemeSelector.vue';
import NotesToggle from '@/components/NotesToggle.vue';
</script>

<template>
    <header>
        <div class="inner">
            <div><NotesToggle /></div>
            <div>
                <ThemeSelector />
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    box-shadow: 0px 0px 5px gray;
    padding: 1rem 6rem;
    z-index: 200;
    position: fixed;
    width: 100%;
    height: var(--header-height);
    background-color: var(--bg-color-header);
    display: flex;

    .inner {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        min-width: var(--min-width-content);
        width: 100%;

        & > * {
            display: flex;
            place-items: center;
            gap: 1rem;
            color: var(--text-color);
            flex-shrink: 0;
        }
    }
}
</style>
