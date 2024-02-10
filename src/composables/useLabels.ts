export function useLabels() {
	return {
		Labels: {
			ADD_TIMER: 'Add timer',
			START_TIMER: 'Start',
			RESUME_TIMER: 'Resume',
			STOP_TIMER: 'Stop',
			RESET_TIMER: 'Reset',
			REMOVE_TIMER: 'Delete',
			CURRENT_CALENDAR_WEEK: 'Current calendar week',
			DAY_OF_THE_YEAR: 'Day of the year',
			NOTES_EDITOR_PLACEHOLDER: 'Make your notes here...',
			SHOW_NOTES: 'Show notes',
			HIDE_NOTES: 'Hide notes',
		},
	} as const;
}