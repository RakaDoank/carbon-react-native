module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		'react-native-reanimated/plugin',
		[
			'module-resolver',
			{
				root: ['./'],
				extensions: [
					'.ts',
					'.tsx',
					'.js',
					'.ios.js',
					'.android.js',
					'.json',
					'.svg',
				],
				alias: {
					'@': './src',
				},
			},
		],
	],
};
