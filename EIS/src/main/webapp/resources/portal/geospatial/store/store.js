var SystemStateStore = Ext.create('Ext.data.Store', {
	model: 'SystemStateModel',
	data: [
        {code:"Major", description:"major"},
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

var SystemStateLocationStore = Ext.create('Ext.data.Store', {
	model: 'SystemStateLocationModel',
	proxy: {
		type: 'ajax',
		url: '../resources/data/state_hash.json', //replace with webservice url
		reader: {
			type: 'json'
		}
	},
	autoLoad: true
});

var SystemResultsStore = Ext.create('Ext.data.Store', {
	model: 'SystemResultsModel',
	proxy: {
		type: 'ajax',
		url: '../resources/data/systemResults.json', //replace with webservice url
		reader: {
			type: 'json'
		}
	},
	autoLoad: true
});