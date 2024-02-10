<script setup lang="ts">
import { ref } from 'vue';
import { useLabels } from '@/composables/useLabels';
import getCalendarWeek from '@/methods/getCalendarWeek';

const { Labels } = useLabels();
const calendarWeek = ref(getCalendarWeek());
</script>

<template>
	<div>{{ Labels.CURRENT_CALENDAR_WEEK }}: {{ calendarWeek }}</div>
</template>

<style scoped lang="scss">
div {
	color: var(--text-color);
}
</style>