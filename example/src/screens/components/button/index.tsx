import {
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

import {
	View,
	StyleSheet,
} from 'react-native'

import {
	Button as CButton,
	FlexStyle,
	FormHelperText,
	ThemeContext,
} from '@audira/carbon-react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	ScreenPlayTemplate,
	type ScreenPlayTemplateEnumProps,
	type ScreenPlayTemplateTextProps,
} from '@/components'

import {
	Item,
} from './_item'

import IconAdd from '@carbon/icons/es/add/20'
import IconCheckmark from '@carbon/icons/es/checkmark/20'
import IconIBMCloudKubernetesService from '@carbon/icons/es/ibm-cloud--kubernetes-service/20'
import IconPlay from '@carbon/icons/es/play/20'

type IconType =
	| 'add'
	| 'checkmark'
	| 'ibm_cloud_kubernetes_service'
	| 'play'

export function Button() {

	useContext(ThemeContext)

	const
		[play, setPlay] =
			useState<{
				text: string,
				renderIcon: boolean,
				iconType: IconType,
				size: CButton.ButtonSize,
				stretch: boolean,
				androidRippleEffect: boolean,
			}>({
				text: 'Carbon',
				renderIcon: true,
				iconType: 'ibm_cloud_kubernetes_service',
				size: 'large_productive',
				stretch: false,
				androidRippleEffect: true,
			}),

		icon =
			useMemo(() => {
				if(play.renderIcon) {
					return mapIconType[play.iconType]
				}
				return undefined
			}, [
				play.renderIcon,
				play.iconType,
			]),

		textPlayHandler: NonNullable<ScreenPlayTemplateTextProps['onSubmit']> =
			useCallback(text => {
				setPlay(_play => ({
					..._play,
					text,
				}))
			}, []),

		sizePlayHandler: NonNullable<ScreenPlayTemplateEnumProps['data'][0]['onPress']> =
			useCallback(value => {
				setPlay(_play => ({
					..._play,
					size: value as CButton.ButtonSize,
				}))
			}, []),

		stretchPlayHandler =
			useCallback(() => {
				setPlay(_play => ({
					..._play,
					stretch: !_play.stretch,
				}))
			}, []),

		renderIconPlayHandler =
			useCallback(() => {
				setPlay(_play => ({
					..._play,
					renderIcon: !_play.renderIcon,
				}))
			}, []),

		iconTypePlayHandler: NonNullable<ScreenPlayTemplateEnumProps['data'][0]['onPress']> =
			useCallback(value => {
				setPlay(_play => ({
					..._play,
					iconType: value as IconType,
				}))
			}, []),

		androidRippleEffectPlayHandler =
			useCallback(() => {
				setPlay(_play => ({
					..._play,
					androidRippleEffect: !_play.androidRippleEffect,
				}))
			}, []),

		androidRippleEffect =
			play.androidRippleEffect
				? undefined // default
				: null // disable

	return (
		<ScreenPlayTemplate
			title="Button"
			playgroundNode={ (<>
				<ScreenPlayTemplate.PlayText
					label="Text"
					value="Carbon"
					onSubmit={ textPlayHandler }
				/>

				<ScreenPlayTemplate.PlayEnum
					label="Button Size"
					selectedValue={ play.size }
					data={ dataPlaygroundSize.map(size => ({
						...size,
						onPress: sizePlayHandler,
					})) }
				/>

				<ScreenPlayTemplate.PlayBoolean
					label="Stretch"
					value={ play.stretch }
					onPress={ stretchPlayHandler }
				/>
				<FormHelperText
					text="This is a simple style modify with `alignSelf: 'stretch'`. Default is 'flex-start'"
					style={ style.mb8 }
				/>

				<ScreenPlayTemplate.PlayBoolean
					label="Use Icon"
					value={ play.renderIcon }
					onPress={ renderIconPlayHandler }
				/>

				<ScreenPlayTemplate.PlayEnum
					label="Icon"
					selectedValue={ play.iconType }
					data={ dataPlaygroundIcon.map(icon => ({
						...icon,
						onPress: iconTypePlayHandler,
					})) }
				/>

				<ScreenPlayTemplate.PlayBoolean
					label="Android Ripple Effect"
					value={ play.androidRippleEffect }
					onPress={ androidRippleEffectPlayHandler }
				/>
			</>) }
		>
			<View
				style={ [
					FlexStyle.flex_row,
					FlexStyle.flex_wrap,
					style.container,
				] }
			>
				<Item title="Primary">
					<CButton.Primary
						size={ play.size }
						icon={ icon }
						text={ play.text }
						style={ play.stretch ? style.buttonStretch : undefined }
						android_ripple={ androidRippleEffect }
					/>
				</Item>

				<Item title="Primary Danger">
					<CButton.PrimaryDanger
						size={ play.size }
						icon={ icon }
						text={ play.text }
						style={ play.stretch ? style.buttonStretch : undefined }
						android_ripple={ androidRippleEffect }
					/>
				</Item>

				<Item title="Secondary">
					<CButton.Secondary
						size={ play.size }
						icon={ icon }
						text={ play.text }
						style={ play.stretch ? style.buttonStretch : undefined }
						android_ripple={ androidRippleEffect }
					/>
				</Item>

				<Item title="Tertiary">
					<CButton.Tertiary
						size={ play.size }
						icon={ icon }
						text={ play.text }
						style={ play.stretch ? style.buttonStretch : undefined }
						android_ripple={ androidRippleEffect }
					/>
				</Item>

				<Item title="Tertiary Danger">
					<CButton.TertiaryDanger
						size={ play.size }
						icon={ icon }
						text={ play.text }
						style={ play.stretch ? style.buttonStretch : undefined }
						android_ripple={ androidRippleEffect }
					/>
				</Item>

				<Item title="Ghost">
					<CButton.Ghost
						size={ play.size }
						icon={ icon }
						text={ play.text }
						style={ play.stretch ? style.buttonStretch : undefined }
						android_ripple={ androidRippleEffect }
					/>
				</Item>

				<Item title="Ghost Danger">
					<CButton.GhostDanger
						size={ play.size }
						icon={ icon }
						text={ play.text }
						style={ play.stretch ? style.buttonStretch : undefined }
						android_ripple={ androidRippleEffect }
					/>
				</Item>

				<Item title="Ghost Icon">
					<CButton.GhostIcon
						size={ play.size }
						icon={ icon }
						style={ play.stretch ? style.buttonStretch : undefined }
						android_ripple={ androidRippleEffect }
					/>
				</Item>
			</View>
		</ScreenPlayTemplate>
	)

}

