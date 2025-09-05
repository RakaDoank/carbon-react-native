import type {
	SharedType,
} from '../../../types'

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
	| 'icon'
	| 'text'
	| 'inlineLoadingProps'
> {
	icon: SharedType.CarbonIcon,
	selected?: boolean,
	inlineLoadingProps?: Omit<InlineLoadingProps, 'text'>,
}
