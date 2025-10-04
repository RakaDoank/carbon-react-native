import type {
	DialogProviderProps,
} from '../DialogProviderProps'

export interface ControllerProps extends Omit<
	DialogProviderProps,
	| 'children'
	| 'defaultLazy'
	| 'animationConfig'
> {
	onEmpty: () => void,
	animationConfig: NonNullable<DialogProviderProps['animationConfig']>,
}
