import node_childProcess from "node:child_process"
import node_fs from "node:fs"
import node_path from "node:path"

const
	root =
		node_path.join(import.meta.dirname, "..")

node_childProcess.execSync(
	"npx storybook build --disable-telemetry --output-dir .dist",
	{
		cwd: node_path.join(root, "storybook"),
		stdio: "inherit",
	},
)

const
	htmlFilePath =
		node_path.join(root, "storybook", ".dist", "index.html"),

	iframeHtmlFilePath =
		node_path.join(root, "storybook", ".dist", "iframe.html")

let
	htmlFile =
		node_fs
			.readFileSync(htmlFilePath)
			.toString(),

	iframeHtmlFile =
		node_fs
			.readFileSync(iframeHtmlFilePath)
			.toString()

// Change Title
htmlFile =
	htmlFile.replace(/<title>.*<\/title>/, "<title>Carbon React Native</title>")

{
	// Remove default Storybook font (Nunito Sans)

	const styleRegex = new RegExp(/<style>[\S\s]*format\('woff2'\);\n\s+}\n\s+<\/style>/)

	htmlFile =
		htmlFile.replace(
			styleRegex,
			"",
		)

	iframeHtmlFile =
		iframeHtmlFile.replace(
			styleRegex,
			"",
		)
}

node_fs.promises.writeFile(htmlFilePath, htmlFile)
node_fs.promises.writeFile(iframeHtmlFilePath, iframeHtmlFile)
