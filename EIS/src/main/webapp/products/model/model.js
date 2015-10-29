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
	  {name: 'score', type: 'string'},
	  {name: 'score_weight', type: 'string'},
	  {name: 'product_state', type: 'string'},
	  {name: 'source', type: 'string'},
	  {name: 'lessons_learned', type: 'string'},
	  {name: 'availability_impact', type: 'string'},
	  {name: 'authentication', type: 'string'}
	]
});