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
} from 'react-native-reanimated'

import {
	Motion,
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	GlobalConfigContext,
	type ToastContextShowConfig,
} from '../../../contexts'

import type {
	ToastRef,
} from '../ToastRef'

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
					if(ref && !componentWrappersRef.current[index]) {
						componentWrappersRef.current[index] = ref
					}
				}, []),

			show: OverlayRef['show'] =
				useCallback((
					fn,
					config,
				) => {
					const id = Date.now()
					componentsConfig.current.push({
						...config,
						id,
						state: 0,
						width: 0,
						height: 0,
					})
					const component = fn(id)
					setComponents(_components => [
						..._components,
						component,
					])
				}, []),

			dismiss: OverlayRef['dismiss'] =
				useCallback(id => {
					const index = componentsConfig.current.findIndex(c => c.id == id)

					if(
						index > -1 &&
						componentWrappersRef.current[index] &&
						componentsConfig.current[index]
					) {
						componentWrappersRef.current[index].cancelX() // cancel the current delay first
						componentWrappersRef.current[index].shiftX(
							componentsConfig.current[index].width + Spacing.spacing_03,
						)
						if(index > 0) {
							for(let i = 0; i < index; i++) {
								componentWrappersRef.current[i]?.shiftY(
									-componentsConfig.current[index].height,
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
						componentsConfig.current[index]?.state === 0 &&
						componentWrappersRef.current[index]
					) {
						componentsConfig.current[index].state = 1
						componentsConfig.current[index].width = event.nativeEvent.layout.width
						componentsConfig.current[index].height = event.nativeEvent.layout.height

						componentWrappersRef.current[index].shiftX(
							-componentsConfig.current[index].width - Spacing.spacing_03,
						)

						if(componentWrappersRef.current.length > 1) {
							for(let i = 0; i < componentWrappersRef.current.length - 1; i++) {
								componentWrappersRef.current[i]?.shiftY(
									// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-extra-non-null-assertion
									componentsConfig.current[0]!!.height + Spacing.spacing_03,
								)
							}
						}
					}
				}, []),

			onShiftedXComponent =
				useCallback((
					index: number,
				) => {
					if(componentsConfig.current[index]?.state === 1) {
						componentsConfig.current[index].state = 2
						componentWrappersRef.current[index]?.shiftX(
							componentsConfig.current[index].width + Spacing.spacing_03,
							componentsConfig.current[index].duration ?? globalConfigContext.toastDuration,
						)
					} else if(
						componentsConfig.current[index]?.state === 2 &&
						index == componentsConfig.current.length - 1
					) {
						/**
						 * Delete all componentsConfig, componentWrappersRef, and components (react state) when it's all done
						 */
						componentsConfig.current.splice(0, componentsConfig.current.length)
						componentWrappersRef.current.splice(0, componentWrappersRef.current.length)
						setComponents([])
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

		return (
			<Fragment>
				{ components.map((component, index) => (
					<ComponentWrapper
						key={ componentsConfig.current[index]?.id }
						onLayout={ event => onLayoutComponent(event, index) }
						onShiftedX={ () => onShiftedXComponent(index) }
						ref={ ref => setComponentWrapperRef(ref, index) }
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
				top: Spacing.spacing_03,
				left: '100%',
				alignSelf: 'flex-start',
			},
		}),

	easing =
		Easing.bezier(
			Motion.Easing.entrance.productive.x1,
			Motion.Easing.entrance.productive.y1,
			Motion.Easing.entrance.productive.x2,
			Motion.Easing.entrance.productive.y2,
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
							translateX.value + px,
							{
								duration: Motion.Duration.moderate_01,
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
							translateY.value + px,
							{
								duration: Motion.Duration.moderate_01,
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
			>
				{ children }
			</Animated.View>
		)

	},
)
