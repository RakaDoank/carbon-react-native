import type {
	ViewProps,
} from 'react-native'

import type {
	ColorLayerLevel,
} from '@audira/carbon-react-native-elements'

export interface LayerProps extends ViewProps {
	/**
	 * Specify the layer level and override any existing levels based on hierarchy
	 * @default 1
	 */
	level?: ColorLayerLevel,
	withBackground?: boolean,
}
