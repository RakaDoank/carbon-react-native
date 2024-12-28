import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: '@rakadoank/carbon-react-native',
	tagline: 'Dinosaurs are cool',
	favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://rakadoank.github.io',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',
	trailingSlash: false,

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'RakaDoank', // Usually your GitHub org/user name.
	projectName: 'carbon-react-native', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			{
				docs: {
					routeBasePath: '/',
					sidebarPath: './sidebars.ts',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						'https://github.com/RakaDoank/carbon-react-native/tree/main/docs',
				},
				// blog: {
				// 	showReadingTime: true,
				// 	feedOptions: {
				// 		type: ['rss', 'atom'],
				// 		xslt: true,
				// 	},
				// 	// Please change this to your repo.
				// 	// Remove this to remove the "edit this page" links.
				// 	editUrl:
				// 		'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				// 	// Useful options to enforce blogging best practices
				// 	onInlineTags: 'warn',
				// 	onInlineAuthors: 'warn',
				// 	onUntruncatedBlogPosts: 'warn',
				// },
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		navbar: {
			title: 'Carbon for React Native',
			logo: {
				alt: 'My Site Logo',
				src: 'img/logo.svg',
			},
			items: [
				{
					sidebarId: 'sidebar_home',
					label: 'Home',
					position: 'left',
					href: '/',
				},
				{
					sidebarId: 'sidebar_components',
					label: 'Components',
					position: 'left',
					to: '/components',
				},
				{
					sidebarId: 'sidebar_components',
					label: 'APIs',
					position: 'left',
					to: '/api',
				},
				{
					sidebarId: 'sidebar_definitions',
					label: 'Definitions',
					position: 'left',
					to: '/definitions',
				},
				{
					href: 'https://github.com/RakaDoank/carbon-react-native',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		// footer: {
		// 	style: 'dark',
		// 	links: [
		// 		{
		// 			title: 'Docs',
		// 			items: [
		// 				{
		// 					label: 'Tutorial',
		// 					to: '/docs/intro',
		// 				},
		// 			],
		// 		},
		// 		{
		// 			title: 'Community',
		// 			items: [
		// 				{
		// 					label: 'Stack Overflow',
		// 					href: 'https://stackoverflow.com/questions/tagged/docusaurus',
		// 				},
		// 				{
		// 					label: 'Discord',
		// 					href: 'https://discordapp.com/invite/docusaurus',
		// 				},
		// 				{
		// 					label: 'X',
		// 					href: 'https://x.com/docusaurus',
		// 				},
		// 			],
		// 		},
		// 		{
		// 			title: 'More',
		// 			items: [
		// 				{
		// 					label: 'Blog',
		// 					to: '/blog',
		// 				},
		// 				{
		// 					label: 'GitHub',
		// 					href: 'https://github.com/facebook/docusaurus',
		// 				},
		// 			],
		// 		},
		// 	],
		// 	copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
		// },
		announcementBar: {
			id: 'preview_status',
			content: '<strong>It\'s not ready for production</strong>',
			backgroundColor: '#f1c21b',
			textColor: '#000000',
			isCloseable: false,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,

	plugins: [
		[
			'docusaurus-plugin-typedoc',
			/**
			 * https://typedoc-plugin-markdown.org/docs/options
			 * https://typedoc.org/api/interfaces/Configuration.TypeDocOptions.html
			 */
			{
				out: './docs/definitions',
				entryPoints: ['../package/src'],
				tsconfig: '../package/tsconfig.json',
				watch: !!process.env.TYPEDOC_WATCH,
				excludeExternals: true,
				readme: 'none',
				groupOrder: [
					'alphabetical',
				],
			},
		],
	],
};

export default config;
