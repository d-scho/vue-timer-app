import { ref, watch } from 'vue';
import { getStoredIsDarkmodeEnabled, setStoredIsDarkmodeEnabled } from '@/methods/localStorageHandling';

const isDarkmodeEnabled = ref(getStoredIsDarkmodeEnabled());
const body = document.querySelector('body');
isDarkmodeEnabled.value ? body?.classList.add('darkmode') : body?.classList.remove('darkmode');
watch(isDarkmodeEnabled, (value) => {
	value ? body?.classList.add('darkmode') : body?.classList.remove('darkmode');
})

export function useDarkmode() {
	return {
		isDarkmodeEnabled,
		setStoredIsDarkmodeEnabled,
	}
}