import {
	RadioButtonGroup,
} from '@audira/carbon-react-native'

import {
	ItemBase,
	type ItemBaseProps,
} from '../_item-base'

export interface EnumProps extends Omit<ItemBaseProps, 'children'> {
	label: string,
	selectedValue: string,
	data: {
		value: string,
		label: string,
		onPress?: (value: string) => void,
	}[],
}

export function Enum({
	label,
	selectedValue,
	data,
	...props
}: EnumProps) {

	return (
		<ItemBase
			{ ...props }
		>
			<RadioButtonGroup
				selectedValue={ selectedValue }
				legend={ label }
			>
				{ data.map(item => (
					<RadioButtonGroup.Item
						key={ item.value }
						value={ item.value }
						label={ item.label }
						onPress={ () => item.onPress?.(item.value) }
					/>
				)) }
			</RadioButtonGroup>
		</ItemBase>
	)

}
