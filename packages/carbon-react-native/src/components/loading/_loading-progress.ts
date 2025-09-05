export function loadingProgress(
	circumference: number,
	/**
	 * 0 - 100
	 */
	percentage: number,
) {
	return circumference - percentage * 0.01 * circumference
}
