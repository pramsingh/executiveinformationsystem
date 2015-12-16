Ext.define('ProductStateModel', {
	extend: 'Ext.data.Model',
	fields: [
	   {name: 'code', type: 'string'},
	   {name: 'description', type: 'string'}
	]
});

Ext.define('ProductSystemModel', {
	extend: 'Ext.data.Model',
	fields: [
	  {name: 'type', type: 'string'},
	  {name: 'description', type: 'string'}
	]
});

Ext.define('ProductsResultsModel', {
	extend: 'Ext.data.Model',
	fields: [
	  {name: 'product_name', type: 'string'},
	  {name: 'version', type: 'string'},
	  {name: 'latitude', type: 'string'},
	  {name: 'longitude', type: 'string'},
	  {name: 'product_state', type: 'string'}
	]
});