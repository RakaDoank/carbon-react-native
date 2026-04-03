import type {
	Svg,
	SvgProps,
} from "react-native-svg"

export interface TableCellIconProps extends Omit<
	SvgProps,
	| "children"
	| "width"
	| "height"
> {
	Icon: React.ForwardRefExoticComponent<
		& SvgProps
		& React.RefAttributes<Svg>
	>,
}
