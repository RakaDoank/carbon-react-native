import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
	// By default, Docusaurus generates a sidebar from the docs folder structure
	sidebar_home: [
		{
			id: 'INDEX',
			type: 'doc',
			label: 'Introduction',
		},
		'INSTALLATION',
		{
			type: 'category',
			label: 'Guides',
			collapsed: false,
			collapsible: true,
			items: [{
				type: 'autogenerated',
				dirName: 'guides',
			}],
		},
	],

	sidebar_components: [
		{
			type: 'autogenerated',
			dirName: 'components',
		},
	],

	sidebar_definitions: [
		{
			type: 'doc',
			label: 'Overview',
			id: 'definitions/index',
		},
		...require('./docs/definitions/typedoc-sidebar.cjs'),
	],

	// But you can create a sidebar manually
	/*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
