import {
	createContext,
} from "react"

import {
	Dimensions,
} from "react-native"

import type {
	BreakpointToken,
} from "@audira/carbon-react-native-elements"

import {
	BreakpointHelper,
} from "../../helpers"

export const BreakpointContext = createContext<BreakpointToken>(
	BreakpointHelper.getToken(Dimensions.get("window").width),
)
