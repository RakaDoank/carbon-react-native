import type {
	ViewProps,
} from 'react-native'

import type {
	BaseProps,
} from '../../button/base/BaseProps'

export interface Renderer3Props<
	Props1 extends ViewProps = BaseProps,
	Props2 extends ViewProps = BaseProps,
	Props3 extends ViewProps = BaseProps,
> {
	item1: Props1 & {
		Component: React.FunctionComponent<Props1>
	},
	item2: Props2 & {
		Component: React.FunctionComponent<Props2>
	},
	item3: Props3 & {
		Component: React.FunctionComponent<Props3>
	},
}
