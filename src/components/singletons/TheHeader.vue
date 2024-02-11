<script setup lang="ts">
import DarkmodeToggle from '@/components/DarkmodeToggle.vue';
import NotesToggle from '@/components/NotesToggle.vue';
</script>

<template>
    <header>
        <div>ManyATimer</div>
        <div>
            <NotesToggle />
            theme selector
            <DarkmodeToggle />
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2px;
    box-shadow: 0px 0px 5px gray;
    padding: 1rem 6rem;
    position: fixed;
    width: 100%;
    height: var(--header-height);
    background-color: var(--bg-color-header);
    z-index: 200;
    min-width: 828px;

    & > * {
        display: flex;
        place-items: center;
        gap: 1rem;
        color: var(--text-color);
        flex-shrink: 0;
    }
}
</style>
