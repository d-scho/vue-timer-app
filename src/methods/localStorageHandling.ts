import { type TimerDTO } from '../types/Timer';

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
export function getStoredTimers(): Array<TimerDTO> {
    const storage = localStorage.getItem(LocalStorageKey.storedTimers);
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
};
export function setStoredTimers(value: Array<TimerDTO>) {
    localStorage.setItem(LocalStorageKey.storedTimers, JSON.stringify(value));
};