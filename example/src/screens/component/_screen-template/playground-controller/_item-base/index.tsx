import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	CommonStyle,
	FlexStyle,
	SpacingConstant,
} from '@audira/carbon-react-native'

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
		paddingTop: SpacingConstant.spacing_03,
		paddingBottom: SpacingConstant.spacing_03,
	},
})
