import { useMediaQuery } from "@vueuse/core";

const pruneLabels = useMediaQuery('(max-width: 1110px)')

export function useWidth() {
	return {
		pruneLabels
	};
}