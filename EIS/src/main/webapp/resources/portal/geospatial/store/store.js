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

var ProductResultsStore = Ext.create('Ext.data.JsonStore', {
	model: 'ProductsResultsModel',
	data: [
	  {product_name: 'Washington', version: '2015', latitude: '38.907392', longitude: '-76.864943', product_state: 'active'},
	  {product_name: 'Baltimore', version: '2015', latitude: '39.277821', longitude: '-76.622790', product_state: 'major'},
	  {product_name: 'San Francisco', version: '2015', latitude: '37.402661', longitude: '-121.970103', product_state: 'inactive'},
	  {product_name: 'Denver', version: '2015', latitude: '39.743478', longitude: '-105.020814', product_state: 'pending'}
	]
});