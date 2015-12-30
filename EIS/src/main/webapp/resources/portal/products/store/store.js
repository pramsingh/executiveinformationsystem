var ProductStateStore = Ext.create('Ext.data.Store', {
	model: 'ProductStateModel',
	data: [
        {code:"Active", description:"Active"},
        {code:"Code", description:"Code"},
        {code:"Unit Test", description:"Unit Test"}
    ]
});

var ProductSystemStore = Ext.create('Ext.data.Store', {
	model: 'ProductSystemModel',
	data: [
	   {type: 'System A', description: 'System A'},
	   {type: 'System B', description: 'System B'},
	   {type: 'System C', description: 'System C'},
	   {type: 'System D', description: 'System D'}
	]
});

var ProductResultsStore = Ext.create('Ext.data.Store', {
	model: 'ProductsResultsModel',
	proxy: {
		type: 'ajax',
		url: gtConstants.URI.getProducts
	},
	autoLoad: true
});