<script setup lang="ts">
const emit = defineEmits<{
    (e: 'click'): void;
}>();

withDefaults(
    defineProps<{
        width?: `${string}px`;
        height?: `${string}px`;
    }>(),
    {
        width: '50px',
        height: '40px',
    }
);
</script>

<template>
    <button @click="emit('click')"><slot></slot></button>
</template>

<style scoped lang="scss">
button {
    height: v-bind('height');
    width: v-bind('width');
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    color: var(--text-color);
    fill: var(--text-color);
    stroke: var(--text-color);
    background-color: var(--element-bg-color);
    border-color: var(--element-border-color);

    &:disabled {
        cursor: not-allowed;
        color: var(--text-color-disabled);
        fill: var(--text-color-disabled);
        stroke: var(--text-color-disabled);
        background-color: var(--element-bg-color-disabled);
        border-color: var(--element-bg-color-disabled);
    }
}
</style>
