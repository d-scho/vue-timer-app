import { ref, type Ref } from 'vue';
import generateRandomHexadecimalId from '@/methods/generateRandomHexadecimalId';
import convertMillisecondsToReadableFormat from '@/methods/convertMillisecondsToReadableFormat';
import type { Timer } from '@/types/Timer';
import { getStoredTimers, setStoredTimers } from './localStorageHandling';

export function createNewTimer() {
    return {
        id: generateRandomHexadecimalId(),
        name: '',
        value: 0,
        display: convertMillisecondsToReadableFormat(0),
        startTimerDisabled: false,
        stopTimerDisabled: true,
        resetTimerDisabled: true,
    };
}

export function buildTimers(): Ref<Array<Timer>> {
    const storedTimers = getStoredTimers();
    const timers = ref(storedTimers);

    if (timers.value.length === 0) {
        timers.value.push(createNewTimer());
        setStoredTimers(timers.value);
    }
    
    return timers;
}

