import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react"

import {
	Animated,
	Easing,
	Platform,
} from "react-native"

import {
	Motion,
} from "@audira/carbon-react-native-elements"

import IconArrowUp from "@carbon/icons/svg/32/arrow--up.svg"
import IconArrowsVertical from "@carbon/icons/svg/32/arrows--vertical.svg"

import {
	TableCellIcon,
} from "../../table-cell-icon/TableCellIcon"

import type {
	TableCellIconProps,
} from "../../table-cell-icon/TableCellIconProps"

import type {
	SortIconProps,
} from "./SortIconProps"

import type {
	SortIconRef,
} from "./SortIconRef"

export const SortIcon = forwardRef<SortIconRef, SortIconProps>(
	function SortIcon(
		{
			type,
			style,
			...props
		},
		ref,
	) {

		const
			rotationValue =
				useRef(new Animated.Value(0)),

			opacityValue =
				useRef(new Animated.Value(0))

		useEffect(() => {
			if(type == "none") {
				Animated
					.timing(
						rotationValue.current,
						{
							toValue: 0,
							duration: 0,
							useNativeDriver: Platform.OS != "web",
						},
					)
					.start()
			} else if(type == "asc" || type == "desc") {
				Animated
					.timing(
						rotationValue.current,
						{
							toValue: type == "asc" ? 0 : 1,
							duration: Motion.Duration.moderate_02,
							easing: Easing.bezier(
								Motion.Easing.standard.productive.x1,
								Motion.Easing.standard.productive.y1,
								Motion.Easing.standard.productive.x2,
								Motion.Easing.standard.productive.y2,
							),
							useNativeDriver: Platform.OS != "web",
						},
					)
					.start()
			}
		}, [
			type,
		])

		useImperativeHandle(ref, () => {
			return {
				setOpacity(value) {
					Animated
						.timing(
							opacityValue.current,
							{
								toValue: value,
								duration: Motion.Duration.fast_01,
								easing: Easing.bezier(
									Motion.Easing.entrance.productive.x1,
									Motion.Easing.entrance.productive.y1,
									Motion.Easing.entrance.productive.x2,
									Motion.Easing.entrance.productive.y2,
								),
								useNativeDriver: Platform.OS != "web",
							},
						)
						.start()
				},
			}
		}, [])

		return (
			<AnimatedTableCellIcon
				{ ...props }
				Icon={ (type == "none" ? IconArrowsVertical : IconArrowUp) as TableCellIconProps["Icon"] }
				style={ [
					{
						/* eslint-disable react-hooks/refs */
						opacity: opacityValue.current,
						transform: [{
							rotateZ: rotationValue.current.interpolate({
								inputRange: [0, 1],
								outputRange: ["0deg", "180deg"],
							}),
						}],
						/* eslint-enable react-hooks/refs */
					},
					style,
				] }
			/>
		)

	},
)

const
	AnimatedTableCellIcon =
		Animated.createAnimatedComponent(TableCellIcon)
