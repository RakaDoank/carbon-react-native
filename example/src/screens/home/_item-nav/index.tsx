import {
	StyleSheet,
} from 'react-native'

import {
	Button,
} from '@audira/carbon-react-native'

import Icon from '@carbon/icons/es/chevron--right/20'

export interface ItemNavProps extends Button.SecondaryProps {
}

export function ItemNav({
	size = 'small',
	icon = Icon,
	style: styleProp,
	...props
}: ItemNavProps) {

	return (
		<Button.Ghost
			{ ...props }
			size={ size }
			icon={ icon }
			style={ [style.button, styleProp] }
		/>
	)

}

const style = StyleSheet.create({
	button: {
		alignSelf: 'stretch',
	},
})
