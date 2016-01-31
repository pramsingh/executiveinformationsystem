var ProductStateStore = Ext.create('Ext.data.Store', {
	model: 'ProductStateModel',
	data: [
        {code:"Critical", description:"critical"},
        {code:"Major", description:"major"},
        {code:"Moderate", description:"moderate"},
        {code:"Minor", description:"minor"},
        {code:"Normal", description:"normal"}
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
		url: '../resources/data/productResults.json',
		reader: {
			type: 'json'
		}
	},
	autoLoad: true
});