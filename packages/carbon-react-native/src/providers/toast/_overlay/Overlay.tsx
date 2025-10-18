import {
	Fragment,
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import {
	Platform,
	type LayoutChangeEvent,
} from 'react-native'

import {
	Spacing,
} from '@audira/carbon-react-native-elements'

import {
	GlobalConfigContext,
} from '../../../_internal/contexts'

import type {
	ToastContextShowConfig,
} from '../../../contexts/toast/ToastContextShowConfig'

import type {
	OverlayRef,
} from './OverlayRef'

import {
	ComponentWrapper,
	type ComponentWrapperRef,
} from './_component-wrapper'

export const Overlay = forwardRef<OverlayRef>(
	function(
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
						if(Platform.OS == 'web') {
							// @ts-expect-error Web DOM
							const target = event.nativeEvent.target as HTMLDivElement
							/* eslint-disable @typescript-eslint/no-unsafe-member-access */
							// @ts-expect-error Web DOM
							componentsConfig.current[index].width = target.children?.[0]?.clientWidth
							// @ts-expect-error Web DOM
							componentsConfig.current[index].height = target.children?.[0]?.clientHeight
							/* eslint-enable @typescript-eslint/no-unsafe-member-access */
						} else {
							componentsConfig.current[index].width = event.nativeEvent.layout.width
							componentsConfig.current[index].height = event.nativeEvent.layout.height
						}

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
