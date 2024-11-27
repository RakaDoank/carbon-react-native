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
				MotionConstant.Easings.ENTRANCE.PRODUCTIVE.x1,
				MotionConstant.Easings.ENTRANCE.PRODUCTIVE.y1,
				MotionConstant.Easings.ENTRANCE.PRODUCTIVE.x2,
				MotionConstant.Easings.ENTRANCE.PRODUCTIVE.y2,
			),
		},
		toClose: {
			duration: 0,
		},
	}
