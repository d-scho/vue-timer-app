export default function getCalendarWeek() {
    const currentDate = new Date(); // current timestamp | 3-9 = 1 | 10-16 = 2
    const firstDayCurrentYear = new Date(currentDate.getFullYear(), 0, 1) // year taken from currentDate at month 0 (= jan) and day 1 (= 1st)

    // get the first Monday starting from Jan 1 of the current year
    function firstMonday() {
        let dayOfYear = 1;
        let iteration = new Date(currentDate.getFullYear(), 0, dayOfYear);
        while (iteration.getUTCDay() !== 0) {
            dayOfYear++;
            iteration = new Date(currentDate.getFullYear(), 0, dayOfYear);
        }
        const firstMonday = Math.floor(((Number(iteration) - Number(firstDayCurrentYear)) / (1000 * 60 * 60 * 24))) + 1; // + 1 because we start at day one, e.g. Jan 1st - Jan 1st would be 0, not 1
        return firstMonday;
    }

    const fullDaysPassed = Math.floor((Number(currentDate) - Number(firstDayCurrentYear)) / (1000 * 60 * 60 * 24 )); // division makes days from milliseconds
    const dayOfYear = fullDaysPassed + 1; // + 1 because the present day, which is not completed, counts towards it, too
    const weekNumber = Math.ceil(( dayOfYear - ( firstMonday() - 1 ) ) / 7) // fix the offset caused by the monday not being the first, e.g. firstMonday = 3 needs an offset by 2, because we start at Jan 1st, not Oth
    return weekNumber !== 0 ? weekNumber : 52 // if the weekNumber is 0, it is the 52nd week of the prior year
}