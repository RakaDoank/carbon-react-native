const
	fs =
		require('fs'),

	path =
		require('path')

const
	root =
		path.resolve(__dirname, '../..'),

	originalPackageJsonPath =
		path.join(root, 'package-original.json')

if(fs.existsSync(originalPackageJsonPath)) {
	fs.renameSync(originalPackageJsonPath, `${root}/package.json`)
	fs.unlinkSync(`${root}/index.tsx`)
	console.log('Repository has been cleaned from local development\n')
} else {
	console.error('ERR :: package-original.json file was not found\n')
}
