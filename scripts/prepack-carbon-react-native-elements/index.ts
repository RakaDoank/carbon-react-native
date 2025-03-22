import node_fs from 'node:fs'
import node_path from 'node:path'
import node_url from 'node:url'

const
	__filename =
		node_url.fileURLToPath(import.meta.url),

	__dirname =
		node_path.dirname(__filename),

	root =
		node_path.resolve(__dirname, '../..'),

	carbonRNPackagePath =
		node_path.join(root, 'packages/carbon-react-native-elements'),

	additionalSources =
		[
			{
				name: 'LICENSE',
				path: node_path.join(root, 'LICENSE'),
			},
		]
try {
	additionalSources.forEach(src => {
		const destPath = node_path.join(carbonRNPackagePath, src.name)

		if(node_fs.existsSync(destPath)) {
			node_fs.rmSync(destPath, { recursive: true })
		}

		node_fs.cpSync(
			src.path,
			destPath,
			{
				recursive: true,
			},
		)
	})

	console.info('/scripts/prepack-carbon-react-native-elements :: Package has been packed successfully')
} catch(e) {
	throw new Error(e instanceof Error ? e.message : 'Unknown error')
}
