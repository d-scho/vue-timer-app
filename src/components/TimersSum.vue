<script setup lang="ts">
import { useTimers } from '@/composables/useTimers';

const { timerSum } = useTimers();
</script>

<template>
	<span>Sum of timers: {{ timerSum }}</span>
</template>

<style scoped lang="scss">
span {
	color: var(--text-color);
}
</style>