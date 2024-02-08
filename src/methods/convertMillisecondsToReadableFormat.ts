export default function convertMillisecondsToReadableFormat(number: number) {
	number = number / 1000;
    const hours = Math.floor(number / 3600);
    const hoursAsString = hours < 10 ? '0' + hours : String(hours);

    let minutes = number % 3600;
    minutes = Math.floor(minutes / 60);
    const minutesAsString = minutes < 10 ? '0' + minutes : String(minutes);

    const seconds = Math.floor(number % 60);
    const secondsAsString = seconds < 10 ? '0' + seconds : String(seconds);

    return `${hoursAsString}:${minutesAsString}:${secondsAsString}`;
}