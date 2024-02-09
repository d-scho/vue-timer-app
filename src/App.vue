<script setup lang="ts">
import { useDarkmode } from '@/composables/useDarkmode';
import NotesEditor from './components/NotesEditor.vue';
import DarkmodeToggle from './components/DarkmodeToggle.vue';
import DayOfYearDisplay from './components/DayOfYearDisplay.vue';
import CalendarWeekDisplay from './components/CalendarWeekDisplay.vue';
import Timers from './components/Timers.vue';

const { isDarkmodeEnabled } = useDarkmode();
</script>

<template>
    <div :class="{ darkmode: isDarkmodeEnabled }" class="wrapping-wrapper">
        <Timers />
        <div class="add">
            <NotesEditor />
            <div class="info-bar">
                <div class="day-and-cw-info">
                    <DayOfYearDisplay />
                    <CalendarWeekDisplay />
                </div>
                <DarkmodeToggle />
            </div>
        </div>
    </div>
</template>