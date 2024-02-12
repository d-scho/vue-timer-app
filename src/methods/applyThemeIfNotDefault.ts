import { Themes, type Theme } from '@/composables/useThemes';
const body = document.querySelector('body');

export default function applyThemeIfNotDefault(
    selectedTheme: Theme,
    defaultTheme: Theme
) {
    for (const key in Themes) {
        body?.classList.remove(Themes[key as keyof typeof Themes]);
    }

    if (selectedTheme !== defaultTheme) {
        body?.classList.add(selectedTheme);
    }
}
