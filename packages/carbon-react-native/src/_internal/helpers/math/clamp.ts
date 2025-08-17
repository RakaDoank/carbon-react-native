export function clamp<T extends number>(value: number, min: T, max: T): T {
	return Math.min(max, Math.max(min, value)) as T
}
