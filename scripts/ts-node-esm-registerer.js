import node_module from 'node:module'
import node_url from 'node:url'

node_module.register('ts-node/esm', node_url.pathToFileURL('./'))
