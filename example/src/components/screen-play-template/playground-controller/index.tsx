import {
	ScrollView,
	type ScrollViewProps,
} from 'react-native'

import {
	StyleSheet,
} from '@audira/carbon-react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	CText,
} from '@/components'

import {
	Boolean,
} from './boolean'

import {
	Enum,
} from './enum'

import {
	Text,
} from './text'

export interface PlaygroundControllerProps extends ScrollViewProps {
	title: string,
	// isLargeDisplay: boolean,
}

function Component({
	title,
	// isLargeDisplay,
	children,
	style: styleProp,
	contentContainerStyle,
	...props
}: PlaygroundControllerProps) {

	return (
		<ScrollView
			{ ...props }
			style={ [
				style.container,
				styleProp,
			] }
			contentContainerStyle={ [
				style.contentContainer,
				contentContainerStyle,
			] }
		>
			<CText
				type="heading_04"
				style={ style.title }
			>
				{ title }
			</CText>

			{ children }
		</ScrollView>
	)

}

export const PlaygroundController = Object.assign(Component, {
	Boolean,
	Enum,
	Text,
})

const
	style =
		StyleSheet.create({
			container: {
				paddingHorizontal: Spacing.spacing_05,
				backgroundColor: StyleSheet.color.field_01,
			},
			contentContainer: {
				paddingVertical: Spacing.spacing_07,
			},
			title: {
				marginBottom: Spacing.spacing_05,
			},
		})

