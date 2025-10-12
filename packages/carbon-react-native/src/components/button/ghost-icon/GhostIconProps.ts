import type {
	InlineLoadingProps,
} from '../../inline-loading/InlineLoadingProps'

import type {
	BaseColorProps,
} from '../base-color/BaseColorProps'

export interface GhostIconProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
	| 'text'
	| 'inlineLoadingProps'
> {
	inlineLoadingProps?: Omit<InlineLoadingProps, 'text'>,
}
