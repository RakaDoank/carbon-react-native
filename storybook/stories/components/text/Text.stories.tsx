import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Text as CarbonText,
	type TextProps,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Text",
	component: CarbonText,
	args: {
		type: "body_compact_02",
		italic: false,
		children: "The quick brown fox jumps over the lazy dog",
	},
	argTypes: {
		type: {
			control: "select",
			options: [
				"body_01",
				"body_02",
				"body_compact_01",
				"body_compact_02",
				"code_01",
				"code_02",
				"heading_01",
				"heading_02",
				"heading_03",
				"heading_04",
				"heading_05",
				"heading_06",
				"heading_07",
				"heading_compact_01",
				"heading_compact_02",
				"helper_text_01",
				"helper_text_02",
				"label_01",
				"label_02",
				"legal_01",
				"legal_02",
			] satisfies NonNullable<TextProps["type"]>[],
		},
		italic: {
			control: "boolean",
		},
		weight: {
			control: "select",
			options: [
				undefined,
				100,
				200,
				300,
				400,
				500,
				600,
				700,
				800,
				900,
			] satisfies TextProps["weight"][],
		},
		children: {
			control: "text",
		},
	},
} satisfies Meta<TextProps>

export const Text: StoryFn<TextProps> = args => {
	return (
		<CarbonText
			{ ...args }
		/>
	)
}
