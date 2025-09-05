/* eslint-disable react/prop-types */
import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	Accordion as _Accordion,
	Text,
	type AccordionProps,
	type AccordionSize,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Accordion',
	args: {
		size: 'medium',
		title_1: 'Accordion 1',
		title_2: 'Accordion 2',
		title_3: 'Accordion 3',
	},
	argTypes: {
		size: {
			control: 'select',
			options: [
				'small',
				'medium',
				'large',
			] satisfies AccordionSize[],
		},
		title_1: {
			control: 'text',
			description: 'This is not an actual prop',
		},
		title_2: {
			control: 'text',
			description: 'This is not an actual prop',
		},
		title_3: {
			control: 'text',
			description: 'This is not an actual prop',
		},
	},
} satisfies Meta<AccordionModifiedProps>

export const Accordion: StoryFn<AccordionModifiedProps> = ({
	title_1,
	title_2,
	title_3,
	...args
}) => {
	return (
		<_Accordion
			{ ...args }
		>
			<_Accordion.Item
				title={ title_1 }
			>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed massa convallis, tempus neque eget, vestibulum mi. In nec placerat erat. Praesent lobortis finibus tellus eget varius. Quisque quis pharetra quam.
				</Text>
			</_Accordion.Item>
			<_Accordion.Item
				title={ title_2 }
			>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu lectus metus. Etiam finibus tincidunt purus, at gravida arcu eleifend eget. Duis porta quis nibh id vestibulum. Nulla ac sem vel neque bibendum faucibus. Etiam ullamcorper ante non accumsan hendrerit. Aenean lobortis erat in enim lacinia, sit amet egestas ligula mattis. Mauris maximus posuere tellus.

					Proin pulvinar nisi fringilla ullamcorper mollis. Nunc sodales interdum lectus, a placerat nunc egestas in. Ut sed commodo erat. Cras congue, leo id ullamcorper posuere, purus turpis ornare eros, at viverra purus nibh non turpis. Vestibulum quis magna eu eros tempor tincidunt sit amet eu neque. Suspendisse condimentum imperdiet augue vitae feugiat. Curabitur maximus faucibus ipsum ac dapibus. Cras eu bibendum mauris, vel gravida ante. Morbi a ligula blandit, iaculis eros eu, sollicitudin nisi. Aenean a interdum tortor. Integer lobortis arcu vitae tellus imperdiet, vitae feugiat nibh imperdiet. Duis eget odio nec magna vulputate sollicitudin vitae non nisl. Proin viverra lobortis mauris, in posuere sapien. Vivamus tincidunt quam orci, ut ullamcorper ligula faucibus at.
				</Text>
			</_Accordion.Item>
			<_Accordion.Item
				title={ title_3 }
			>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed massa convallis, tempus neque eget, vestibulum mi. In nec placerat erat. Praesent lobortis finibus tellus eget varius. Quisque quis pharetra quam.
				</Text>
			</_Accordion.Item>
		</_Accordion>
	)
}

interface AccordionModifiedProps extends AccordionProps {
	title_1: string,
	title_2: string,
	title_3: string,
}
