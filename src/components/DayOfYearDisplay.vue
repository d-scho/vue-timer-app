<script setup lang="ts">
import { ref } from 'vue';
import { useLabels } from '@/composables/useLabels';
import getDayOfYear from '@/methods/getDayOfYear';
import getCountingNumberSuffix from '@/methods/getCountingNumberSuffix';

const { Labels } = useLabels();
const dayOfYear = ref(getDayOfYear());
</script>

<template>
	<div>{{ dayOfYear }}<sup>{{ getCountingNumberSuffix(dayOfYear) }}</sup> {{ Labels.DAY_OF_THE_YEAR.toLowerCase() }}</div>
</template>

<style scoped lang="scss">
div {
	color: var(--textarea_color);
}
</style>