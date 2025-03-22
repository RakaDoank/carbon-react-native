import {
	useCallback,
	useState,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	Accordion as CAccordion,
	Button,
	FlexStyle,
	type AccordionSize,
} from '@audira/carbon-react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	CText,
	ScreenPlayTemplate,
	type ScreenPlayTemplateEnumProps,
} from '@/components'

import {
	Item2nd,
} from './_item-2nd'

export function Accordion() {

	const
		[play, setPlay] =
			useState<{
				title: [string, string, string],
				flushAlignment: boolean,
				open: [boolean, boolean, boolean],
				size: AccordionSize,
			}>({
				title: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing elit'],
				flushAlignment: false,
				open: [false, false, false],
				size: 'medium',
			}),

		flushAlignmentPlayHandler =
			useCallback(() => {
				setPlay(_play => ({
					..._play,
					flushAlignment: !_play.flushAlignment,
				}))
			}, []),

		sizePlayHandler: NonNullable<ScreenPlayTemplateEnumProps['data'][0]['onPress']> =
			useCallback(value => {
				setPlay(_play => ({
					..._play,
					size: value as AccordionSize,
				}))
			}, []),

		titlePlayHandler =
			useCallback((_title: string, index: 0 | 1 | 2) => {
				setPlay(_play => {
					const title = _play.title.slice() as [string, string, string]
					title[index] = _title
					return {
						..._play,
						title,
					}
				})
			}, []),

		toggleItemHandler =
			useCallback((index: 0 | 1 | 2) => {
				setPlay(_play => {
					const open = _play.open.slice() as [boolean, boolean, boolean]
					open[index] = !open[index]
					return {
						..._play,
						open,
					}
				})
			}, []),

		openAllHandler =
			useCallback(() => {
				setPlay(_play => ({
					..._play,
					open: [true, true, true],
				}))
			}, []),

		closeAllHandler =
			useCallback(() => {
				setPlay(_play => ({
					..._play,
					open: [false, false, false],
				}))
			}, [])

	return (
		<ScreenPlayTemplate
			title="Accordion"
			playgroundNode={ (<>
				<View
					style={ [
						FlexStyle.flex_initial,
						FlexStyle.flex_row,
						style.br,
					] }
				>
					<Button.Secondary
						size="medium"
						text="Close All"
						onPress={ closeAllHandler }
						style={ FlexStyle.flex_1 }
					/>
					<Button.Primary
						size="medium"
						text="Open All"
						onPress={ openAllHandler }
						style={ FlexStyle.flex_1 }
					/>
				</View>

				<ScreenPlayTemplate.PlayBoolean
					label="Flush Alignment"
					value={ play.flushAlignment }
					onPress={ flushAlignmentPlayHandler }
				/>

				<ScreenPlayTemplate.PlayEnum
					label="Size"
					selectedValue={ play.size }
					data={ dataPlaygroundSize.map(size => ({
						...size,
						onPress: sizePlayHandler,
					})) }
				/>

				<ScreenPlayTemplate.PlayText
					label="Title 1st Item"
					value={ play.title[0] }
					onSubmit={ title => titlePlayHandler(title, 0) }
				/>
				<ScreenPlayTemplate.PlayText
					label="Title 2nd Item"
					value={ play.title[1] }
					onSubmit={ title => titlePlayHandler(title, 1) }
				/>
				<ScreenPlayTemplate.PlayText
					label="Title 3rd Item"
					value={ play.title[2] }
					onSubmit={ title => titlePlayHandler(title, 2) }
				/>
			</>) }
		>
			<CAccordion
				flushAlignment={ play.flushAlignment }
				size={ play.size }
			>
				<CAccordion.Item
					title={ play.title[0] }
					open={ play.open[0] }
					controlled
					onPressHeader={ () => toggleItemHandler(0) }
				>
					<CText type="body_01">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac nulla nec mauris placerat sodales ac sit amet purus. Phasellus maximus ipsum sed mi hendrerit elementum. In dapibus lorem sed quam iaculis semper. Quisque feugiat tortor at venenatis ornare. Fusce ut nisi porta augue faucibus sollicitudin ac non eros. Sed ornare nunc eu mauris feugiat, id facilisis dolor ornare. Nullam leo nisl, auctor laoreet tellus vel, auctor mollis urna. Pellentesque id nunc urna.
					</CText>
				</CAccordion.Item>
				<Item2nd
					title={ play.title[1] }
					open={ play.open[1] }
					controlled
					onPressHeader={ () => toggleItemHandler(1) }
					onPressSampleButton={ () => toggleItemHandler(1) }
				/>
				<CAccordion.Item
					title={ play.title[2] }
					open={ play.open[2] }
					controlled
					onPressHeader={ () => toggleItemHandler(2) }
				>
					<CText type="body_01">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac nulla nec mauris placerat sodales ac sit amet purus. Phasellus maximus ipsum sed mi hendrerit elementum. In dapibus lorem sed quam iaculis semper. Quisque feugiat tortor at venenatis ornare. Fusce ut nisi porta augue faucibus sollicitudin ac non eros. Sed ornare nunc eu mauris feugiat, id facilisis dolor ornare. Nullam leo nisl, auctor laoreet tellus vel, auctor mollis urna. Pellentesque id nunc urna.
					</CText>
				</CAccordion.Item>
			</CAccordion>
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

	dataPlaygroundSize: Record<'label' | 'value', AccordionSize>[] =
		[
			{
				label: 'small',
				value: 'small',
			},
			{
				label: 'medium',
				value: 'medium',
			},
			{
				label: 'large',
				value: 'large',
			},
		]
