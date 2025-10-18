export interface ComponentWrapperRef {
	cancelX(): void,
	cancelY(): void,
	shiftX(px: number, delayMs?: number): void,
	shiftY(px: number): void,
}
