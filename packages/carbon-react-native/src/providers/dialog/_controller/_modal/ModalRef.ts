import type {
	Interpolation,
} from "./_Interpolation"

export interface ModalRef {
	toState: (value: Interpolation) => Promise<void>,
	fromToState: (from: Interpolation, to: Interpolation) => Promise<void>
}
