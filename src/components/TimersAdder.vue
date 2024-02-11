<script setup lang="ts">
import GenericButton from '@/components/generics/GenericButton.vue';
import { useLabels } from '@/composables/useLabels';
import { useTimers } from '@/composables/useTimers';

const { Labels } = useLabels();
const { addTimer } = useTimers();
</script>

<template>
    <GenericButton @click="addTimer">
        <svg
            height="21"
            width="21"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M896 384l-256 0 0-256c0-70.4-57.6-128-128-128s-128 57.6-128 128l0 256-256 0c-70.4 0-128 57.6-128 128s57.6 128 128 128l256 0 0 256c0 70.4 57.6 128 128 128s128-57.6 128-128l0-256 256 0c70.4 0 128-57.6 128-128s-57.6-128-128-128z"
            />
        </svg>
    </GenericButton>
</template>

<style scoped lang="scss">
svg {
    fill: var(--text-color);
}
</style>
