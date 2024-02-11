import type { Timer, TimerDTO } from '../types/Timer';
import convertMillisecondsToReadableFormat from '@/methods/convertMillisecondsToReadableFormat';
import { Themes, type Theme } from '@/composables/useTheme';

const LocalStorageKey = {
    storedTheme: 'vue-timer-app_theme',
    storedNotes: 'vue-timer-app_notes',
    storedTimers: 'vue-timer-app_timers',
} as const;

// theme handling
export function getStoredTheme(): Theme {
    const storage = localStorage.getItem(LocalStorageKey.storedTheme);
    if (storage) {
        return storage as Theme;
    } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        setStoredTheme(Themes.DARKMODE);
        return Themes.DARKMODE;
    } else {
        return Themes.VANILLA;
    }
}
export function setStoredTheme(value: Theme) {
    localStorage.setItem(LocalStorageKey.storedTheme, value);
}

// textarea content handling
export function getStoredNotes() {
    const storage = localStorage.getItem(LocalStorageKey.storedNotes);
    if (storage) {
        return storage;
    } else {
        return '';
    }
}
export function setStoredNotes(value: string) {
    localStorage.setItem(LocalStorageKey.storedNotes, value);
}

// timers handling
export function getStoredTimers(): Array<Timer> {
    const storage = localStorage.getItem(LocalStorageKey.storedTimers);
    if (storage) {
        const timerDTOs = JSON.parse(storage) as Array<TimerDTO>;
        return timerDTOs.map((timerDTO) => ({
            id: timerDTO.id,
            name: timerDTO.name,
            value: timerDTO.value,
            display: convertMillisecondsToReadableFormat(timerDTO.value),
            isRunning: false,
            resetTimerDisabled: timerDTO.value !== 0 ? false : true,
        }));
    } else {
        return [];
    }
}
export function setStoredTimers(value: Array<Timer>) {
    localStorage.setItem(
        LocalStorageKey.storedTimers,
        JSON.stringify(
            value.map(
                (timer) =>
                    ({
                        id: timer.id,
                        name: timer.name,
                        value: timer.value,
                    }) as TimerDTO
            )
        )
    );
}
