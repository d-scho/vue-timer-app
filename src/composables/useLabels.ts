export function useLabels() {
	return {
		Labels: {
			START_TIMER: 'Start timer',
			RESUME_TIMER: 'Resume timer',
			STOP_TIMER: 'Stop timer',
			RESET_TIMER: 'Reset timer',
			EDIT_NAME: 'Edit name',
			RESET_NAME: 'Reset name',
			CURRENT_CALENDAR_WEEK: 'Current calendar week',
			DAY_OF_THE_YEAR: 'Day of the year',
			NOTES_EDITOR_PLACEHOLDER: 'Make your notes here...'
		},
	} as const;
}