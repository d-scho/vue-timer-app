<script setup lang="ts">
import { ref } from 'vue';
import { type Timer } from '@/types/Timer';

import { useLabels } from '@/composables/useLabels';
import { useTimerSum } from '@/composables/useTimerSum';

import convertMillisecondsToReadableFormat from '@/methods/convertMillisecondsToReadableFormat';
import { buildTimers, createNewTimer } from '@/methods/timerCreation';
import { setStoredTimers } from '@/methods/localStorageHandling';

const { Labels } = useLabels();

const timers = buildTimers();
const { declareTimers } = useTimerSum();
declareTimers(timers);

// template ref
const timerRefs = ref<Array<HTMLElement>|null>(null);

function addTimer() {
    timers.value.push(createNewTimer());
    setStoredTimers(timers.value);
}

function removeTimer(timer: Timer) {
    const index = timers.value.indexOf(timer);
    if (index !== -1) {
        timers.value.splice(index, 1);
        setStoredTimers(timers.value);
    }
}

function startTimer(timer: Timer) {
    timer.value += 1; // instantly add one one millisecond to trigger depending renderers, will be overwritten by correct value once interval triggers
    timer.startTimerDisabled = true;
    timer.stopTimerDisabled = false;
    timer.resetTimerDisabled = false;
    let storedValue = timer.value;
    let startingTime = Number(new Date());
    timer.interval = setInterval(() => {
        timer.value = Number(new Date()) - startingTime + storedValue;
        timer.display = convertMillisecondsToReadableFormat(timer.value);
        setStoredTimers(timers.value);
    }, 250);
};

function stopTimer(timer: Timer) {
    timer.startTimerDisabled = false;
    timer.stopTimerDisabled = true;
    clearInterval(timer.interval);
    timer.interval = undefined;
    setStoredTimers(timers.value);
};

function resetTimer(timer: Timer) {
    timer.startTimerDisabled = false;
    timer.stopTimerDisabled = true;
    timer.resetTimerDisabled = true;
    clearInterval(timer.interval);
    timer.interval = undefined;
    timer.value = 0;
    timer.display = convertMillisecondsToReadableFormat(timer.value);
    setStoredTimers(timers.value);
};

function confirmNameChange(timer: Timer) {
    if (timerRefs.value) (timerRefs.value as HTMLElement[]).find(el => el.id === String(timer.id))?.blur();
    setStoredTimers(timers.value);
};

function resetName(timer: Timer) {
    timer.name  = '';
    setStoredTimers(timers.value);
};
</script>

<template>
	<div class="timers">
		<div v-for="timer in timers" class="timer-row">
			<div class="timer">
                <div class="timer-name-wrapper">
                    <input
                        class="timer-name"
                        type="text"
                        ref="timerRefs"
                        :id="String(timer.id)"
                        v-model.lazy="timer.name"
                        @keydown.enter="confirmNameChange(timer)"
                        @focusout="confirmNameChange(timer)"
                        placeholder="Issue / topic"
                    >
                    <button
                        v-if="timer.name.length > 0"
                        class="timer-reset-name"
                        @click="resetName(timer)"
                        :disabled="timer.name.length === 0"
                    >
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
                            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
                                c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
                                c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
                                c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
                                l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
                                c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
                        </svg>
                    </button>
                </div>
                <button
                    class="btn timer-control"
                    @click="startTimer(timer)"
                    :disabled="timer.startTimerDisabled"
                >
                    {{ timer.value > 0 ? Labels.RESUME_TIMER : Labels.START_TIMER }}
                </button>
                <button
                    class="btn timer-control"
                    @click="stopTimer(timer)"
                    :disabled="timer.stopTimerDisabled"
                >
                    {{ Labels.STOP_TIMER }}
                </button>
                <button
                    class="btn timer-control-reset"
                    @click="resetTimer(timer)"
                    :disabled="timer.resetTimerDisabled"
                >
                    {{ Labels.RESET_TIMER }}
                </button>
                <span>{{ timer.display }}</span>
            </div>
            <div @click="removeTimer(timer)">
                remove timer
            </div>
        </div>
        <div @click="addTimer">add timer</div>
	</div>
</template>

<style scoped lang="scss">
.timers {
	display: flex;
	flex-direction: column;
	gap: .8rem;

    .timer-row {
        display: flex;
        align-items: center;
        gap: .8rem;

        .timer {
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
            gap: .8rem;
            padding: .8rem;
            border: 1px solid rgb(158, 158, 158);
            border-radius: 10px;
            background-color: rgba(120, 120, 120, 0.1);
            flex: 1;

            .timer-name-wrapper {
                position: relative;
                flex: 1;

                input.timer-name {
                    height: 40px;
                    padding-inline: 10px;
                    border-radius: 5px;
                    min-width: 150px;
                    width: 100%;
                    font-weight: bold;
                    color: var(--primary-color);
                    background-color: var(--secondary-color);
                    flex-grow: 1;
                }

                button.timer-reset-name {
                    cursor: pointer;
                    height: calc(100% - 16px);
                    width: 24px;
                    margin: 8px;
                    position: absolute;
                    top: -1px;
                    right: 0;
                    border: 1px solid rgb(131, 0, 0);
                    box-shadow: 0px 2px 1px 0 rgb(233, 0, 0);
                    border-radius: 5px;
                    background-color: var(--secondary-color);

                    & > svg {
                        height: 14px;
                        width: 14px;
                        display: block;
                        margin: 0 auto;
                        fill: var(--primary-color);;;
                    }
                }
            }

            button.btn {
                margin-bottom: 1px; // slighty crank position because of shadows
                height: 40px;
                width: 100px;
                padding-inline: 20px;
                border-radius: 5px;
                font-weight: bold;
                user-select: none;
                color: var(--primary-color);
                background-color: var(--secondary-color);
                cursor: pointer;

                &:disabled {
                    cursor: not-allowed;
                    color: var(--button_disabled-color);
                    background-color: var(--button_disabled-bg-color);
                }

                &.timer-control {
                    border-color:rgb(23, 96, 255);
                    box-shadow: 0px 2px 1px 0 rgb(23, 201, 255);

                    &:disabled {
                        border-color: rgba(23, 96, 255, 0.3);
                        box-shadow: 0px 2px 1px 0 rgba(23, 201, 255, 0.3);
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
            }

            span {
                font-size: 20px;
                font-weight: bold;
                border: 2px solid black;
                padding: 6px 12px;
                border-radius: 5px;
                color: var(--primary-color);
                background-color: var(--secondary-color);
            }
        }
    }
}
</style>