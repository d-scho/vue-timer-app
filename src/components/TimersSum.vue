<script setup lang="ts">
import { useTimers } from '@/composables/useTimers';
import { useWidth } from '@/composables/useWidth';
import { useLabels } from '@/composables/useLabels';

const { timerSum } = useTimers();
const { pruneLabels } = useWidth();
const { Labels } = useLabels();
</script>

<template>
	<span>{{
		pruneLabels
			? Labels.SUM_OF_TIMERS_SHORT
			: Labels.SUM_OF_TIMERS
	}}: {{timerSum }}</span>
</template>

<style scoped lang="scss">
span {
	color: var(--text-color);
}
</style>