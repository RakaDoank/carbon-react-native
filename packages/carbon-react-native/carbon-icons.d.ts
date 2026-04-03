declare module "@carbon/icons/es/*"

declare module "@carbon/icons/lib/*"

declare module "@carbon/icons/svg/*.svg" {
	import type {
		SvgProps,
	} from "react-native-svg"

	const Component: React.ForwardRefExoticComponent<
		& SvgProps
		& React.RefAttributes<Svg>
	>
	export default Component
}
