<script setup lang="ts">
import { ref } from 'vue';

import getCalendarWeek from '../methods/getCalendarWeek';

const calendarWeek = ref(getCalendarWeek());
</script>

<template>
	<div>Current calendar week: {{ calendarWeek }}</div>
</template>