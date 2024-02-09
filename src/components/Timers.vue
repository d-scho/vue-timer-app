<script setup lang="ts">
import { ref, computed } from 'vue';
import { type Timer } from '@/types/Timer';

import { useLabels } from '@/composables/useLabels';

import convertMillisecondsToReadableFormat from '@/methods/convertMillisecondsToReadableFormat';
import { getStoredTimers, setStoredTimers } from '@/methods/localStorageHandling';

const { Labels } = useLabels();

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
        display:
            storedTimer?.value
                ? convertMillisecondsToReadableFormat(storedTimer.value)
                : convertMillisecondsToReadableFormat(0),
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
    timer.interval = undefined;
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
		<div v-for="timer in timers" class="timers-wrapper">
			<button
                class="edit-name"
                @click="makeNameEditable(timer)"
                :disabled="timer.nameChangeDisabled"
            >
                {{ Labels.EDIT_NAME }}
            </button>

			<button
                class="reset-name"
                @click="resetName(timer)"
                :disabled="timer.name.
                length === 0"
            >
                {{ Labels.RESET_NAME }}
            </button>

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
                {{ timer.value > 0 ? Labels.RESUME_TIMER : Labels.START_TIMER }}
            </button>

			<button
                class="timer-control"
                @click="stopTimer(timer)"
                :disabled="timer.stopTimerDisabled"
            >
                {{ Labels.STOP_TIMER }}
            </button>

			<button
                class="timer-control-reset"
                @click="resetTimer(timer)"
                :disabled="timer.resetTimerDisabled"
            >
                {{ Labels.RESET_TIMER }}
            </button>

			<span>{{ timer.display }}</span>

		</div>
		<div class="wrapper flex-end-1250-center">
			<span>{{ timerSum }}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.timers-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 15px;
    padding: 10px 15px;
    border: 1px solid rgb(158, 158, 158);
    border-radius: 10px;
    background-color: rgba(120, 120, 120, 0.1);
}
.timers {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

input.text {
	height: 34px;
	padding-inline: 10px;
	border-radius: 5px;
	min-width: 150px;
	font-weight: bold;
	color: black;
	background-color: white;
    flex-grow: 1;

    &:read-only {
        color: rgba(0, 0, 0, 0.7);
        background-color: rgba(230, 230, 230, 0.7);
        cursor: not-allowed;
    }
}

button {
	height: 40px;
	width: 100px;
	padding-inline: 20px;
	border-radius: 5px;
	cursor: pointer;
	border-radius: 5px;
	font-weight: bold;
	user-select: none;
	color: var(--button_color);
	background-color: var(--button_bg-color);

    &:disabled {
        cursor: not-allowed;
        color: rgba(114, 114, 114, 0.5);
        background-color: rgb(252, 252, 252);
    }

    &.edit-name {
        border-color:rgb(15, 92, 0);
	    box-shadow: 0px 2px 1px 0 rgb(26, 155, 0);

        &:disabled {
            border-color:rgb(15, 92, 0, 0.3);
	        box-shadow: 0px 2px 1px 0 rgb(26, 155, 0, 0.3);
        }
    }

    &.reset-name,
    &.timer-control-reset {
        border-color:rgb(131, 0, 0);
	    box-shadow: 0px 2px 1px 0 rgb(233, 0, 0);

        &:disabled {
            border-color:rgb(131, 0, 0, 0.3);
	        box-shadow: 0px 2px 1px 0 rgb(233, 0, 0, 0.3);
        }
    }

    &.timer-control {
        border-color:rgb(23, 96, 255);
	    box-shadow: 0px 2px 1px 0 rgb(23, 201, 255);

        &:disabled {
            border-color: rgba(23, 96, 255, 0.3);
	        box-shadow: 0px 2px 1px 0 rgba(23, 201, 255, 0.3);
        }
    }
}

span {
	font-size: 20px;
	font-weight: bold;
	border: 2px solid black;
	padding: 6px 12px;
	border-radius: 5px;
	background-color: white;
}
</style>