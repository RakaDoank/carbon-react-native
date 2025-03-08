import {
	StyleSheet,
	type PressableProps,
} from 'react-native'

import {
	FlexStyle,
	Toggle,
} from '@audira/carbon-react-native'

import {
	ItemBase,
	type ItemBaseProps,
} from '../_item-base'

export interface BooleanProps extends Omit<ItemBaseProps, 'children'> {
	label: string,
	value: boolean,
	onChange?: Toggle.SmallProps['onChange'],
	onPress?: PressableProps['onPress'],
}

export function Boolean({
	label,
	value,
	onChange,
	onPress,
	style: styleProp,
	...props
}: BooleanProps) {

	return (
		<ItemBase { ...props }
			style={ [
				FlexStyle.flex_initial,
				style.container,
				styleProp,
			] }
		>
			<Toggle.Default
				label={ label }
				actionText=""
				controlled
				value={ value }
				onChange={ onChange }
				pressableProps={{
					onPress,
				}}
			/>
		</ItemBase>
	)

}

const style = StyleSheet.create({
	container: {
		paddingTop: 0,
	},
})
