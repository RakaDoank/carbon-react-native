import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"

import {
	StyleSheet,
} from "react-native"

import type {
	Meta,
	StoryObj,
} from "@storybook/react-native"

import {
	Button,
	InlineLoading as CarbonInlineLoading,
	type InlineLoadingProps,
	type InlineLoadingState,
} from "@audira/carbon-react-native"

export default {
	title: "Components/Inline Loading",
} satisfies Meta<InlineLoadingProps>

export const InlineLoading: StoryObj<InlineLoadingProps> = {
	args: {
		state: "active",
		text: "Text",
	},
	argTypes: {
		state: {
			control: "select",
			options: [
				"active",
				"error",
				"finished",
				"inactive",
			] satisfies InlineLoadingState[],
		},
	},
	render(args) {
		return (
			<CarbonInlineLoading
				{ ...args }
			/>
		)
	},
}

export const InButton: StoryObj<Button.PrimaryProps> = {
	render() {
		return (
			<InButton_/>
		)
	},
}

export const UXExample: StoryObj<InlineLoadingProps> = {
	render() {
		return (
			<UXExample_/>
		)
	},
}

function useMockState() {
	const
		[state, setState] =
			useState<InlineLoadingState>("inactive"),

		targetState =
			useRef<Extract<InlineLoadingState, "finished" | "error">>("finished"),

		setTargetState =
			useCallback((target: typeof targetState.current) => {
				targetState.current = target
				setState("active")
			}, [])

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null

		if(state == "active") {
			if(timeout) {
				clearTimeout(timeout)
			}
			timeout = setTimeout(() => {
				setState(targetState.current)
				timeout = null
			}, 3000)
		}

		if(state == targetState.current && !timeout) {
			timeout = setTimeout(() => {
				setState("inactive")
				timeout = null
			}, 2000)
		}

		return () => {
			if(timeout) {
				clearTimeout(timeout)
			}
		}
	}, [
		state,
	])

	return {
		state,
		setTargetState,
	}
}

function UXExample_() {

	const
		{ state, setTargetState } =
			useMockState()

	if(state == "inactive") {
		return (
			<>
				<Button.Secondary
					text="Show Loading & Finished"
					onPress={ () => setTargetState("finished") }
				/>
				<Button.Secondary
					text="Show Loading & Error"
					onPress={ () => setTargetState("error") }
					style={ styleSheet.mt2 }
				/>
			</>
		)
	}

	return (
		<CarbonInlineLoading
			state={ state }
			text={ mapTextState[state] }
		/>
	)

}

function InButton_() {
	const
		{ state, setTargetState } =
			useMockState()

	return (
		<Button.Primary
			text={ state == "inactive" ? "Press me" : mapTextState[state] }
			InlineLoading={ CarbonInlineLoading }
			inlineLoadingProps={{
				state,
			}}
			onPress={ () => setTargetState("finished") }
		/>
	)
}

const
	mapTextState: Record<InlineLoadingState, string> =
		{
			active: "Loading…",
			error: "An error occured",
			finished: "Submitted",
			inactive: "never",
		},

	styleSheet =
		StyleSheet.create({
			mt2: {
				marginTop: 8,
			},
		})
