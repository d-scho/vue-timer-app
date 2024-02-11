import { useMediaQuery } from '@vueuse/core';

const pruneLabels = useMediaQuery('(max-width: 950px)');

export function useWidth() {
    return {
        pruneLabels,
    };
}
