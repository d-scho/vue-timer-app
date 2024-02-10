import type { Timer, TimerDTO } from '../types/Timer';
import convertMillisecondsToReadableFormat from '@/methods/convertMillisecondsToReadableFormat';

const LocalStorageKey = {
    storedIsDarkmodeEnabled: 'vue-timer-app_isDarkmodeEnabled',
    storedNotes: 'vue-timer-app_notes',
    storedTimers: 'vue-timer-app_timers',
} as const;

// darkmode handling
export function getStoredIsDarkmodeEnabled() {
    const storage = localStorage.getItem(LocalStorageKey.storedIsDarkmodeEnabled);
    if (storage) {
        return (JSON.parse(storage) as boolean);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setStoredIsDarkmodeEnabled(true);
        return true;
    } else {
      return false;
    }
};
export function setStoredIsDarkmodeEnabled(value: boolean) {
    localStorage.setItem(LocalStorageKey.storedIsDarkmodeEnabled, String(value));
}

// textarea content handling
export function getStoredNotes() {
    const storage = localStorage.getItem(LocalStorageKey.storedNotes);
    if (storage) {
      return storage;
    } else {
      return '';
    }
};
export function setStoredNotes(value: string) {
    localStorage.setItem(LocalStorageKey.storedNotes, value);
};

// timers handling
export function getStoredTimers(): Array<Timer> {
    const storage = localStorage.getItem(LocalStorageKey.storedTimers);
    if (storage) {
      const timerDTOs = JSON.parse(storage) as Array<TimerDTO>;
      return timerDTOs.map(timerDTO => ({
        id: timerDTO.id,
        name: timerDTO.name,
        value: timerDTO.value,
        display: convertMillisecondsToReadableFormat(timerDTO.value),
        startTimerDisabled: false,
        stopTimerDisabled: true,
        resetTimerDisabled: timerDTO.value !== 0 ? false : true,
      }));
    } else {
      return [];
    }
};
export function setStoredTimers(value: Array<Timer>) {
    localStorage.setItem(LocalStorageKey.storedTimers, JSON.stringify(value.map(timer => ({ id: timer.id, name: timer.name, value: timer.value } as TimerDTO))));
};