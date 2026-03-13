import node_fs from "node:fs"

/**
 * @param {Record<
 * 	"g"| "gObject",
 * 	{
 * 		filePath: node_fs.PathOrFileDescriptor,
 * 		value: string,
 * 	}
 * >} data
 */
export function setStringFile(data) {

	const str = {
		g: `// Generated\n// ${new Date().toUTCString()}` + data.g.value + "\n",
		gObject: `// Generated\n// ${new Date().toUTCString()}` + data.gObject.value + "\n",
	}

	node_fs.writeFileSync(
		data.g.filePath,
		str.g,
		"utf8",
	)

	node_fs.writeFileSync(
		data.gObject.filePath,
		str.gObject,
		"utf8",
	)

}
