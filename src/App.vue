<script setup lang="ts">
import { ref } from 'vue';

import NotesEditor from './components/NotesEditor.vue';
import DarkmodeToggle from './components/DarkmodeToggle.vue';
import DayOfYearDisplay from './components/DayOfYearDisplay.vue';
import CalendarWeekDisplay from './components/CalendarWeekDisplay.vue';
import Timers from './components/Timers.vue';

import { getStoredIsDarkmodeEnabled } from './methods/localStorageHandling';

const isDarkmodeEnabled = ref(getStoredIsDarkmodeEnabled());
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
                <DarkmodeToggle v-model="isDarkmodeEnabled" />
            </div>
        </div>
    </div>
</template>