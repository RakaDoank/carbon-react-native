const
	fs =
		require('fs'),

	path =
		require('path'),

	packageJson =
		require('../../package.json')

const
	root =
		path.resolve(__dirname, '../..'),

	content =
		'// THIS IS GENERATED FILE OF LOCAL DEVELOPMENT SCRIPT\n' +
		'export * from \'./src\'\n',

	localPackageJson =
		{ ...packageJson }

fs.writeFileSync(`${root}/index.tsx`, content)

if(!fs.existsSync(`${root}/package-original.json`)) {
	fs.writeFileSync(`${root}/package-original.json`, JSON.stringify(packageJson, null, '\t'))
}

delete localPackageJson.scripts.prepare
delete localPackageJson.exports
delete localPackageJson.files
delete localPackageJson.main
delete localPackageJson.module
delete localPackageJson.source
fs.writeFileSync(`${root}/package.json`, JSON.stringify(localPackageJson, null, '\t'))

console.log('Local development has been initialized')
console.warn(
	'\nWARNING' +
	'\n\nPlease, do not commit the modified package.json by this script.\nYou can undo it with `npm run clean-local-development` command or discard package.json change.' +
	'\n\nIf you are actually want to change some in the package.json,' +
	'\nundo this script by `npm run clean-local-development` or get original package.json' +
	'\nand modify the package.json first before running this script again\n'
)
