import {
	useCallback,
	useContext,
	useState,
} from 'react'

import {
	StyleSheet,
} from 'react-native'

import {
	RadioButtonGroup,
	Text,
	ThemeContext,
	type RadioButtonGroupProps,
} from '@audira/carbon-react-native'

import {
	ScreenPlayTemplate,
	type ScreenPlayTemplateEnumProps,
	type ScreenPlayTemplateTextProps,
} from '@/components'

export function RadioButton() {

	useContext(ThemeContext)

	const
		[play, setPlay] =
			useState<{
				label: typeof radioValues,
				legend: string,
				orientation: NonNullable<RadioButtonGroupProps['orientation']>,
				helperText: string,
				helperTextMode: NonNullable<RadioButtonGroupProps['helperTextMode']>,
				selectedValue: string,
			}>({
				label: [
					'Radio A',
					'Radio B',
					'Radio ABC',
					'XYZ',
					'BBC',
				],
				legend: 'Lorem Ipsum',
				orientation: 'vertical',
				helperText: '',
				helperTextMode: 'normal',
				selectedValue: radioValues[0],
			}),

		orientationPlayHandler: NonNullable<ScreenPlayTemplateEnumProps['data'][0]['onPress']> =
			useCallback(value => {
				setPlay(_play => ({
					..._play,
					orientation: value as NonNullable<RadioButtonGroupProps['orientation']>,
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
					const label = _play.label.slice() as typeof _play.label
					label[index] = _label
					return {
						..._play,
						label,
					}
				})
			}, [])

	return (
		<ScreenPlayTemplate
			title="Radio Button"
			playgroundNode={ <>
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
			</> }
		>
			<RadioButtonGroup
				legend={ play.legend }
				orientation={ play.orientation }
				helperText={ play.helperText }
				helperTextMode={ play.helperTextMode }
				controlled
				selectedValue={ play.selectedValue }
			>
				{ radioValues.map((val, index) => (
					<RadioButtonGroup.Item
						key={ val }
						value={ val }
						label={ play.label[index] }
						onPress={ () => setPlay(_play => ({ ..._play, selectedValue: val })) }
					/>
				)) }
			</RadioButtonGroup>

			<Text type="body_01" style={ style.textSelectedRadio }>
				Selected Radio Value: { play.selectedValue }
			</Text>
		</ScreenPlayTemplate>
	)

}

const
	style =
		StyleSheet.create({
			textSelectedRadio: {
				marginTop: 16,
			},
		}),

	radioValues: [string, string, string, string, string] =
		[
			'radio-1',
			'radio-2',
			'radio-3',
			'radio-4',
			'radio-5',
		],

	dataPlaygroundHelperTextMode: Record<'label' | 'value', NonNullable<RadioButtonGroupProps['helperTextMode']>>[] =
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
