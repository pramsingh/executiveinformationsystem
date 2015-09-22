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
	  {name: 'name', type: 'string'},
	  {name: 'version', type: 'string'},
	  {name: 'branch', type: 'string'},
	  {name: 'teamName', type: 'string'},
	  {name: 'type', type: 'string'},
	  {name: 'category', type: 'string'},
	  {name: 'systemType', type: 'string'},
	  {name: 'projectName', type: 'string'}
	]
});