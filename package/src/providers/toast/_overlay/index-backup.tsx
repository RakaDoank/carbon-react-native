import {
	forwardRef,
	Fragment,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import {
	StyleSheet,
	type LayoutChangeEvent,
	type ViewProps,
} from 'react-native'

import Animated, {
	cancelAnimation,
	Easing,
	runOnUI,
	runOnJS,
	useSharedValue,
	withDelay,
	withTiming,
	useAnimatedRef,
} from 'react-native-reanimated'

import {
	MotionConstant,
	SpacingConstant,
} from '../../../constants'

import {
	GlobalConfigContext,
	type ToastContextShowConfig,
} from '../../../contexts'

import type {
	ToastRef,
} from '../_types'

export interface OverlayProps {
}

export interface OverlayRef extends ToastRef {
}

export const Overlay = forwardRef<OverlayRef, OverlayProps>(
	function Overlay(
		___props,
		ref,
	) {

		const
			globalConfigContext =
				useContext(GlobalConfigContext),

			componentsConfig =
				useRef<ComponentConfig[]>([]),

			componentWrappersRef =
				useRef<ComponentWrapperRef[]>([]),

			[components, setComponents] =
				useState<React.ReactNode[]>([]),

			setComponentWrapperRef =
				useCallback((ref: ComponentWrapperRef | null, index: number) => {
					if(ref && index == 0) {
						componentWrappersRef.current.unshift(ref)
						console.log('setter ref ', componentWrappersRef.current)
					}
				}, []),

			show: OverlayRef['show'] =
				useCallback((
					fn,
					config,
				) => {
					const id = Date.now()
					componentsConfig.current.unshift({
						...config,
						id,
						state: 0,
						width: 0,
						height: 0,
					})
					const component = fn(id)
					setComponents(_components => [
						component,
						..._components,
					])
				}, []),

			dismiss: OverlayRef['dismiss'] =
				useCallback(id => {
					const index = componentsConfig.current.findIndex(c => c.id == id)

					if(
						index > -1 &&
						componentWrappersRef.current[index]
					) {
						componentWrappersRef.current[index].cancelX() // cancel the current delay first
						componentWrappersRef.current[index].shiftX(
							componentsConfig.current[index]!.width,
						)
						if(index < componentsConfig.current.length - 1) {
							for(let i = index + 1; i < componentsConfig.current.length; i++) {
								componentWrappersRef.current[i]!.shiftY(
									-componentsConfig.current[index]!.height,
								)
							}
						}
					}
				}, []),

			onLayoutComponent =
				useCallback((
					event: LayoutChangeEvent,
					index: number,
				) => {
					if(
						index == 0 &&
						componentsConfig.current[0]?.state === 0 &&
						componentWrappersRef.current[0]
					) {
						componentsConfig.current[0].state = 1
						componentsConfig.current[0].width = event.nativeEvent.layout.width
						componentsConfig.current[0].height = event.nativeEvent.layout.height

						componentWrappersRef.current[0].shiftX(
							-componentsConfig.current[0].width,
						)

						if(componentWrappersRef.current.length > 1) {
							for(let i = 1; i < componentWrappersRef.current.length; i++) {
								componentWrappersRef.current[i]!.shiftY(
									componentsConfig.current[0].height + SpacingConstant.spacing_03,
								)
							}
						}
					}
				}, []),

			onShiftedXComponent =
				useCallback((index: number) => {
					if(
						componentsConfig.current[index]?.state === 1 &&
						componentWrappersRef.current[index]
					) {
						console.log('onShiftedX State1: ', index)
						componentsConfig.current[index].state = 2
						componentWrappersRef.current[index].shiftX(
							0,
							componentsConfig.current[index].duration ?? globalConfigContext.toastDuration,
						)
					} else if(
						componentsConfig.current[index]?.state === 2 &&
						componentWrappersRef.current[index]
					) {
						console.log('onShiftedX State2: ', index)
						setComponents(__components => {
							const _components = __components.slice()
							_components.splice(index, 1)
							componentsConfig.current.splice(index, 1)
							componentWrappersRef.current.splice(index, 1)
							return _components
						})
					}
				}, [
					globalConfigContext.toastDuration,
				])

		useImperativeHandle(ref, () => {
			return {
				show,
				dismiss,
			}
		}, [
			show,
			dismiss,
		])

		console.log('components: ', components.length, componentsConfig.current)

		return (
			<Fragment>
				{ components.map((component, index) => (
					<ComponentWrapper
						key={ componentsConfig.current[index]!.id }
						onLayout={ event => onLayoutComponent(event, index) }
						onShiftedX={ () => onShiftedXComponent(index) }
						ref={ ref => {
							setComponentWrapperRef(ref, index)
						} }
					>
						{ component }
					</ComponentWrapper>
				)) }
			</Fragment>
		)

	},
)

type ComponentConfig = ToastContextShowConfig & {
	/**
	 * 0 = mounted and still hidden from screen  
	 * 1 = start appearing transition
	 * 2 = start hiding transition (with delay) and will be unmounted
	*/
	state: 0 | 1 | 2,
	id: number,
	width: number,
	height: number,
}

const
	style =
		StyleSheet.create({
			componentWrapper: {
				position: 'absolute',
				top: SpacingConstant.spacing_03,
				left: '100%',
				alignSelf: 'flex-start',
			},
		}),

	easing =
		Easing.bezier(
			MotionConstant.Easings.entrance.productive.x1,
			MotionConstant.Easings.entrance.productive.y1,
			MotionConstant.Easings.entrance.productive.x2,
			MotionConstant.Easings.entrance.productive.y2,
		)

interface ComponentWrapperProps {
	children?: React.ReactNode,
	onLayout?: ViewProps['onLayout'],
	onShiftedX?: () => void,
	onShiftedY?: () => void,
}

interface ComponentWrapperRef {
	cancelX(): void,
	cancelY(): void,
	shiftX(px: number, delayMs?: number): void,
	shiftY(px: number): void,
}

const ComponentWrapper = forwardRef<ComponentWrapperRef, ComponentWrapperProps>(
	function ComponentWrapper(
		{
			children,
			onLayout,
			onShiftedX,
			onShiftedY,
		},
		ref,
	) {

		const
			viewRef =
				useAnimatedRef(),

			translateX =
				useSharedValue(0),

			translateY =
				useSharedValue(0)

		useImperativeHandle(ref, () => {
			return {
				cancelX() {
					runOnUI(() => cancelAnimation(translateX))()
				},
				cancelY() {
					runOnUI(() => cancelAnimation(translateY))()
				},
				shiftX(px_, delayMs_ = 0) {
					runOnUI((px: number, delayMs: number) => {
						translateX.value = withDelay(delayMs, withTiming(
							px,
							{
								duration: MotionConstant.Durations.moderate_01,
								easing,
							},
							finished => {
								if(finished && onShiftedX) {
									runOnJS(onShiftedX)()
								}
							},
						))
					})(px_, delayMs_)
				},
				shiftY(px_) {
					runOnUI((px: number) => {
						translateY.value = withTiming(
							px,
							{
								duration: MotionConstant.Durations.moderate_01,
								easing,
							},
							finished => {
								if(finished && onShiftedY) {
									runOnJS(onShiftedY)()
								}
							},
						)
					})(px_)
				},
			}
		}, [
			translateX,
			translateY,
			onShiftedX,
			onShiftedY,
		])

		return (
			<Animated.View
				onLayout={ onLayout as never }
				style={ [
					style.componentWrapper,
					{
						transform: [{
							translateX: translateX,
						}, {
							translateY: translateY,
						}],
					},
				] }
				ref={ viewRef }
			>
				{ children }
			</Animated.View>
		)

	},
)
