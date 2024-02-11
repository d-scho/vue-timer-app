import type { Timer } from '@/types/Timer';
import { setStoredTimers } from '@/methods/localStorageHandling';
import convertMillisecondsToReadableFormat from '@/methods/convertMillisecondsToReadableFormat';
import generateRandomHexadecimalId from '@/methods/generateRandomHexadecimalId';
import { getStoredTimers } from '@/methods/localStorageHandling';
import { ref, computed } from 'vue';

function createNewTimer() {
    return {
        id: generateRandomHexadecimalId(),
        name: '',
        value: 0,
        display: convertMillisecondsToReadableFormat(0),
        isRunning: false,
        resetTimerDisabled: true,
    };
}

function buildTimers(): Array<Timer> {
    const storedTimers = getStoredTimers();
    const timers = storedTimers;

    if (timers.length === 0) {
        timers.push(createNewTimer());
        setStoredTimers(timers);
    }

    return timers;
}

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
    timer.isRunning = true;
    timer.resetTimerDisabled = false;
    let storedValue = timer.value;
    let startingTime = Number(new Date());
    timer.interval = setInterval(() => {
        timer.value = Number(new Date()) - startingTime + storedValue;
        timer.display = convertMillisecondsToReadableFormat(timer.value);
        setStoredTimers(timers.value);
    }, 250);
}

function stopTimer(timer: Timer) {
    timer.isRunning = false;
    clearInterval(timer.interval);
    timer.interval = undefined;
    setStoredTimers(timers.value);
}

function resetTimer(timer: Timer) {
    timer.isRunning = false;
    timer.resetTimerDisabled = true;
    clearInterval(timer.interval);
    timer.interval = undefined;
    timer.value = 0;
    timer.display = convertMillisecondsToReadableFormat(timer.value);
    setStoredTimers(timers.value);
}

function confirmNameChange(timerRefs: HTMLElement[] | null, timer: Timer) {
    if (timerRefs)
        (timerRefs as HTMLElement[])
            .find((el) => el.id === String(timer.id))
            ?.blur();
    setStoredTimers(timers.value);
}

function resetName(timer: Timer) {
    timer.name = '';
    setStoredTimers(timers.value);
}

const timers = ref(buildTimers());

const timerSum = computed(() => {
    let sum = 0;
    timers.value.forEach((timer) => {
        sum += timer.value;
    });
    return convertMillisecondsToReadableFormat(sum);
});

export function useTimers() {
    return {
        buildTimers,
        addTimer,
        removeTimer,
        startTimer,
        stopTimer,
        resetTimer,
        confirmNameChange,
        resetName,
        timers,
        timerSum,
    };
}
