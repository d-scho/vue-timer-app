<script setup lang="ts">
import { ref } from 'vue'
import { useLabels } from '@/composables/useLabels'
import { useWidth } from '@/composables/useWidth'
import getCalendarWeek from '@/methods/getCalendarWeek'

const { Labels } = useLabels()
const calendarWeek = ref(getCalendarWeek())
const { pruneLabels } = useWidth()
</script>

<template>
    <div>
        {{
            pruneLabels
                ? Labels.CURRENT_CALENDAR_WEEK_SHORT
                : Labels.CURRENT_CALENDAR_WEEK
        }}: {{ calendarWeek }}
    </div>
</template>

<style scoped lang="scss">
div {
    color: var(--text-color);
}
</style>
