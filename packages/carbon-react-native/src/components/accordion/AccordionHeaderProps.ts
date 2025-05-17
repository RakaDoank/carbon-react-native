import type {
	BaseColorProps as ButtonColorProps,
} from '../button/base-color'

import type {
	AccordionSize,
} from './AccordionSize'

export interface AccordionHeaderProps extends Omit<ButtonColorProps, 'android_rippleEffectColor' | 'size' | 'text' | 'icon' | 'colorStateStyle'> {
	size?: AccordionSize,
	/**
	 * https://carbondesignsystem.com/components/accordion/style/#flush-alignment
	 */
	open?: boolean,
	flushAlignment?: boolean,
	text?: string,
}
