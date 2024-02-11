export function useLabels() {
    return {
        Labels: {
            ADD_TIMER: 'Add timer',
            SUM_OF_TIMERS: 'Sum of timers',
            SUM_OF_TIMERS_SHORT: 'Sum',
            CURRENT_CALENDAR_WEEK: 'Current calendar week',
            CURRENT_CALENDAR_WEEK_SHORT: 'CW',
            DAY_OF_THE_YEAR: 'Day of the year',
            DAY_OF_THE_YEAR_SHORT: 'DOY',
            NOTES_EDITOR_PLACEHOLDER: 'Make your notes here...',
            SHOW_NOTES: 'Show notes',
            HIDE_NOTES: 'Hide notes',
        },
    } as const
}
