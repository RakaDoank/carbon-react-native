import {
	View,
	ScrollView,
} from 'react-native'

import {
	StyleSheet,
	Text,
} from '@audira/carbon-react-native'

import {
	CText,
} from '@/components'

import {
	NavigationHooks,
} from '@/hooks'

import type {
	NavigationType,
} from '@/types'

import {
	HeadingSection,
} from './_heading-section'

import {
	ItemNav,
} from './_item-nav'

export function Home() {

	StyleSheet.use()

	const navigation = NavigationHooks.useNavigation()

	return (
		<ScrollView
			style={ style.scrollView }
		>
			<View style={ style.titleBg }>
				<Text
					type="heading_04"
					style={ style.title }
				>
					Carbon for React Native
				</Text>
				<Text type="heading_01" style={ style.subtitle }>
					@audira/carbon-react-native
				</Text>
			</View>

			<View
				style={ style.wrapper }
			>
				<CText type="body_02" style={ style.textBr }>
					Learn how to use Carbon components and utilities with this example app.
				</CText>

				<HeadingSection style={ style.textBr }>
					Components
				</HeadingSection>

				<View style={ style.textBr }>
					{ componentItemNavs.map(item => (
						<ItemNav
							key={ item.text }
							text={ item.text }
							onPress={ () => navigation.navigate(item.screenName) }
						/>
					)) }
				</View>

				<HeadingSection style={ style.textBr }>
					Utilities
				</HeadingSection>

				<View>
					{ utilityItemNavs.map(item => (
						<ItemNav
							key={ item.text }
							text={ item.text }
							onPress={ () => navigation.navigate(item.screenName) }
						/>
					)) }
				</View>
			</View>
		</ScrollView>
	)

}

const
	style =
		StyleSheet.create({
			scrollView: {
				backgroundColor: StyleSheet.color.background,
			},
			titleBg: {
				marginBottom: 32,
				paddingVertical: 64,
				paddingHorizontal: 16,
				backgroundColor: StyleSheet.color.text_primary,
			},
			title: {
				textAlign: 'center',
				color: StyleSheet.color.background,
			},
			subtitle: {
				textAlign: 'center',
				color: StyleSheet.color.tag_background_blue,
			},
			wrapper: {
				paddingHorizontal: 16,
			},
			textBr: {
				marginBottom: 16,
			},
		}),

	componentItemNavs: {
		text: string,
		screenName: keyof NavigationType.Stacks,
	}[] =
		[
			{
				text: 'Accordion',
				screenName: 'component_accordion',
			},
			{
				text: 'Button',
				screenName: 'component_button',
			},
			{
				text: 'Checkbox',
				screenName: 'component_checkbox',
			},
			{
				text: 'Radio Button',
				screenName: 'component_radio_button',
			},
		],

	utilityItemNavs: typeof componentItemNavs =
		[
			{
				text: 'Toast',
				screenName: 'utilities_toast',
			},
		]
