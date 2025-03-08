import {
	StyleSheet,
	View,
	type ViewProps,
} from 'react-native'

import {
	FlexStyle,
	FormLabel,
	SpacingConstant,
} from '@audira/carbon-react-native'

export interface ItemProps extends ViewProps {
	title: string,
}

export function Item({
	title,
	children,
	style: styleProp,
	...props
}: ItemProps) {

	return (
		<View
			{ ...props }
			style={ [
				FlexStyle.flex_auto,
				style.item,
				styleProp,
			] }
		>
			<FormLabel
				label={ title }
				style={ style.formLabel }
			/>

			{ children }
		</View>
	)

}

const style = StyleSheet.create({
	item: {
		width: '50%',
		padding: SpacingConstant.spacing_03,
	},
	formLabel: {
		marginBottom: SpacingConstant.spacing_03,
	},
})
