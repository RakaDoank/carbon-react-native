import {
	StyleSheet,
} from 'react-native'

import {
	Accordion,
	Button,
	type AccordionItemProps,
} from '@audira/carbon-react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	CText,
} from '@/components'

export interface Item2ndProps extends Omit<AccordionItemProps, 'children'> {
	onPressSampleButton?: Button.PrimaryProps['onPress'],
}

export function Item2nd({
	title,
	onPressSampleButton,
	...props
}: Item2ndProps) {

	return (
		<Accordion.Item
			{ ...props }
			title={ title }
		>
			<CText type="body_01" style={ style.br }>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac nulla nec mauris placerat sodales ac sit amet purus. Phasellus maximus ipsum sed mi hendrerit elementum. In dapibus lorem sed quam iaculis semper. Quisque feugiat tortor at venenatis ornare. Fusce ut nisi porta augue faucibus sollicitudin ac non eros. Sed ornare nunc eu mauris feugiat, id facilisis dolor ornare. Nullam leo nisl, auctor laoreet tellus vel, auctor mollis urna. Pellentesque id nunc urna.
			</CText>

			<Button.Primary
				text="Press me"
				onPress={ onPressSampleButton }
				style={ style.br }
			/>

			<CText type="body_01" style={ style.br }>
				Nullam eget mauris porta, fringilla nulla pharetra, ullamcorper lacus. Cras pharetra nibh vel dictum imperdiet. Curabitur pharetra aliquet tellus, nec venenatis justo aliquet sit amet. Nunc molestie aliquam nulla, sit amet consectetur nunc aliquet at. Fusce pharetra lorem ante, in elementum leo vestibulum quis. Vestibulum aliquam sit amet turpis sagittis fringilla. Maecenas eleifend faucibus lectus, a bibendum lectus tempor eu. Sed porta ex in justo rhoncus sagittis. Vivamus a ipsum dictum, vestibulum sapien eget, facilisis neque. Nulla in dui ac libero aliquam vulputate. Phasellus congue ultricies augue, in cursus dolor gravida sit amet. Curabitur iaculis scelerisque velit, sodales viverra turpis porta quis. Aenean eget lacus a metus molestie sagittis at ut enim. Duis vitae arcu non ligula ultrices egestas sit amet vel dui. Curabitur pellentesque, augue sed aliquet varius, tellus mi commodo diam, vitae consequat ante augue in orci. Mauris viverra augue eu ligula varius, non placerat justo feugiat.
			</CText>
		</Accordion.Item>
	)

}

const
	style =
		StyleSheet.create({
			br: {
				marginBottom: Spacing.spacing_05,
			},
		})
