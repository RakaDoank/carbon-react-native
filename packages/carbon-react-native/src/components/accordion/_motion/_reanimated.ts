import {
	Motion as Motion_,
} from '@audira/carbon-react-native-elements'

import {
	Easing,
} from 'react-native-reanimated'

import type {
	CollapsibleProps,
} from '../../collapsible/CollapsibleProps'

export const Reanimated: NonNullable<CollapsibleProps['motion']> =
	{
		toOpen: {
			duration: Motion_.Duration.fast_02,
			easing: Easing.bezier(
				Motion_.Easing.entrance.productive.x1,
				Motion_.Easing.entrance.productive.y1,
				Motion_.Easing.entrance.productive.x2,
				Motion_.Easing.entrance.productive.y2,
			),
		},
		toClose: {
			duration: 0,
		},
	}
