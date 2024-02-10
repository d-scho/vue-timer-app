export function useLabels() {
	return {
		Labels: {
			START_TIMER: 'Start',
			RESUME_TIMER: 'Resume',
			STOP_TIMER: 'Stop',
			RESET_TIMER: 'Reset',
			CURRENT_CALENDAR_WEEK: 'Current calendar week',
			DAY_OF_THE_YEAR: 'Day of the year',
			NOTES_EDITOR_PLACEHOLDER: 'Make your notes here...'
		},
	} as const;
}