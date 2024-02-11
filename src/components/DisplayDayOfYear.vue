<script setup lang="ts">
import { ref } from 'vue';
import { useLabels } from '@/composables/useLabels';
import { useWidth } from '@/composables/useWidth';
import getDayOfYear from '@/methods/getDayOfYear';
import getCountingNumberSuffix from '@/methods/getCountingNumberSuffix';

const { Labels } = useLabels();
const dayOfYear = ref(getDayOfYear());
const { pruneLabels } = useWidth();
</script>

<template>
    <div>
        {{ dayOfYear }}<sup>{{ getCountingNumberSuffix(dayOfYear) }}</sup>
        {{
            pruneLabels
                ? Labels.DAY_OF_THE_YEAR_SHORT
                : Labels.DAY_OF_THE_YEAR.toLowerCase()
        }}
    </div>
</template>

<style scoped lang="scss">
div {
    color: var(--text-color);
}
</style>
