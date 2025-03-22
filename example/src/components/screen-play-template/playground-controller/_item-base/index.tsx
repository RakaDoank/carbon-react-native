import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	CommonStyle,
	FlexStyle,
} from '@audira/carbon-react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

export interface ItemBaseProps extends ViewProps {
}

export function ItemBase({
	style: styleProp,
	...props
}: ItemBaseProps) {

	return (
		<View
			{ ...props }
			style={ [
				FlexStyle.flex_initial,
				CommonStyle.w_full,
				style.container,
				styleProp,
			] }
		/>
	)

}

const style = StyleSheet.create({
	container: {
		paddingTop: Spacing.spacing_03,
		paddingBottom: Spacing.spacing_03,
	},
})
