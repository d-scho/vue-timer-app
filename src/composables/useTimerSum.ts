import { type Ref, ref, computed } from 'vue';
import convertMillisecondsToReadableFormat from '@/methods/convertMillisecondsToReadableFormat';
import { type Timer } from '@/types/Timer';

const timers = ref<Array<Timer>>([]);

function declareTimers(timersRef: Ref<Array<Timer>>) {
	timers.value = timersRef.value;
}

const timerSum = computed(() => {
    let sum = 0;
    timers.value.forEach(timer => {
      sum += timer.value;
    });
    return convertMillisecondsToReadableFormat(sum);
});

export function useTimerSum() {
	return {
		timerSum,
		declareTimers,
	}
}