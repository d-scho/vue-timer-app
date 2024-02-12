import { type Ref, ref, watch } from 'vue';
import { getStoredTheme, setStoredTheme } from '@/methods/localStorageHandling';
import applyThemeIfNotDefault from '@/methods/applyThemeIfNotDefault';

export const Themes = {
    LIGHTMODE: 'lightmode',
    DARKMODE: 'darkmode',
    BUBBLEGUM: 'bubblegum',
    MAXTIX: 'matrix',
} as const;
export type Theme = (typeof Themes)[keyof typeof Themes];
export const defaultTheme: Theme = Themes.LIGHTMODE;

const selectedTheme: Ref<Theme> = ref(getStoredTheme());
applyThemeIfNotDefault(selectedTheme.value, defaultTheme);
watch(selectedTheme, (selectedTheme) => {
    applyThemeIfNotDefault(selectedTheme, defaultTheme);
    setStoredTheme(selectedTheme);
});

export function useThemes() {
    return {
        selectedTheme,
        Themes,
    };
}
