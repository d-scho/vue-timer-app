<script setup lang="ts">
import { ref } from 'vue';

import getDayOfYear from '../methods/getDayOfYear';
import getCountingNumberSuffix from '../methods/getCountingNumberSuffix';

const dayOfYear = ref(getDayOfYear());
</script>

<template>
	<div>{{ dayOfYear }}<sup>{{ getCountingNumberSuffix(dayOfYear) }}</sup> day of the year</div>
</template>