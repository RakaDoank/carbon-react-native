import {
	StyleSheet,
	View,
} from "react-native"

import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Text,
	type TextProps,
} from "@audira/carbon-react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

interface Props {
	children?: string,
}

export default {
	title: "Components/Text/All Types",
	args: {
		children: "The quick brown fox jumps over the lazy dog",
	},
	argTypes: {
		children: {
			control: "text",
		},
	},
} satisfies Meta<Props>

export const AllTypes: StoryFn<Props> = args => {
	return (
		<View
			style={ styleSheet.textsContainer }
		>
			<TextCompose type="body_01" { ...args }/>
			<TextCompose type="body_02" { ...args }/>
			<TextCompose type="body_compact_01" { ...args }/>
			<TextCompose type="body_compact_02" { ...args }/>
			<TextCompose type="code_01" { ...args }/>
			<TextCompose type="code_02" { ...args }/>
			<TextCompose type="heading_01" { ...args }/>
			<TextCompose type="heading_02" { ...args }/>
			<TextCompose type="heading_03" { ...args }/>
			<TextCompose type="heading_04" { ...args }/>
			<TextCompose type="heading_05" { ...args }/>
			<TextCompose type="heading_06" { ...args }/>
			<TextCompose type="heading_07" { ...args }/>
			<TextCompose type="heading_compact_01" { ...args }/>
			<TextCompose type="heading_compact_02" { ...args }/>
			<TextCompose type="helper_text_01" { ...args }/>
			<TextCompose type="helper_text_02" { ...args }/>
			<TextCompose type="label_01" { ...args }/>
			<TextCompose type="label_02" { ...args }/>
			<TextCompose type="legal_01" { ...args }/>
			<TextCompose type="legal_02" { ...args }/>
		</View>
	)
}

const
	styleSheet =
		StyleSheet.create({
			textsContainer: {
				rowGap: Spacing.spacing_05,
			},
		})

function TextCompose({
	children,
	type,
	...props
}: TextProps) {

	return (
		<Text
			{ ...props }
			type={ type }
		>
			{ children } :: { `${type}` }
		</Text>
	)

}
