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

	packageJsonDevPath =
		path.join(packageRegistryPath, 'package.json')

if(fs.existsSync(packageJsonDevPath)) {
	fs.unlinkSync(packageJsonDevPath)
}

fs.symlinkSync(
	path.join(root, 'package', 'package.json'),
	packageJsonDevPath,
	'dir',
)

if(fs.existsSync(packageRegistryPath, 'index.tsx')) {
	fs.unlinkSync(`${packageRegistryPath}/index.tsx`)
}

console.log('Package registry has been cleaned from local development\n')
