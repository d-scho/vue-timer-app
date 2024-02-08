const LocalStorageKey = {
    storedDarkModeSetting: 'counterDarkmodeEnabled',
    storedTextareaContent: 'counterTextarea',
    storedCounters: 'counterStoredCounters',
} as const;

// darkmode handling
export function getStoredDarkmodeSetting() {
    const storage = localStorage.getItem(LocalStorageKey.storedDarkModeSetting);
	console.log(storage);
    if (storage) {
        return JSON.parse(storage);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setStoredDarkmodeSetting(true);
        return true;
    } else {
      return false;
    }
};
export function setStoredDarkmodeSetting(value: boolean) {
    localStorage.setItem(LocalStorageKey.storedDarkModeSetting, String(value));
}

// textarea content handling
export function getStoredTextareaContent() {
    const storage = localStorage.getItem(LocalStorageKey.storedTextareaContent);
    if (storage) {
      return storage;
    } else {
      return '';
    }
};
export function setStoredTextareaContent(value: string) {
    localStorage.setItem(LocalStorageKey.storedTextareaContent, value);
};

// counters handling
export function getStoredCounters(): Array<StoredCounter> {
    const storage = localStorage.getItem(LocalStorageKey.storedCounters);
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
};
export function setStoredCounters(value: Array<StoredCounter>) {
    localStorage.setItem(LocalStorageKey.storedCounters, JSON.stringify(value));
};