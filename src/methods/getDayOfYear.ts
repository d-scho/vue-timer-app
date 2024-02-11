export default function getDayOfYear() {
    const currentDate = new Date() // current timestamp
    const firstDayCurrentYear = new Date(currentDate.getFullYear(), 0, 1) // current year at month 0 (= jan) and day 1 (= 1st)
    const fullDaysPassed = Math.floor(
        (Number(currentDate) - Number(firstDayCurrentYear)) /
            (1000 * 60 * 60 * 24)
    )
    const dayOfYear = fullDaysPassed + 1 // + 1 because the present day which is not completed counts towards it, too
    return dayOfYear
}
