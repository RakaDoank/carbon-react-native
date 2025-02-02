import node_fs from 'node:fs'
import node_path from 'node:path'
import node_url from 'node:url'

import {
	ColorConstant,
} from '../../package/src/constants'

const
	__filename =
		node_url.fileURLToPath(import.meta.url),

	__dirname =
		node_path.dirname(__filename),

	root =
		node_path.resolve(__dirname, '../..'),

	packagePath =
		node_path.join(root, 'package'),

	colorTokenTsFilePath =
		node_path.join(packagePath, 'src/types/theme/color-token.ts')

let
	colorTokenTsFile =
		node_fs.readFileSync(colorTokenTsFilePath).toString(),

	content =
		'export type ColorToken ='

const
	gray10Keys =
		Object.keys(ColorConstant.Tokens.gray_10)

try {
	gray10Keys.forEach(key => {
		content += `\n\t| '${key}'`
	})
	Object.keys(ColorConstant.Tokens.gray_100).forEach(key => {
		if(gray10Keys.indexOf(key) === -1) {
			throw new Error(`Color key '${key}' was not matched`)
		}
	})

	colorTokenTsFile =
		colorTokenTsFile.replace(
			/(\/\* GENERATED CODE ENTRY - generate-color-token-type \*\/)|(export type ColorToken\s=[\n\t|\s'\w]+')$/,
			content,
		)

	node_fs.writeFileSync(
		colorTokenTsFilePath,
		colorTokenTsFile,
	)

	console.log(
		'/scripts/generate-color-token-type :: ' +
		'ColorToken declaration is successfully generated',
	)
} catch(e) {
	console.error(
		'/scripts/generate-color-token-type :: ' +
		(e instanceof Error ? e.message : 'Unknown error.'),
	)
	process.exit()
}
