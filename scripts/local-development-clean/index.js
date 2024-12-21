const
	fs =
		require('fs'),

	path =
		require('path')

const
	root =
		path.resolve(__dirname, '../..'),

	packageRegistryPath =
		path.join(root, '.carbon-react-native'),

	originalPackageJsonPath =
		path.join(root, '/package/package-original.json')

if(fs.existsSync(originalPackageJsonPath)) {
	fs.renameSync(originalPackageJsonPath, `${root}/package/package.json`)
	fs.unlinkSync(`${packageRegistryPath}/index.tsx`)
	console.log('Repository has been cleaned from local development\n')
} else {
	console.error('ERR :: package-original.json file was not found\n')
}
