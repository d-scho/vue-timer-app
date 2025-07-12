/**
 * ISO 8601 - https://en.wikipedia.org/wiki/ISO_week_date
 */
export default function getCalendarWeek() {
    const currentDate = new Date();

    // 0-sunday to 6-saturday -> make sunday 7
    const dayOfWeek = currentDate.getDay() || 7;

    const thursdayCurrentWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 4 - dayOfWeek
    );

    const firstDayOfYear = new Date(thursdayCurrentWeek.getFullYear(), 0, 1);

    const diffInDays = Math.floor(
        (Number(thursdayCurrentWeek) - Number(firstDayOfYear)) / (1000 * 60 * 60 * 24)
    );

    return Math.ceil((diffInDays + 1) / 7);
}
