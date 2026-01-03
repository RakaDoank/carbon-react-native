import type {
	DialogProviderProps,
} from "../DialogProviderProps"

export interface ControllerProps extends Omit<
	DialogProviderProps,
	| "children"
	| "defaultLazy"
> {
	onEmpty: () => void,
}
