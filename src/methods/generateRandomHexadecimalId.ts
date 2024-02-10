export default function generateRandomHexadecimalId() {
	return Math.random().toString(16).slice(2);
}