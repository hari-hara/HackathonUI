module.exports = {
  staticFileGlobs: [
    'manifest.json',
	'node_modules/@polymer/*',
	'node_modules/@vaadin/*',
	'node_modules/@webcomponents/*',
    'src/**/*'
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    },
    {
      urlPattern: /^http:\/\/http://35.154.179.135:8085\//product/,
      handler: 'networkFirst'
    },
    {
      //urlPattern: /\/data\//,
      urlPattern: /^http:\/\/localhost:3000\/newtransactionHistory/,
      //http://localhost:3000/newtransactionHistory
      handler: 'fastest'
    }
  ]
};