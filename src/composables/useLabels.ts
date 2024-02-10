export function useLabels() {
	return {
		Labels: {
			ADD_TIMER: 'Add timer',
			CURRENT_CALENDAR_WEEK: 'Current calendar week',
			DAY_OF_THE_YEAR: 'Day of the year',
			NOTES_EDITOR_PLACEHOLDER: 'Make your notes here...',
			SHOW_NOTES: 'Show notes',
			HIDE_NOTES: 'Hide notes',
		},
	} as const;
}