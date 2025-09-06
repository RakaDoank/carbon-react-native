import type {
	ViewProps,
} from 'react-native'

import type * as Button from '../button'

export interface ButtonGroupProps extends Omit<ViewProps, 'children'> {
	/**
	 * @default 'large_productive'
	 */
	size?: Button.Size,
	/**
	 * When we say “fluid,” we mean that the button becomes a part of a larger, compound component by bleeding to two or more edges of its container. Rather than defining the fluid button in columns or mini units, its width is defined as a percentage (often 50%) of the container’s width.
	 *
	 * Fluid on 3 buttons, will make each button have 25% width of the container's width, and if there is one Ghost button, the last two buttons will be placed closely at the container's end, and the Ghost button will be placed at the container's start
	 *
	 * @see https://carbondesignsystem.com/components/button/usage/#button-groups
	 */
	fluid?: boolean,
	/**
	 * Specify the button arrangement of the set (vertically stacked or horizontal)
	 */
	verticalStack?: boolean,
	items:
		// 2 Buttons
		| CombinationItems<
			& Item<'Secondary', Button.SecondaryProps>
			& Item<'Primary', Button.PrimaryProps>
		>
		| CombinationItems<
			& Item<'Tertiary', Button.TertiaryProps>
			& Item<'Primary', Button.PrimaryProps>
		>
		| CombinationItems<
			& Item<'Ghost', Button.GhostProps>
			& Item<'Primary', Button.PrimaryProps>
		>
		| CombinationItems<
			& Item<'TertiaryDanger', Button.TertiaryDangerProps>
			& Item<'Primary', Button.PrimaryProps>
		>
		| CombinationItems<
			& Item<'Secondary', Button.SecondaryProps>
			& Item<'PrimaryDanger', Button.PrimaryDangerProps>
		>
		| CombinationItems<
			& Item<'Ghost', Button.GhostProps>
			& Item<'PrimaryDanger', Button.PrimaryDangerProps>
		>

		// 3 Buttons
		| CombinationItems<
			& Item<'Tertiary', Button.TertiaryProps>
			& Item<'Secondary', Button.SecondaryProps>
			& Item<'Primary', Button.PrimaryProps>
		>
		| CombinationItems<
			& Item<'Ghost', Button.GhostProps>
			& Item<'Secondary', Button.SecondaryProps>
			& Item<'Primary', Button.PrimaryProps>
		>
		| CombinationItems<
			& Item<'Secondary1', Button.SecondaryProps>
			& Item<'Secondary2', Button.SecondaryProps>
			& Item<'Primary', Button.PrimaryProps>
		>
		| CombinationItems<
			& Item<'Tertiary1', Button.TertiaryProps>
			& Item<'Tertiary2', Button.TertiaryProps>
			& Item<'Primary', Button.PrimaryProps>
		>
		| CombinationItems<
			& Item<'TertiaryDanger', Button.TertiaryDangerProps>
			& Item<'Tertiary', Button.TertiaryProps>
			& Item<'Primary', Button.PrimaryProps>
		>

		// 2 Buttons without primary
		| CombinationItemsSharedComponent<'Tertiary1' | 'Tertiary2', 'TertiaryComponent', Button.TertiaryProps>
		| CombinationItems<
			& Item<'Ghost', Button.GhostProps>
			& Item<'Tertiary', Button.TertiaryProps>
		>
		| CombinationItemsSharedComponent<'Ghost1' | 'Ghost2', 'GhostComponent', Button.GhostProps>

		// 3 Buttons without primary
		| CombinationItemsSharedComponent<'Tertiary1' | 'Tertiary2' | 'Tertiary3', 'TertiaryComponent', Button.TertiaryProps>
		| CombinationItems<
			& Item<'TertiaryDanger', Button.TertiaryDangerProps>
			& Item<'Tertiary1', Button.TertiaryProps>
			& Item<'Tertiary2', Button.TertiaryProps>
		>
		| CombinationItemsSharedComponent<'Secondary1' | 'Secondary2' | 'Secondary3', 'SecondaryComponent', Button.SecondaryProps>
}

type ItemKey =
	| 'Primary'
	| 'PrimaryDanger'
	| 'Ghost'
	| 'Ghost1'
	| 'Ghost2'
	| 'Tertiary'
	| 'TertiaryDanger'
	| 'Tertiary1'
	| 'Tertiary2'
	| 'Tertiary3'
	| 'Secondary'
	| 'Secondary1'
	| 'Secondary2'
	| 'Secondary3'

type Item<Key extends ItemKey = never, Props extends ViewProps = Button.BaseProps> =
	{
		[Name in Key]: {
			Component: React.FunctionComponent<Props>,
		} & Props
	}

type CombinationItems<T extends Item> =
	& {
		[Key in keyof T]: T[Key]
	}
	& {
		[KeyNever in Exclude<ItemKey, keyof T>]?: never
	}

type CombinationItemsSharedComponent<Name extends ItemKey, ObjKeyComponent extends string, Props extends ViewProps> =
	& {
		[Component in ObjKeyComponent]: React.FunctionComponent<Props>
	}
	& {
		[Key in Name]: Props
	}
	& {
		[KeyNever in Exclude<ItemKey, Name>]?: never
	}
