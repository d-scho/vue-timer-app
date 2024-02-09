import { ref } from 'vue';
import { getStoredIsDarkmodeEnabled, setStoredIsDarkmodeEnabled } from '@/methods/localStorageHandling';

const isDarkmodeEnabled = ref(getStoredIsDarkmodeEnabled());

export function useDarkmode() {
	return {
		isDarkmodeEnabled,
		setStoredIsDarkmodeEnabled,
	}
}