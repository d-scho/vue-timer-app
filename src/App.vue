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
    <div :class="{ 'darkmode': isDarkmodeEnabled }">
        <div class="wrapper" >
            <Timers />
            <NotesEditor />
            <DayOfYearDisplay />
            <CalendarWeekDisplay />
            <DarkmodeToggle />
        </div>
    </div>
</template>

<style lang="scss">
  .wrapper {
	padding: 10px;
    background-color: $wrapper_bg-color;
  }
</style>