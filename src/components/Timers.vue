<script setup lang="ts">
import { ref, computed } from 'vue';
import { type Timer } from '../types/Timer';

import convertMillisecondsToReadableFormat from '../methods/convertMillisecondsToReadableFormat';
import { getStoredTimers, setStoredTimers } from '../methods/localStorageHandling';

const numberOfTimersWanted = 5;  // quickly set the number of timers wanted here - careful: if you select fewer than there were before, data might be lost
const timers = ref<Timer[]>([]);
const timerSum = computed(() => {
    let sum = 0;
    timers.value.forEach(timer => {
      sum += timer.value;
    });
    return convertMillisecondsToReadableFormat(sum);
});

// create timer instances based on number of timer wanted
const storedTimers = getStoredTimers();
for (let i = 1; i <= numberOfTimersWanted; i++) {
    const storedTimer = storedTimers.find(timerDTO => timerDTO.id === i);
    timers.value.push({
        id: i,
        name: storedTimer?.name ?? '',
        value: storedTimer?.value ?? 0,
        display: storedTimer?.value ? convertMillisecondsToReadableFormat(storedTimer.value) : '00:00:00',
        nameChangeDisabled: false,
        inputReadOnly: storedTimer?.name && storedTimer.name.length > 0 ? true : false,
        startTimerDisabled: false,
        stopTimerDisabled: true,
        resetTimerDisabled: storedTimer?.value && storedTimer.value !== 0 ? false : true,
    });
}

// template ref
const timerRefs = ref<Array<HTMLElement>|null>(null);

function startTimer(timer: Timer) {
    timer.value += 1; // instantly add one one millisecond to trigger depending renderers
    timer.startTimerDisabled = true;
    timer.stopTimerDisabled = false;
    timer.resetTimerDisabled = false;
    let storedTime = timer.value;
    let startingTime = Number(new Date());
    timer.interval = setInterval(() => {
        timer.value = Number(new Date()) - startingTime + storedTime;
        timer.display = convertMillisecondsToReadableFormat(timer.value);
        setStoredTimers(timers.value.map(timer => ({ id: timer.id, name: timer.name, value: timer.value })));
    }, 500);
};

function stopTimer(timer: Timer) {
    timer.startTimerDisabled = false;
    timer.stopTimerDisabled = true;
    clearInterval(timer.interval);
    timer.interval = undefined;
    setStoredTimers(timers.value.map(timer => ({ id: timer.id, name: timer.name, value: timer.value })));
};

function resetTimer(timer: Timer) {
    timer.startTimerDisabled = false;
    timer.stopTimerDisabled = true;
    timer.resetTimerDisabled = true;
    clearInterval(timer.interval);
    timer.interval = undefined; // TODO: is this needed? all cases
    timer.value = 0;
    timer.display = convertMillisecondsToReadableFormat(timer.value);
    setStoredTimers(timers.value.map(timer => ({ id: timer.id, name: timer.name, value: timer.value })));
};

function makeNameEditable(timer: Timer) {
    timer.inputReadOnly = false;
    // TODO: In any cases that try to find the element like this, try to pass the element to the method instead
    if (timerRefs.value) (timerRefs.value as HTMLElement[]).find(el => el.id === String(timer.id))?.focus();
    timer.nameChangeDisabled = true;
};

function confirmNameChange(timer: Timer) {
    if (timer.name.length > 0) timer.inputReadOnly = true;
    timer.nameChangeDisabled = false;
    if (timerRefs.value) (timerRefs.value as HTMLElement[]).find(el => el.id === String(timer.id))?.blur();
    setStoredTimers(timers.value.map(timer => ({ id: timer.id, name: timer.name, value: timer.value })));
};

function resetName(timer: Timer) {
    timer.name  = '';
    timer.nameChangeDisabled = false;
    timer.inputReadOnly = false;
    setStoredTimers(timers.value.map(timer => ({ id: timer.id, name: timer.name, value: timer.value })));
};
</script>

<template>
	<div class="timers">
		<div v-for="timer in timers" class="wrapper">
			<button class="edit-name" @click="makeNameEditable(timer)" :disabled="timer.nameChangeDisabled">Edit name</button>
			<button class="reset-name" @click="resetName(timer)" :disabled="timer.name.length === 0">Reset name</button>
			<input
				class="text"
				type="text"
				ref="timerRefs"
				:id="String(timer.id)"
				v-model.lazy="timer.name"
				@keydown.enter="confirmNameChange(timer)"
				@focusout="confirmNameChange(timer)"
				:readonly="timer.inputReadOnly"
				placeholder="Issue / topic"
			>
			<button
                class="timer-control"
                @click="startTimer(timer)"
                :disabled="timer.startTimerDisabled"
            >
                {{ timer.value > 0 ? 'Resume timer' : 'Start timer' }}
            </button>
			<button class="timer-control" @click="stopTimer(timer)" :disabled="timer.stopTimerDisabled">Stop timer</button>
			<button class="timer-control-reset" @click="resetTimer(timer)" :disabled="timer.resetTimerDisabled">Reset timer</button>
			<span>{{ timer.display }}</span>
		</div>
		<div class="wrapper flex-end-1250-center">
			<span>{{ timerSum }}</span>
		</div>
	</div>
</template>