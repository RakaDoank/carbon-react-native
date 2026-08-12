import {
	LiteUI,
} from "@storybook/react-native-ui-lite"

import AsyncStorage from "@react-native-async-storage/async-storage"

import {
	view,
} from "./storybook.requires"

const StorybookUIRoot = view.getStorybookUI({
	CustomUIComponent: LiteUI,
	storage: {
		getItem: AsyncStorage.getItem,
		setItem: AsyncStorage.setItem,
	},
})

export default StorybookUIRoot
