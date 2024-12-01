import {
	Easing,
} from 'react-native-reanimated'

import {
	MotionConstant,
} from '../../constants'

import type {
	CollapsibleProps,
} from '../collapsible'

export const AccordionMotion: NonNullable<CollapsibleProps['motion']> =
	{
		toOpen: {
			duration: MotionConstant.Durations.fast_02,
			easing: Easing.bezier(
				MotionConstant.Easings.entrance.productive.x1,
				MotionConstant.Easings.entrance.productive.y1,
				MotionConstant.Easings.entrance.productive.x2,
				MotionConstant.Easings.entrance.productive.y2,
			),
		},
		toClose: {
			duration: 0,
		},
	}
