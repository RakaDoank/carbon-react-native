import {
	useContext,
} from 'react'

import {
	View,
	ScrollView,
} from 'react-native'

import {
	StyleSheet,
	Text,
	ThemeContext,
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

	useContext(ThemeContext)

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
		StyleSheet.create(color => ({
			scrollView: {
				backgroundColor: color.background,
			},
			titleBg: {
				marginBottom: 32,
				paddingVertical: 64,
				paddingHorizontal: 16,
				backgroundColor: color.text_primary,
			},
			title: {
				textAlign: 'center',
				color: color.background,
			},
			subtitle: {
				textAlign: 'center',
				color: color.tag_background_blue,
			},
			wrapper: {
				paddingHorizontal: 16,
			},
			textBr: {
				marginBottom: 16,
			},
		})),

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
