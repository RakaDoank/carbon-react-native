import {
	ScrollView,
	type ScrollViewProps,
} from 'react-native'

import {
	SpacingConstant,
	StyleSheet,
} from '@audira/carbon-react-native'

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
		StyleSheet.create(color => ({
			container: {
				paddingHorizontal: SpacingConstant.spacing_05,
				backgroundColor: color.field_01,
			},
			contentContainer: {
				paddingVertical: SpacingConstant.spacing_07,
			},
			title: {
				marginBottom: SpacingConstant.spacing_05,
			},
		}))

