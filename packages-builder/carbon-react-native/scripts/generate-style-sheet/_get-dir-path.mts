import * as node_path from "node:path"

import {
	WorkspacePath,
} from "./_workspace-path.mts"

export function getDirPath(
	fileName: string,
) {
	return {
		g: node_path.join(WorkspacePath, "packages", "carbon-react-native", "src", "carbon-style-sheet", "g", fileName),
		gObject: node_path.join(WorkspacePath, "packages", "carbon-react-native", "src", "carbon-style-sheet", "g-object", fileName),
	}
}
