import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import {
	Pressable,
	StyleSheet,
} from 'react-native'

import type {
	DialogData,
} from '../../../contexts/dialog/DialogData'

import type {
	ControllerProps,
} from './ControllerProps'

import type {
	ControllerRef,
} from './ControllerRef'

import {
	Modal,
	type ModalRef,
} from './_modal'

import {
	Overlay,
	type OverlayRef,
} from './_overlay'

export const Controller = forwardRef<ControllerRef, ControllerProps>(
	function Controller(
		{
			animationConfig,
			modalProps,
			overlayProps,
			overlayTouchDismiss,
			onEmpty,
		},
		ref,
	) {

		const
			[data, setData] =
				useState<DialogDataState[]>([]),

			modalRefs =
				useRef<ModalRef[]>([]),

			overlayRef =
				useRef<OverlayRef>(null),

			initialRender =
				useRef(false),

			setModalRef =
				useCallback((
					modalRef: ModalRef | null,
					index: number,
				) => {
					if(modalRef && !modalRefs.current[index]) {
						modalRefs.current[index] = modalRef
					}
				}, []),

			dismissAllHandler: ControllerRef['dismissAll'] =
				useCallback(() => {
					if(modalRefs.current.length) {
						return new Promise(resolve => {
							Promise
								.all([
									overlayRef.current?.animateUnmount() ?? Promise.resolve(),
									modalRefs.current[modalRefs.current.length - 1]?.toState(2) ?? Promise.resolve(),
								])
								.then(() => {
									setData([])
									// modalRefs.current = []
									resolve()
								})
						})
					}
					return Promise.resolve()
				}, []),

			dismissHandler: ControllerRef['dismiss'] =
				useCallback(() => {
					if(modalRefs.current.length) {
						return new Promise(resolve => {
							if(modalRefs.current.length == 1) {
								dismissAllHandler()
							} else {
								modalRefs.current[modalRefs.current.length - 1]?.toState(2).then(() => {
									modalRefs.current.splice(modalRefs.current.length - 1, 1)
									modalRefs.current[modalRefs.current.length - 1]?.fromToState(0, 1).then(() => {
										setData(curr => {
											const nextData = curr.slice()
											nextData.splice(nextData.length - 1, 1)
											return nextData
										})
										resolve()
									})
								})
							}
						})
					}

					return Promise.resolve()
				}, [
					dismissAllHandler,
				])

		useEffect(() => {
			if(!initialRender.current) {
				initialRender.current = true
			} else {
				if(!data.length) {
					onEmpty()
				}
			}
		}, [
			onEmpty,
			data.length,
		])

		useImperativeHandle(ref, () => {
			return {
				show({
					stack,
					...restData
				}) {
					if(!modalRefs.current.length) {
						setData([{ ...restData }])
					} else {
						modalRefs.current[modalRefs.current.length - 1]?.toState(2).then(() => {
							if(stack) {
								setData(curr => {
									return [
										...curr,
										{ ...restData },
									]
								})
							} else {
								modalRefs.current.splice(modalRefs.current.length - 1, 1)
								setData([{ ...restData }])
							}
						})
					}
				},
				dismiss: dismissHandler,
				dismissAll: dismissAllHandler,
			}
		}, [
			dismissHandler,
			dismissAllHandler,
		])

		return (
			<Overlay
				ref={ overlayRef }
				{ ...overlayProps }
				defaultAnimationConfig={{
					duration: typeof animationConfig.duration === 'number' ? animationConfig.duration : animationConfig.duration?.[0],
				}}
			>
				{ data.map((item, index) => {
					return (
						<Modal
							{ ...modalProps }
							key={ index }
							defaultAnimationConfig={ animationConfig }
							ref={ modalRef => setModalRef(modalRef, index) }
						>
							{ (item.overlayTouchDismiss ?? overlayTouchDismiss) && (
								<Pressable
									onPress={ dismissHandler as () => void }
									style={ StyleSheet.absoluteFill }
								/>
							) }

							{ item.component }
						</Modal>
					)
				}) }
			</Overlay>
		)

	},
)

type DialogDataState =
	Omit<
		DialogData,
		// | 'type'
		| 'stack'
	>
