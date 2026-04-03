import {
	forwardRef,
} from "react"

import {
	ScrollView,
} from "react-native"

import * as CarbonStyleSheet from "../../carbon-style-sheet"

import {
	Box,
} from "../box/Box"

import type {
	TableProps,
} from "./TableProps"

import type {
	TableRef,
} from "./TableRef"

import {
	TableContext,
} from "./_TableContext"

export const Table = forwardRef<TableRef, TableProps>(
	function Table(
		{
			rowSize = "large",
			children,
			style,
			...props
		},
		ref,
	) {

		return (
			<TableContext.Provider
				value={{
					rowSize,
				}}
			>
				<Box
					ref={ ref }
					{ ...props }
					style={ style }
				>
					<ScrollView
						horizontal
						contentContainerStyle={ [
							CarbonStyleSheet.g.grow,
						] }
					>
						<ScrollView
							style={ [
								CarbonStyleSheet.g.flex_auto,
							] }
							role="table"
						>
							{ children }
						</ScrollView>
					</ScrollView>
				</Box>
			</TableContext.Provider>
		)

	},
)
