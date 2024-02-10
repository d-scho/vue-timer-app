<script setup lang="ts">
import { useTimerSum } from '@/composables/useTimerSum';

const { timerSum } = useTimerSum();
</script>

<template>
	<span>Sum of timers: {{ timerSum }}</span>
</template>

<style scoped lang="scss">
span {
	color: var(--primary-color);
}
</style>