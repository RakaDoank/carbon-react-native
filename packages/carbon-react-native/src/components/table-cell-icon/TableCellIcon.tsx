import {
	forwardRef,
	useContext,
} from "react"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import {
	ThemeContext,
} from "../../contexts"

import type {
	TableCellIconProps,
} from "./TableCellIconProps"

import type {
	TableCellIconRef,
} from "./TableCellIconRef"

export const TableCellIcon = forwardRef<TableCellIconRef, TableCellIconProps>(
	function TableCellIcon(
		{
			Icon,
			fill,
			...props
		},
		ref,
	) {

		const
			themeContext =
				useContext(ThemeContext)

		return (
			<Icon
				ref={ ref }
				{ ...props }
				width={ 16 }
				height={ 16 }
				fill={ fill || mapFillColor[themeContext.colorScheme] }
			/>
		)

	},
)

const
	mapFillColor =
		{
			gray_10: Color.Token.gray_10.icon_primary,
			gray_100: Color.Token.gray_100.icon_primary,
		} as const satisfies Record<ThemeContext["colorScheme"], string>
