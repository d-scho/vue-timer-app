<script setup lang="ts">
import GenericButton from '@/components/generics/GenericButton.vue';
import { useLabels } from '@/composables/useLabels';
import { useTimers } from '@/composables/useTimers';

const { Labels } = useLabels();
const { addTimer } = useTimers();
</script>

<template>
    <GenericButton @click="addTimer" height="30px" width="100px">
        {{ Labels.ADD_TIMER }}
    </GenericButton>
</template>
