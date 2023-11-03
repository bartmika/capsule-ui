
export function isISODate(input) {
	if (input === undefined || input === null || input === "") {
		return false;
	}
	const date = new Date(input);
	return date.toISOString() === input;
}
