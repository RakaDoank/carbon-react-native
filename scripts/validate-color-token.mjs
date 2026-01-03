import node_fs from "node:fs"
import node_path from "node:path"
import node_url from "node:url"

const
	__filename =
		node_url.fileURLToPath(import.meta.url),

	__dirname =
		node_path.dirname(__filename),

	root =
		node_path.resolve(__dirname, "..")

try {
	const
		colorTokenFile =
			node_fs
				.readFileSync(
					node_path.join(root, "packages/carbon-react-native-elements/src/types/ColorToken.ts"),
					{
						encoding: "utf8",
					},
				)
				.toString(),

		gray10File =
			node_fs
				.readFileSync(
					node_path.join(root, "packages/carbon-react-native-elements/src/color/token/gray-10.ts"),
					{
						encoding: "utf8",
					},
				)
				.toString(),

		gray100File =
			node_fs
				.readFileSync(
					node_path.join(root, "packages/carbon-react-native-elements/src/color/token/gray-100.ts"),
					{
						encoding: "utf8",
					},
				)
				.toString(),

		gray10Array =
			gray10File.match(/all = {(.|\n)*}/g)?.[0]?.match(/\b\w+(?<!all|export|const)\b/g),

		gray100Array =
			gray100File.match(/all = {(.|\n)*}/g)?.[0]?.match(/\b\w+(?<!all|export|const)\b/g)

	if(!gray10Array?.length || !gray100Array?.length) {
		throw new Error("Internal Error - Failed to read all members")
	}

	colorTokenFile.match(/['"](.*?)['"]/g).forEach(text => {
		const token = text.replace(/['"]/g, "")

		if(gray10Array.indexOf(token) == -1) {
			throw new Error(`Token '${token}' was not found in gray_10`)
		}
		if(gray100Array.indexOf(token) == -1) {
			throw new Error(`Token '${token}' was not found in gray_100`)
		}
	})

	console.info("/scripts/validate-color-token :: Color Token has been validated ✓")
} catch(err) {
	throw new Error(`/scripts/validate-color-token :: ${err instanceof Error ? `[${err.name}] ${err.message}` : "Unknown error"}`)
}
