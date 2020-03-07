
/**
 * Return true if the provided date is today. Optionally, provide
 * a second parameter for the current date/time
 */
export function isToday(date: Date, now = new Date()) {
    return (
        date.getFullYear() === now.getFullYear()
        && date.getMonth() === now.getMonth()
        && date.getDate() === now.getDate()
    );
}
