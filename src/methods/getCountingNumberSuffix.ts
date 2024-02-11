export default function getCountingNumberSuffix(number: number) {
    if ([11, 12, 13].includes(number % 100)) {
        return 'th';
    } else {
        switch (number % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }
}
