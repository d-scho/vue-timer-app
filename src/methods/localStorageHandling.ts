const LocalStorageKey = {
    storedDarkModeSetting: 'vue-timer-app_isDarkmodeEnabled',
    storedTextareaContent: 'vue-timer-app_textareaContent',
    storedTimers: 'vue-timer-app_storedTimers',
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

// timers handling
export function getStoredTimers(): Array<StoredTimer> {
    const storage = localStorage.getItem(LocalStorageKey.storedTimers);
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
};
export function setStoredTimers(value: Array<StoredTimer>) {
    localStorage.setItem(LocalStorageKey.storedTimers, JSON.stringify(value));
};