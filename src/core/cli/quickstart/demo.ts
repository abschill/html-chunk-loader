export default [
	{
		type: 'partial',
		filename: 'head.html',
		content: '<head><title>Hello World</title></head>'
	},
	{
		type: 'template',
		filename: 'home.html',
		content: '<!--@partial=head--><main><h1>My HTML Template</h1></main>'
	}
];