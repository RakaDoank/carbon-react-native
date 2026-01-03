import {
	forwardRef,
	useContext,
} from "react"

import {
	Pressable,
	StyleSheet,
	View,
	type ViewProps,
} from "react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

import {
	ButtonGroupContext,
	GlobalConfigContext,
} from "../../../_internal/contexts"

import {
	FlexStyleSheet,
} from "../../../_internal/style-sheets"

import {
	Text,
	type TextProps,
} from "../../text"

import type {
	Size,
} from "../Size"

import type {
	BaseProps,
} from "./BaseProps"

import type {
	BaseRef,
} from "./BaseRef"

export const Base = forwardRef<BaseRef, BaseProps>(
	function Base(
		{
			size: sizeProp,
			text,
			textProps,
			Icon,
			iconProps,
			iconNode,
			backgroundNode,
			InlineLoading,
			inlineLoadingProps,
			style,
			role = "button",
			"aria-label": ariaLabel,
			dir,
			...props
		},
		ref,
	) {

		const
			globalConfigContext =
				useContext(GlobalConfigContext),

			buttonGroupContext =
				useContext(ButtonGroupContext),

			size =
				sizeProp ?? buttonGroupContext.size ?? "large_productive",

			iconSize =
				getIconSize(size),

			iconMarginStyle =
				mapIconMarginStyle[`${!!globalConfigContext.rtl}`][`${!!text}`]

		return (
			<Pressable
				{ ...props }
				role={ role }
				aria-label={ ariaLabel ?? text }
				dir={ dir ?? globalConfigContext.rtl ? "rtl" : undefined }
				style={ [
					FlexStyleSheet.flex_row,
					FlexStyleSheet.justify_between,
					baseStyle.container,
					globalConfigContext.rtl ? baseStyle.containerRtl : undefined,
					mapContainerStyle[`${!!text}`][`${!!Icon || !!iconNode}`],
					sizeStyle[size],
					mapStyleInButtonGroup[`${!!buttonGroupContext.vertical}`][`${!!buttonGroupContext.fluid}`],
					style,
				] }
				ref={ ref }
			>
				{ backgroundNode }{/* only for base-color button, and this is not valid HTML per se (?) */}

				{ !InlineLoading || inlineLoadingProps?.state === "inactive" ? (<>
					{ !!text && (
						<View
							style={ baseStyle.textContainer }
						>
							<Text
								{ ...textProps }
								type={ getTextType(size) }
							>
								{ text }
							</Text>
						</View>
					) }

					{ (!!Icon && !iconNode) ? (
						<Icon
							{ ...iconProps }
							width={ iconProps?.width ?? iconSize }
							height={ iconProps?.height ?? iconSize }
							dir={ globalConfigContext.rtl ? "rtl" : undefined }
							style={ [
								getIconMarginTopStyle(size),
								iconMarginStyle,
								iconProps?.style,
							] }
						/>
					) : iconNode?.(
						iconSize,
						[
							getIconMarginTopStyle(size),
							iconMarginStyle,
						],
					) }
				</>) : (
					<InlineLoading
						{ ...inlineLoadingProps }
						text={ inlineLoadingProps?.text || text || "" }
						style={ [
							baseStyle.inlineLoading,
							inlineLoadingProps?.style,
						] }
					/>
				) }
			</Pressable>
		)

	},
)

const
	baseStyle =
		StyleSheet.create({
			container: {
				overflow: "hidden",
			},
			containerRtl: {
				direction: "rtl",
			},

			/**
			 * Start Padding
			 */
			containerPaddingStart: {
				paddingStart: Spacing.spacing_05,
			},
			/**
			 * End Padding with icon
			 */
			containerPaddingEnd05: {
				paddingEnd: Spacing.spacing_05,
			},
			/**
			 * End Padding without icon
			 */
			containerPaddingEnd10: {
				paddingEnd: Spacing.spacing_10,
			},

			textContainer: {
				justifyContent: "center",
				height: "100%",
				maxHeight: 48,
			},

			iconMarginLTR: {
				marginLeft: Spacing.spacing_07,
			},
			iconMarginRTL: {
				marginRight: Spacing.spacing_07,
			},

			inlineLoading: {
				height: "100%",
				maxHeight: 48,
			},
		}),

	sizeStyle =
		StyleSheet.create<Record<Size, {
			height: number
		}>>({
			small: {
				height: 32,
			},
			medium: {
				height: 40,
			},
			large_productive: {
				height: 48,
			},
			large_expressive: {
				height: 48,
			},
			extra_large: {
				height: 64,
			},
			"2xl": {
				height: 80,
			},
		}),

	mapContainerStyle: {
		[HasText in `${boolean}`]: {
			[HasIcon in `${boolean}`]: BaseProps["style"]
		}
	} =
		{
			false: {
				false:	[baseStyle.containerPaddingEnd05, baseStyle.containerPaddingStart],
				true:	[baseStyle.containerPaddingEnd05, baseStyle.containerPaddingStart],
			},
			true: {
				false:	[baseStyle.containerPaddingEnd10, baseStyle.containerPaddingStart],
				true:	[baseStyle.containerPaddingEnd05, baseStyle.containerPaddingStart],
			},
		},

	/**
	 * https://carbondesignsystem.com/components/button/style/#typography
	 */
	mapTextTypeByExpressive: Record<"true" | "false", NonNullable<TextProps["type"]>> =
		{
			false: "body_compact_01",
			true: "body_compact_02",
		},

	mapIconSizeByExpressive: Record<"true" | "false", number> =
		{
			false: 16,
			true: 20,
		},

	mapIconMarginStyle: {
		[RTL in `${boolean}`]: {
			[HasText in `${boolean}`]: ViewProps["style"]
		}
	} =
		{
			false: {
				false: null,
				true: baseStyle.iconMarginLTR,
			},
			true: {
				false: null,
				true: baseStyle.iconMarginRTL,
			},
		},

	mapStyleInButtonGroup: {
		[IsVertical in `${boolean}`]: {
			[IsFluid in `${boolean}`]: ViewProps["style"]
		}
	} =
		{
			false: {
				false: FlexStyleSheet.self_start,
				true: FlexStyleSheet.flex_1,
			},
			true: {
				false: FlexStyleSheet.self_stretch,
				true: FlexStyleSheet.self_stretch,
			},
		}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function isExpressiveStr(
	Size: BaseProps["size"],
): "true" | "false" {
	return `${Size === "large_expressive"}`
}

// function getContainerPaddingRight(
// 	text: boolean,
// 	icon: boolean,
// ) {
// 	return mapContainerEndPR[`${text}`][`${icon}`]
// }

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function getTextType(size: BaseProps["size"]) {
	return mapTextTypeByExpressive[isExpressiveStr(size)]
}

/**
 * Expressive only when button size is LARGE_EXPRESSIVE. You can see this link  
 * https://carbondesignsystem.com/components/button/style/#sizes
 */
function getIconSize(size: BaseProps["size"]) {
	return mapIconSizeByExpressive[isExpressiveStr(size)]
}

function getIconMarginTopStyle(size: NonNullable<BaseProps["size"]>) {
	const
		iconSize =
			mapIconSizeByExpressive[isExpressiveStr(size)],

		height =
			Math.min(sizeStyle[size].height, sizeStyle.large_productive.height) // 48 at max

	return {
		marginTop: (height / 2) - (iconSize / 2),
	}
}
