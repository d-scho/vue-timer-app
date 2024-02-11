import { type Ref, ref, watch } from 'vue';
import { getStoredTheme, setStoredTheme } from '@/methods/localStorageHandling';

export const Themes = {
    VANILLA: 'vanilla',
    DARKMODE: 'darkmode',
    BUBBLEGUM: 'bubblegum',
} as const;

export type Theme = (typeof Themes)[keyof typeof Themes];

const selectedTheme: Ref<Theme> = ref(getStoredTheme());
const body = document.querySelector('body');

if (selectedTheme.value !== Themes.VANILLA) {
    body?.classList.add(selectedTheme.value);
}

watch(selectedTheme, (value) => {
    for (const key in Themes) {
        body?.classList.remove(Themes[key as keyof typeof Themes]);
    }
    if (value !== Themes.VANILLA) {
        body?.classList.add(value);
    }
    setStoredTheme(value);
});

export function useTheme() {
    return {
        selectedTheme,
        Themes,
    };
}
