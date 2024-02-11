import { useMediaQuery } from '@vueuse/core';

const pruneLabels = useMediaQuery('(max-width: 840px)');

export function useWidth() {
    return {
        pruneLabels,
    };
}
