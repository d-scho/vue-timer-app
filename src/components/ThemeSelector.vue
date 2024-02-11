<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
const { selectedTheme, Themes } = useTheme();
</script>

<template>
    <select v-model="selectedTheme">
        <option v-for="theme in Themes" :value="theme">
            {{ theme.charAt(0).toUpperCase() + theme.slice(1, theme.length) }}
        </option>
    </select>
</template>

<style scoped lang="scss">
select {
    height: 40px;
    color: var(--text-color);
    border: 2px solid var(--element-bg-color);
    background-color: var(--element-bg-color);
    border-radius: 5px;
    border-style: outset;
    cursor: pointer;
    font-weight: bold;
    padding-inline: 0.4rem 0.2rem;

    &:focus-visible {
        outline: none;
    }
}
</style>
