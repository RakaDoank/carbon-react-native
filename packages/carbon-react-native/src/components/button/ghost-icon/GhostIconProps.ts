import type {
	SharedType,
} from '../../../types'

import type {
	BaseColorProps,
} from '../base-color/BaseColorProps'

export interface GhostIconProps extends Omit<
	BaseColorProps,
	| 'android_rippleEffectColor'
	| 'colorStateStyle'
	| 'icon'
	| 'text'
> {
	icon: SharedType.CarbonIcon,
	selected?: boolean,
}
