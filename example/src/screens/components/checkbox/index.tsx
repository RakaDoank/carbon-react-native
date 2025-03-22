import {
	useCallback,
	useContext,
	useState,
} from 'react'

import {
	StyleSheet,
} from 'react-native'

import {
	CheckboxGroup,
	ThemeContext,
	type CheckboxGroupProps,
} from '@audira/carbon-react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	ScreenPlayTemplate,
	type ScreenPlayTemplateEnumProps,
	type ScreenPlayTemplateTextProps,
} from '@/components'

export function Checkbox() {

	useContext(ThemeContext)

	const
		[play, setPlay] =
			useState<{
				orientation: NonNullable<CheckboxGroupProps['orientation']>,
				legend: string,
				selected: [boolean, boolean, boolean, boolean, boolean],
				indeterminate1: boolean,
				label: [string, string, string, string, string],
				helperText: string,
				helperTextMode: NonNullable<CheckboxGroupProps['helperTextMode']>,
			}>({
				orientation: 'vertical',
				legend: 'Group Legend',
				selected: [false, true, false, false, false],
				indeterminate1: true,
				label: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
				helperText: '',
				helperTextMode: 'normal',
			}),

		orientationPlayHandler: NonNullable<ScreenPlayTemplateEnumProps['data'][0]['onPress']> =
			useCallback(value => {
				setPlay(_play => ({
					..._play,
					orientation: value as NonNullable<CheckboxGroupProps['orientation']>,
				}))
			}, []),

		legendPlayHandler: NonNullable<ScreenPlayTemplateTextProps['onSubmit']> =
			useCallback(legend => {
				setPlay(_play => ({
					..._play,
					legend,
				}))
			}, []),

		helperTextPlayHandler: NonNullable<ScreenPlayTemplateTextProps['onSubmit']> =
			useCallback(helperText => {
				setPlay(_play => ({
					..._play,
					helperText,
				}))
			}, []),

		helperTextModePlayHandler: NonNullable<ScreenPlayTemplateEnumProps['data'][0]['onPress']> =
			useCallback(value => {
				setPlay(_play => ({
					..._play,
					helperTextMode: value as typeof _play['helperTextMode'],
				}))
			}, []),

		labelItemPlayHandler: (label: string, index: number) => void =
			useCallback((_label, index) => {
				setPlay(_play => {
					const label = _play.label.slice() as [string, string, string, string, string]
					label[index] = _label
					return {
						..._play,
						label,
					}
				})
			}, []),

		toggleItemHandler =
			useCallback((index: 0 | 1 | 2 | 3 | 4) => {
				setPlay(_play => {
					const selected = _play.selected.slice() as [boolean, boolean, boolean, boolean, boolean]

					if(index === 1 && _play.indeterminate1) {
						selected[index] = true
						return {
							..._play,
							selected,
							indeterminate1: false,
						}
					}

					selected[index] = !selected[index]
					return {
						..._play,
						selected,
					}
				})
			}, [])

	return (
		<ScreenPlayTemplate
			title="Checkbox"
			playgroundNode={ (<>
				<ScreenPlayTemplate.PlayEnum
					label="Orientation"
					selectedValue={ play.orientation }
					data={ [
						{
							label: 'vertical',
							value: 'vertical',
							onPress: orientationPlayHandler,
						},
						{
							label: 'horizontal',
							value: 'horizontal',
							onPress: orientationPlayHandler,
						},
					] }
				/>

				<ScreenPlayTemplate.PlayText
					label="Legend Text"
					value={ play.legend }
					onSubmit={ legendPlayHandler }
				/>

				<ScreenPlayTemplate.PlayText
					label="Helper Text"
					value={ play.helperText }
					onSubmit={ helperTextPlayHandler }
				/>
				<ScreenPlayTemplate.PlayEnum
					label="Helper Text Mode"
					selectedValue={ play.helperTextMode }
					data={ dataPlaygroundHelperTextMode.map(mode => ({
						...mode,
						onPress: helperTextModePlayHandler,
					})) }
				/>

				<ScreenPlayTemplate.PlayText
					label="Item's Label 1"
					value={ play.label[0] }
					onSubmit={ value => labelItemPlayHandler(value, 0) }
				/>
				<ScreenPlayTemplate.PlayText
					label="Item's Label 2"
					value={ play.label[1] }
					onSubmit={ value => labelItemPlayHandler(value, 1) }
				/>
				<ScreenPlayTemplate.PlayText
					label="Item's Label 3"
					value={ play.label[2] }
					onSubmit={ value => labelItemPlayHandler(value, 2) }
				/>
				<ScreenPlayTemplate.PlayText
					label="Item's Label 4"
					value={ play.label[3] }
					onSubmit={ value => labelItemPlayHandler(value, 3) }
				/>
				<ScreenPlayTemplate.PlayText
					label="Item's Label 5"
					value={ play.label[4] }
					onSubmit={ value => labelItemPlayHandler(value, 4) }
				/>
			</>) }
		>
			<CheckboxGroup
				orientation={ play.orientation }
				legend={ play.legend }
				helperText={ play.helperText }
				helperTextMode={ play.helperTextMode }
				style={ style.br }
			>
				<CheckboxGroup.Item
					label={ play.label[0] }
					controlled
					value={ play.selected[0] }
					onPress={ () => toggleItemHandler(0) }
				/>
				<CheckboxGroup.Item
					label={ play.label[1] }
					controlled
					indeterminate={ play.indeterminate1 }
					value={ play.selected[1] }
					onPress={ () => toggleItemHandler(1) }
				/>
				<CheckboxGroup.Item
					label={ play.label[2] }
					controlled
					value={ play.selected[2] }
					onPress={ () => toggleItemHandler(2) }
				/>
				<CheckboxGroup.Item
					label={ play.label[3] }
					controlled
					value={ play.selected[3] }
					onPress={ () => toggleItemHandler(3) }
				/>
				<CheckboxGroup.Item
					label={ play.label[4] }
					controlled
					value={ play.selected[4] }
					onPress={ () => toggleItemHandler(4) }
				/>
			</CheckboxGroup>

			<CheckboxGroup
				legend="Uncontrolled Checkboxes Value"
				orientation={ play.orientation }
				helperText={ play.helperText }
				helperTextMode={ play.helperTextMode }
			>
				{
					/**
					 * Even it's uncontrolled,
					 * you can still get the value by using `onChange` prop on each item
					 */
				}
				<CheckboxGroup.Item
					label="Uncontrolled 1"
					// onChange={ value => console.log('current boolean value: ', value) }
				/>
				<CheckboxGroup.Item
					label="Uncontrolled 2"
					indeterminate
					value
				/>
				<CheckboxGroup.Item
					label="Uncontrolled 3"
				/>
			</CheckboxGroup>
		</ScreenPlayTemplate>
	)

}

const
	style =
		StyleSheet.create({
			br: {
				marginBottom: Spacing.spacing_05,
			},
		}),

	dataPlaygroundHelperTextMode: Record<'label' | 'value', NonNullable<CheckboxGroupProps['helperTextMode']>>[] =
		[
			{
				label: 'normal',
				value: 'normal',
			},
			{
				label: 'warning',
				value: 'warning',
			},
			{
				label: 'error',
				value: 'error',
			},
		]
