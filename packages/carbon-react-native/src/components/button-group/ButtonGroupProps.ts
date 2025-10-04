import type {
	ViewProps,
} from 'react-native'

import type {
	Size as ButtonSize,
} from '../button/Size'

export interface ButtonGroupProps extends Omit<ViewProps, 'children'> {
	button1: React.ReactElement,
	button2: React.ReactElement,
	button3?: React.ReactElement,
	/**
	 * Make the `button1` "alone" at container's start alone and the last two is placed closely at container's end
	 * 
	 * Based on IBM, this is intended for the Ghost button (in `button1`) that should be placed alone at container's start
	 * 
	 * Does nothing if `vertical` prop is true
	 */
	oneAlone?: boolean,
	/**
	 * @default 'large_productive'
	 */
	size?: ButtonSize,
	/**
	 * When we say “fluid,” we mean that the button becomes a part of a larger, compound component by bleeding to two or more edges of its container. Rather than defining the fluid button in columns or mini units, its width is defined as a percentage (often 50%) of the container’s width.
	 *
	 * Fluid on 3 buttons, will make each button have 25% width of the container's width
	 *
	 * @see https://carbondesignsystem.com/components/button/usage/#button-groups
	 */
	fluid?: boolean,
	/**
	 * Specify the button arrangement of the set (vertically stacked or horizontal)
	 */
	vertical?: boolean,
}
