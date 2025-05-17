import type {
	TextProps as CoreProps,
} from 'react-native'

import type {
	TypeSetsToken,
} from '@audira/carbon-react-native-elements'

export interface TextProps extends CoreProps {
	type?: TypeSetsToken,
	italic?: boolean,
}
