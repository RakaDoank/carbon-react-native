import type {
	DialogProviderProps,
} from "../DialogProviderProps"

export interface ControllerProps extends Omit<
	DialogProviderProps,
	| "animationConfig"
	| "children"
	| "defaultLazy"
> {
	animationConfig: Required<NonNullable<DialogProviderProps["animationConfig"]>>,
	onEmpty: () => void,
}
