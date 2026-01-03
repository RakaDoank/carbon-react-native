import {
	createContext,
} from "react"

import type {
	ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

export const LayerContext = createContext<ColorLayerLevel>(1)