const
	style =
		StyleSheet.create({
			container: {
				margin: -Spacing.spacing_03,
			},
			mb8: {
				marginBottom: Spacing.spacing_03,
			},
			buttonStretch: {
				alignSelf: 'stretch',
			},
		}),

	mapIconType: Record<IconType, unknown> =
		{
			add: IconAdd,
			checkmark: IconCheckmark,
			ibm_cloud_kubernetes_service: IconIBMCloudKubernetesService,
			play: IconPlay,
		},

	dataPlaygroundSize: Record<'label' | 'value', CButton.ButtonSize>[] =
		[
			{
				value: 'small',
				label: 'small',
			},
			{
				value: 'medium',
				label: 'medium',
			},
			{
				value: 'large_productive',
				label: 'large_productive',
			},
			{
				value: 'large_expressive',
				label: 'large_expressive',
			},
			{
				value: 'extra_large',
				label: 'extra_large',
			},
			{
				value: '2xl',
				label: '2xl',
			},
		],

	dataPlaygroundIcon: { label: string, value: IconType }[] =
		[
			{
				value: 'add',
				label: 'Add',
			},
			{
				value: 'checkmark',
				label: 'Checkmark',
			},
			{
				value: 'ibm_cloud_kubernetes_service',
				label: 'IBM Cloud Kubernetes Service',
			},
			{
				value: 'play',
				label: 'Play',
			},
		]
